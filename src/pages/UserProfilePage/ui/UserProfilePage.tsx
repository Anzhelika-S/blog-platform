import { Box } from "@mui/material";
import { UserProfileForm } from "features/UserProfileForm";
import React from "react";

const UserProfilePage = () => {
  return (
    <Box sx={{ display: "flex", alignContent: "center", justifyContent: "center" }}>
      <UserProfileForm />
    </Box>
  );
};

export default UserProfilePage;
