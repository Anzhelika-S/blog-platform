import { Box } from "@mui/material";
import { EditArticleForm } from "features/EditArticleForm";

const EditArticlePage = () => {
  return (
    <Box sx={{ display: "flex", alignContent: "center", justifyContent: "center" }}>
      <EditArticleForm />
    </Box>
  );
};

export default EditArticlePage;
