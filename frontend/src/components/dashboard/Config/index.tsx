import React from "react";
import { SetGlobalVotingPage } from "./ConfigureVotingTIme";
import { UpdateCommunityDetails } from "./UpdateCommunityDetails";
import { CreateRegistryPage } from "./CreateRegistry";
import { FinalizeVotingPage } from "./FInalizeVoting";

const Configurations = () => {
  return (
    <>
      <CreateRegistryPage />
      <SetGlobalVotingPage />
      <UpdateCommunityDetails />
      <FinalizeVotingPage />
    </>
  );
};

export default Configurations;
