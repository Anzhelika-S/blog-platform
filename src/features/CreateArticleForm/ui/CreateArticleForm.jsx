import { useDispatch, useSelector } from "react-redux";
import { postArticle } from "entities/article/model/articleSlice";
import { selectToken } from "entities/auth/model/AuthSlice";
import ArticleForm from "shared/ui/ArticleForm/ArticleForm";
import { useNavigate } from "react-router";

const CreateArticleForm = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken) || JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();

  const handleCreate = (data) => {
    const tags = data.tags.filter((tag) => tag.value !== "" && tag.value.trim() !== "");

    const article = {
      article: {
        title: data.title,
        description: data.desc,
        body: data.textBody,
        tagList: tags.map((tag) => tag.value),
      },
    };

    dispatch(postArticle(article, token));
    navigate("/");
  };

  return (
    <ArticleForm
      initialValues={{ title: "", description: "", body: "", tags: [{ value: "" }] }}
      header={"Create new article"}
      onSubmit={handleCreate}
    />
  );
};

export default CreateArticleForm;
