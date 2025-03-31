import { Box } from "@mui/material";
import { CreateArticleForm } from "features/CreateArticleForm";
import React from "react";

const CreateArticlePage = () => {
  return (
    <Box sx={{ display: "flex", alignContent: "center", justifyContent: "center" }}>
      <CreateArticleForm />
    </Box>
  );
};

export default CreateArticlePage;
