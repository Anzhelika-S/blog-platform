import { Card, CardContent, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import styles from "shared/ui/Form/Form.module.scss";

import { TagFieldArray } from "./TagFieldArray";

const sxStyles = {
  card: { display: "flex", flexDirection: "column", marginTop: 4, width: 1000, padding: 2 },
  form: { display: "flex", flexDirection: "column", gap: 1 },
  formSignIn: { alignSelf: "center" },
  button: { backgroundColor: "#1890FF", textTransform: "none" },
};

const ArticleForm = ({ header, initialValues, onSubmit }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      tags: initialValues.tags,
    },
  });

  return (
    <Card sx={sxStyles.card}>
      <CardContent>
        <h2 className={styles.header}>{header}</h2>
        <form action="" className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="title">
            {" "}
            Title
            <input
              className={(errors?.title && `${styles.error} ${styles.input}`) || styles.input}
              type="text"
              placeholder="Title"
              id="title"
              defaultValue={initialValues.title}
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
              defaultValue={initialValues.description}
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
              defaultValue={initialValues.body}
              {...register("textBody", {
                required: "Your article shouldn't be empty",
                minLength: 1,
              })}
            />
            <div className={errors?.textBody && styles.inputError}>
              {errors?.textBody && <p className={styles.errorMessage}>{errors?.textBody?.message}</p>}
            </div>
          </label>
          <TagFieldArray register={register} control={control} />
          <Button variant="contained" type="submit" sx={sxStyles.button}>
            Send
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ArticleForm;
