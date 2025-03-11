import ArticleForm from "shared/ui/ArticleForm/ArticleForm";
import { useNavigate } from "react-router";
import { useCreateArticleMutation } from "shared/api/blogApi";
import { toast } from "react-toastify";
import { toastError, toastSuccess } from "shared/ui/toasts/toastNotifications";

const CreateArticleForm = () => {
  const navigate = useNavigate();
  const [createArticle, { error }] = useCreateArticleMutation();

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
    try {
      createArticle(article);
      toast.success("Article has been created!", toastSuccess);

      navigate("/");
    } catch {
      toast.error(`Couldn't create the article: ${Object.entries(error.data.errors).join(" ")}`, toastError);
    }
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
