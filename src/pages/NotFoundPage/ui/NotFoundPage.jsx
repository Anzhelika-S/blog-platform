import { Box } from "@mui/material";
import { Alert } from "@mui/material";
import NotFoundImg from "shared/assets/NotFoundImg.png";

const NotFoundPage = () => {
  return (
    <Box sx={{ maxWidth: 400, maxHeight: 200, margin: "50px auto" }}>
      <Alert severity="info" variant="outlined">
        Nothing here
      </Alert>
      <img src={NotFoundImg} alt="" style={{ width: "100%" }} />
    </Box>
  );
};

export default NotFoundPage;
