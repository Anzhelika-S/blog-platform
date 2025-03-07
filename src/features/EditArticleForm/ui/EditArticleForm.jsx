import { useDispatch, useSelector } from "react-redux";
import { sendUpdateRequest } from "entities/article/model/articleSlice";
import ArticleForm from "shared/ui/ArticleForm/ArticleForm";
import { useParams } from "react-router";
import { useEffect } from "react";
import { fetchArticle } from "entities/article/model/articleSlice";
import { Box, CircularProgress } from "@mui/material";

const sxStyles = {
  loadingBox: { display: "flex", height: 200, justifyContent: "center", alignContent: "center", flexWrap: "wrap" },
};

const EditArticleForm = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const { article, isLoading } = useSelector((state) => state.article);
  console.log("Article here ", article);

  const { title, description, body, tagList } = article;

  useEffect(() => {
    dispatch(fetchArticle(slug));
  }, [slug, dispatch]);

  const handleEdit = (data) => {
    const tags = data.tags.filter((tag) => tag.value !== "");
    const article = {
      article: {
        title: data.title,
        description: data.desc,
        body: data.textBody,
        tagList: tags.map((tag) => tag.value),
      },
    };

    dispatch(sendUpdateRequest({ article, slug }));
  };

  return (
    <>
      {isLoading ? (
        <Box sx={sxStyles.loadingBox}>
          <CircularProgress />
        </Box>
      ) : (
        <ArticleForm
          initialValues={{
            title: title,
            description: description,
            body: body,
            tags: tagList?.map((tag) => ({ value: tag })),
          }}
          header={"Edit article"}
          onSubmit={handleEdit}
        />
      )}
    </>
  );
};

export default EditArticleForm;
