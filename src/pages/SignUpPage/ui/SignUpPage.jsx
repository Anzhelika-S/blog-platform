import { Box } from "@mui/material";
import { SignUpForm } from "features/SignUpForm";

const SignUpPage = () => {
  return (
    <Box sx={{ display: "flex", alignContent: "center", justifyContent: "center" }}>
      <SignUpForm />
    </Box>
  );
};

export default SignUpPage;
