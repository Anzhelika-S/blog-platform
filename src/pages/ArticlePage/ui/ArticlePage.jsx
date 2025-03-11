import { useParams } from "react-router";
import { Card } from "@mui/material";
import Article from "entities/article/ui/Article";
import { CircularProgress, Box, Alert } from "@mui/material";
import { useFetchArticleQuery } from "shared/api/blogApi";

const sxStyles = {
  loadingBox: { display: "flex", height: 200, justifyContent: "center", alignContent: "center", flexWrap: "wrap" },
};

const ArticlePage = () => {
  const { slug } = useParams();

  const { data: article, isLoading, error } = useFetchArticleQuery(slug);

  if (!article) {
    return <Alert severity="info">Article doesn&apos;t exist</Alert>;
  }

  return (
    <Card sx={{ maxWidth: 1000, margin: "10px auto", padding: 2 }}>
      {isLoading ? (
        <Box sx={sxStyles.loadingBox}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <div>
          <Alert severity="error">Something went wrong, try reloading the page</Alert>
        </div>
      ) : article?.article.slug ? (
        <Article article={article.article} showActions={true} />
      ) : null}
    </Card>
  );
};

export default ArticlePage;
