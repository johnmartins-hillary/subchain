import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Upload, X, Camera } from "lucide-react";
import { toast } from "sonner";
import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { MODULE_NAME, PACKAGE_ID, REGISTRY_ID } from "../../constants";
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { SuccessModal } from "../ui/SuccessModal";

export const client = new SuiClient({ url: getFullnodeUrl("testnet") });

async function getCallerTokenBalance(address: string, coinType: string) {
  const coins = await client.getCoins({ owner: address, coinType });
  return coins.data.reduce(
    (sum, coin) => sum + BigInt(coin.balance),
    BigInt(0)
  );
}

interface CommunityFormData {
  leaderName: string;
  communityName: string;
  city: string;
  establishedNumber: string;
  longitude: string;
  latitude: string;
  description: string;
  image: File | null;
}

export function CreateCommunityPage() {
  const [formData, setFormData] = useState<CommunityFormData>({
    leaderName: "",
    communityName: "",
    city: "",
    establishedNumber: "",
    longitude: "",
    latitude: "",
    description: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [sendingTx, setSendingTx] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [transactionId, setTransactionId] = useState<string | undefined>(
    undefined
  );
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();
  const account: any = useCurrentAccount();

  const handleInputChange = (field: keyof CommunityFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      setFormData((prev) => ({ ...prev, image: file }));

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Please select a valid image file");
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setImagePreview(null);
  };

  async function uploadImageToCloudinary(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "my-uploads"); // replace with your preset
    formData.append("folder", "communities"); // optional folder in Cloudinary

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dztnevagf/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || "Image upload failed");
    }
    return data.secure_url; // Cloudinary URL
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendingTx(true);

    try {
      // 1️⃣ Upload image first (if selected)
      let imageUrl = "";
      if (formData.image) {
        imageUrl = await uploadImageToCloudinary(formData.image);
      }

      // 2️⃣ Get caller token balance
      const callerTokenBalance = await getCallerTokenBalance(
        account.address,
        `0x5c28ffccbaa739ecaae7cfddeffe15b8cbc09d3e4248e0b987b4f6bb1608cd2f::lit_token::LIT_TOKEN`
      );

      // 3️⃣ Convert string fields to vector<u8>
      const name: Uint8Array = new TextEncoder().encode(formData.communityName);
      const city: Uint8Array = new TextEncoder().encode(formData.city);
      const contact: Uint8Array = new TextEncoder().encode(formData.leaderName);
      const communityImage: Uint8Array = new TextEncoder().encode(imageUrl);

      console.log(communityImage);

      // 4️⃣ Parse latitude/longitude as u64
      const latitude: bigint = BigInt(
        Math.floor(Number(formData.latitude) * 1e6)
      );
      const longitude: bigint = BigInt(
        Math.floor(Number(formData.longitude) * 1e6)
      );

      // 5️⃣ Build transaction
      const tx = new Transaction();
      tx.moveCall({
        target: `${PACKAGE_ID}::${MODULE_NAME}::propose_hub`,
        arguments: [
          tx.object(REGISTRY_ID),
          tx.pure.vector("u8", name),
          tx.pure.vector("u8", city),
          tx.pure.u64(latitude),
          tx.pure.u64(longitude),
          tx.pure.vector("u8", contact),
          tx.pure.u64(callerTokenBalance),
          tx.pure.vector("u8", communityImage),
        ],
      });

      // 6️⃣ Execute transaction
      signAndExecute(
        { transaction: tx },
        {
          onSuccess: (result) => {
            toast.success("Community created successfully!");
            setTransactionId(result?.digest);
            setIsSuccessModalOpen(true);
            setFormData({
              leaderName: "",
              communityName: "",
              city: "",
              establishedNumber: "",
              longitude: "",
              latitude: "",
              description: "",
              image: null,
            });
            setImagePreview(null);
            setSendingTx(false);
          },
          onError: (err) => {
            toast.error("Failed to create community: " + err.message);
            setSendingTx(false);
          },
        }
      );
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Something went wrong during submission");
      setSendingTx(false);
    }
  };

  return (
    <div className="">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-2 border-yellow-200 bg-yellow-50/30">
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-medium text-yellow-900 mb-2">
                Create a Community
              </h1>
              <p className="text-yellow-700 text-sm leading-relaxed">
                Create a new community profile to add to the Lite Afrika
                platform. Share your community's story with funders and help us
                create a unique footprint for better aid.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* First Row - Leader and Community Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label
                    htmlFor="leaderName"
                    className="text-sm font-medium text-gray-700"
                  >
                    Community Leader Name
                  </Label>
                  <Input
                    id="leaderName"
                    value={formData.leaderName}
                    onChange={(e) =>
                      handleInputChange("leaderName", e.target.value)
                    }
                    className="mt-1"
                    placeholder="Enter leader's name"
                    required
                  />
                </div>

                <div>
                  <Label
                    htmlFor="communityName"
                    className="text-sm font-medium text-gray-700"
                  >
                    Community Name
                  </Label>
                  <Input
                    id="communityName"
                    value={formData.communityName}
                    onChange={(e) =>
                      handleInputChange("communityName", e.target.value)
                    }
                    className="mt-1"
                    placeholder="Enter community name"
                    required
                  />
                </div>
              </div>

              {/* Second Row - City and Established Number */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label
                    htmlFor="city"
                    className="text-sm font-medium text-gray-700"
                  >
                    City
                  </Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className="mt-1"
                    placeholder="Enter city name"
                    required
                  />
                </div>

                <div>
                  <Label
                    htmlFor="establishedNumber"
                    className="text-sm font-medium text-gray-700"
                  >
                    Established Number
                  </Label>
                  <Input
                    id="establishedNumber"
                    type="number"
                    value={formData.establishedNumber}
                    onChange={(e) =>
                      handleInputChange("establishedNumber", e.target.value)
                    }
                    className="mt-1"
                    placeholder="Year established"
                  />
                </div>
              </div>

              {/* Third Row - Longitude and Latitude */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label
                    htmlFor="longitude"
                    className="text-sm font-medium text-gray-700"
                  >
                    Longitude
                  </Label>
                  <Input
                    id="longitude"
                    type="number"
                    step="any"
                    value={formData.longitude}
                    onChange={(e) =>
                      handleInputChange("longitude", e.target.value)
                    }
                    className="mt-1"
                    placeholder="e.g. -0.1276"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="latitude"
                    className="text-sm font-medium text-gray-700"
                  >
                    Latitude
                  </Label>
                  <Input
                    id="latitude"
                    type="number"
                    step="any"
                    value={formData.latitude}
                    onChange={(e) =>
                      handleInputChange("latitude", e.target.value)
                    }
                    className="mt-1"
                    placeholder="e.g. 51.5074"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <Label
                  htmlFor="description"
                  className="text-sm font-medium text-gray-700"
                >
                  I need this community, and here is why:
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  className="mt-1 min-h-24"
                  placeholder="Describe why this community needs support and what impact the funding will have..."
                />
              </div>

              {/* Image Upload */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-3 block">
                  Community Image
                </Label>

                {imagePreview ? (
                  <div className="relative">
                    <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-gray-200">
                      <ImageWithFallback
                        src={imagePreview}
                        alt="Community preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      isDragOver
                        ? "border-yellow-400 bg-yellow-50"
                        : "border-gray-300 hover:border-yellow-400 hover:bg-yellow-50"
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <Camera size={24} className="text-gray-400" />
                      </div>

                      <div>
                        <p className="text-gray-600 mb-2">
                          Drag and drop an image here, or click to select
                        </p>
                        <p className="text-sm text-gray-500">
                          Supports JPG, PNG files up to 10MB
                        </p>
                      </div>

                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="image-upload"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          document.getElementById("image-upload")?.click()
                        }
                        className="border-yellow-400 text-yellow-600 hover:bg-yellow-50"
                      >
                        <Upload size={16} className="mr-2" />
                        Select Image
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-4 rounded-lg"
                  disabled={sendingTx}
                >
                  {sendingTx ? "Sending..." : "Create Community"}
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </motion.div>

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="Community Created!"
        message="Your community has been successfully created."
        transactionId={transactionId}
      />
    </div>
  );
}
