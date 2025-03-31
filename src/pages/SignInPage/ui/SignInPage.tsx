import { Box } from "@mui/material";
import { SignInForm } from "features/SignInForm";
import React from "react";

const SignInPage = () => {
  return (
    <Box sx={{ display: "flex", alignContent: "center", justifyContent: "center" }}>
      <SignInForm />
    </Box>
  );
};

export default SignInPage;
