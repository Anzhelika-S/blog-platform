import { CircularProgress, Alert, Box, Card } from "@mui/material";
import { useSearchParams } from "react-router";
import { Article } from "entities/article";
import { useFetchArticlesQuery } from "shared/api/blogApi";

import ListPagination from "./Pagination";
import styles from "./ArticleList.module.scss";

const sxStyles = {
  boxShadow: {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: 70,
    background: "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))",
  },
  card: { maxHeight: 140, padding: 2, overflow: "hidden", position: "relative" },
  loadingBox: { display: "flex", height: 200, justifyContent: "center", alignContent: "center", flexWrap: "wrap" },
};

const ArticleList = () => {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const newOffset = (currentPage - 1) * 20;

  const { data: articles, error, isLoading } = useFetchArticlesQuery(newOffset);

  return (
    <>
      {error ? (
        <Alert severity="error">Something went wrong, try reloading the page</Alert>
      ) : isLoading ? (
        <Box sx={sxStyles.loadingBox}>
          <CircularProgress />
        </Box>
      ) : !error && !isLoading && articles.articles ? (
        <ul className={styles.list}>
          {articles.articles.map((article) => {
            return (
              <Card component="li" key={article.slug} sx={sxStyles.card}>
                <Article article={article} showActions={false} />
                <Box component="span" sx={sxStyles.boxShadow} />
              </Card>
            );
          })}
        </ul>
      ) : null}

      <ListPagination articlesCount={articles?.articlesCount} />
    </>
  );
};

export default ArticleList;
