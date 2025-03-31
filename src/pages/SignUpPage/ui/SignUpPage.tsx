import { Box } from "@mui/material";
import { SignUpForm } from "features/SignUpForm";
import React from "react";

const SignUpPage = () => {
  return (
    <Box sx={{ display: "flex", alignContent: "center", justifyContent: "center" }}>
      <SignUpForm />
    </Box>
  );
};

export default SignUpPage;
