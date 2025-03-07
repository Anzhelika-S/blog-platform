import { Card, CardContent, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import styles from "shared/ui/Form/Form.module.scss";
import { postArticle } from "entities/article/model/articleSlice";
import { selectToken } from "entities/auth/model/AuthSlice";

const sxStyles = {
  card: { display: "flex", flexDirection: "column", marginTop: 4, width: 1000, padding: 2 },
  form: { display: "flex", flexDirection: "column", gap: 1 },
  formSignIn: { alignSelf: "center" },
  button: { backgroundColor: "#1890FF", textTransform: "none" },
};

const ArticleForm = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken) || JSON.parse(localStorage.getItem("token"));
  console.log(token);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  //    "article": {
  //     "title": "string",
  //     "description": "string",
  //     "body": "string",
  //     "tags": [
  //       "string"
  //     ]
  //   }

  const onSubmit = (data) => {
    const article = {
      article: {
        title: data.title,
        description: data.desc,
        body: data.textBody,
        tags: [],
      },
    };

    dispatch(postArticle(article, token));
  };

  return (
    <Card sx={sxStyles.card}>
      <CardContent>
        <h2 className={styles.header}>Create new article</h2>
        <form action="" className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="title">
            {" "}
            Title
            <input
              className={(errors?.title && `${styles.error} ${styles.input}`) || styles.input}
              type="text"
              placeholder="Title"
              id="title"
              {...register("title", {
                required: "Your article needs a title",
                maxLength: 1000,
                minLength: 1,
              })}
            />
            <div className={errors?.title && styles.inputError}>
              {errors?.title && <p className={styles.errorMessage}>{errors?.title?.message}</p>}
            </div>
          </label>

          <label htmlFor="desc">
            {" "}
            Short description
            <input
              className={(errors?.desc && `${styles.error} ${styles.input}`) || styles.input}
              type="text"
              placeholder="Title"
              id="desc"
              {...register("desc", {
                required: "Your article needs a description",
                maxLength: {
                  value: 200,
                  message: "Short description is called short for a reason...",
                },
                minLength: 1,
              })}
            />
            <div className={errors?.desc && styles.inputError}>
              {errors?.desc && <p className={styles.errorMessage}>{errors?.desc?.message}</p>}
            </div>
          </label>

          <label htmlFor="textBody">
            {" "}
            Text
            <textarea
              className={(errors?.textBody && `${styles.error} ${styles.input}`) || styles.input}
              style={{ height: "auto", fontFamily: "inherit", resize: "none" }}
              placeholder="Text"
              rows={20}
              wrap="hard"
              id="textBody"
              {...register("textBody", {
                required: "Your article shouldn't be empty",
                minLength: 1,
              })}
            />
            <div className={errors?.textBody && styles.inputError}>
              {errors?.textBody && <p className={styles.errorMessage}>{errors?.textBody?.message}</p>}
            </div>
          </label>
          <Button variant="contained" type="submit" sx={sxStyles.button}>
            Send
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ArticleForm;
