import ArticleForm from "shared/ui/ArticleForm/ArticleForm";
import { useNavigate, useParams } from "react-router";
import { Box, CircularProgress } from "@mui/material";
import { useFetchArticleQuery, useUpdateArticleMutation } from "shared/api/blogApi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { toastError, toastSuccess } from "shared/ui/toasts/toastNotifications";
import { useSelector } from "react-redux";
import { selectUser } from "entities/auth/model/AuthSlice";

const sxStyles = {
  loadingBox: { display: "flex", height: 200, justifyContent: "center", alignContent: "center", flexWrap: "wrap" },
};

const EditArticleForm = () => {
  const { slug } = useParams();
  const { data: article, isLoading, error: fetchError } = useFetchArticleQuery(slug);
  const [updateArticle, { error: updateError, isLoading: isLoadingUpdate }] = useUpdateArticleMutation();
  const loggedInUser = useSelector(selectUser);

  const [formValues, setFormValues] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (fetchError) {
      toast.error("Couldn't load the article, try again", toastError);
    }

    if (article) {
      if (article.article.author.username !== loggedInUser.username) {
        navigate(`/articles/${slug}`);
      } else {
        setFormValues({
          title: article.article.title,
          description: article.article.description,
          body: article.article.body,
          tags: article.article.tagList?.map((tag) => ({ value: tag })) || [],
        });
      }
    }
  }, [article, fetchError]);

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

    try {
      updateArticle({ article, slug });
      toast.success("Article has been updated!", toastSuccess);
      navigate(`/articles/${slug}`);
    } catch (err) {
      toast.error(`Couldn't update the article: ${Object.entries(err.data.errors).join(" ")}`, toastError);
    }
  };

  return (
    <>
      {isLoading ? (
        <Box sx={sxStyles.loadingBox}>
          <CircularProgress />
        </Box>
      ) : (
        <ArticleForm
          initialValues={formValues}
          header={"Edit article"}
          onSubmit={handleEdit}
          isLoading={isLoadingUpdate}
          error={updateError}
        />
      )}
    </>
  );
};

export default EditArticleForm;
