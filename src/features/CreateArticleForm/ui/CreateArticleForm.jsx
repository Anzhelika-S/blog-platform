import ArticleForm from "shared/ui/ArticleForm/ArticleForm";
import { useNavigate } from "react-router";
import { useCreateArticleMutation } from "shared/api/blogApi";
import { toast } from "react-toastify";
import { toastError, toastSuccess } from "shared/ui/toasts/toastNotifications";

const CreateArticleForm = () => {
  const navigate = useNavigate();
  const [createArticle, { error, isLoading }] = useCreateArticleMutation();

  const handleCreate = async (data) => {
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
      const { article: newArticle } = await createArticle(article).unwrap();
      toast.success("Article has been created!", toastSuccess);
      navigate(`/articles/${newArticle.slug}`);
    } catch (err) {
      toast.error(`Couldn't create the article: ${Object.entries(err.data.errors).join(" ")}`, toastError);
    }
  };

  return (
    <ArticleForm
      initialValues={{ title: "", description: "", body: "", tags: [{ value: "" }] }}
      header={"Create new article"}
      onSubmit={handleCreate}
      isLoading={isLoading}
      error={error}
    />
  );
};

export default CreateArticleForm;
