import { Card, CardContent, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import styles from "shared/ui/Form/Form.module.scss";
import { selectUser } from "entities/auth/model/AuthSlice";
import { sendEditRequest } from "entities/auth/model/AuthSlice";
import { selectToken } from "entities/auth/model/AuthSlice";
import { useEffect } from "react";
import { fetchUserInfo } from "entities/auth/model/AuthSlice";

const sxStyles = {
  card: { display: "flex", flexDirection: "column", marginTop: 4, width: 380, padding: 2 },
  form: { display: "flex", flexDirection: "column", gap: 1 },
  button: { backgroundColor: "#1890FF", textTransform: "none" },
};

const imageUrlPattern = /^(https?:\/\/)?(.*\.(?:png|jpe?g|gif|webp|bmp|svg))$/i;

const UserProfileForm = () => {
  const token = useSelector(selectToken) || JSON.parse(localStorage.getItem("token"));
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (token && !user) {
      dispatch(fetchUserInfo(token));
    }
  }, [token, user, dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    console.log(data);

    const user = {
      user: { username: data.userName, email: data.email, password: data.password, image: data.avatar },
    };

    dispatch(sendEditRequest(user));
  };

  return (
    <Card sx={sxStyles.card}>
      <CardContent>
        <h2 className={styles.header}>Edit Profile</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <label htmlFor="username">
            {" "}
            Username
            <input
              id="username"
              className={(errors?.userName && `${styles.error} ${styles.input}`) || styles.input}
              type="text"
              placeholder="Username"
              defaultValue={user?.username}
              {...register("userName", { required: "Required field", minLength: 3, maxLength: 30 })}
            />
            <div className={errors?.userName && styles.inputError}>
              {errors?.userName && (
                <p className={styles.errorMessage}>
                  {errors?.userName?.message || "Username should be 3 to 20 characters"}
                </p>
              )}
            </div>
          </label>

          <label htmlFor="email">
            {" "}
            Email
            <input
              className={(errors?.email && `${styles.error} ${styles.input}`) || styles.input}
              type="email"
              placeholder="Email"
              defaultValue={user?.email}
              id="email"
              {...register("email", {
                required: "Required field",
                pattern: {
                  value: /(^[a-z][a-z0-9_.+-]+@[a-z0-9-]+\.[a-z0-9-.]+$)/,
                  message: "Entered value does not match email format",
                },
              })}
            />
            <div className={errors?.email && styles.inputError}>
              {errors?.email && (
                <p className={styles.errorMessage}>{errors?.email?.message || "You should use a valid email"}</p>
              )}
            </div>
          </label>

          <label htmlFor="password">
            {" "}
            New password
            <input
              className={(errors?.password && `${styles.error} ${styles.input}`) || styles.input}
              type="password"
              placeholder="Password"
              id="password"
              {...register("password", {
                required: "Required field",
                minLength: {
                  value: 6,
                  message: "Password should be at least 6 characters",
                },
                maxLength: { value: 40, message: "Password should not be longer than 40 characters" },
              })}
            />
            <div className={errors?.password && styles.inputError}>
              {errors?.password && (
                <p className={styles.errorMessage}>
                  {errors?.password?.message || "Your password needs to be at least 6 characters"}
                </p>
              )}
            </div>
          </label>

          <label htmlFor="avatar">
            {" "}
            Avatar image &#40;url&#41;
            <input
              className={(errors?.avatar && `${styles.error} ${styles.input}`) || styles.input}
              type="text"
              placeholder="Avatar image"
              id="avatar"
              {...register("avatar", {
                required: "Required field",
                pattern: imageUrlPattern,
              })}
            />
          </label>
          <Button variant="contained" type="submit" sx={sxStyles.button}>
            Save
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserProfileForm;
