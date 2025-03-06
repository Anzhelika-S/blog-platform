import { Box } from "@mui/material";
import { UserProfileForm } from "features/UserProfileForm";

const UserProfilePage = () => {
  return (
    <Box sx={{ display: "flex", alignContent: "center", justifyContent: "center" }}>
      <UserProfileForm />
    </Box>
  );
};

export default UserProfilePage;
