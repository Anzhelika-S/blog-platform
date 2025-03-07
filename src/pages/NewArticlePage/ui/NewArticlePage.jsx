import { Box } from "@mui/material";
import { ArticleForm } from "features/ArticleForm";

const NewArticlePage = () => {
  return (
    <Box sx={{ display: "flex", alignContent: "center", justifyContent: "center" }}>
      <ArticleForm />
    </Box>
  );
};

export default NewArticlePage;
