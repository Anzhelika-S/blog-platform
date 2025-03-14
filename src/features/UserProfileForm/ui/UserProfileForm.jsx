import { Card, CardContent, Button, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import styles from "shared/ui/Form/Form.module.scss";
import { useEditUserInfoMutation } from "shared/api/blogApi";
import { setUser } from "entities/auth/model/AuthSlice";
import { useNavigate } from "react-router";
import { useGetUserInfoQuery } from "shared/api/blogApi";
import { toast } from "react-toastify";
import { toastSuccess, toastError } from "shared/ui/toasts/toastNotifications";

const sxStyles = {
  card: { display: "flex", flexDirection: "column", marginTop: 4, width: 380, padding: 2 },
  form: { display: "flex", flexDirection: "column", gap: 1 },
  button: { backgroundColor: "#1890FF", textTransform: "none" },
};

const imageUrlPattern = /^(https?:\/\/)?(.*\.(?:png|jpe?g|gif|webp|bmp|svg))$/i;

const UserProfileForm = () => {
  const dispatch = useDispatch();
  const {
    data: { user },
  } = useGetUserInfoQuery();
  const [editUser, { error, isLoading }] = useEditUserInfoMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    const user = {
      user: { username: data.userName, email: data.email, password: data.password, image: data.avatar },
    };

    try {
      const response = await editUser(user).unwrap();
      dispatch(setUser(response.user));
      toast.success("Profile updated", toastSuccess);
      navigate("/");
    } catch (err) {
      toast.error(`Couldn't update the profile: ${Object.entries(err.data.errors).flat().join(" ")}`, toastError);
    }
  };

  return (
    <Card sx={sxStyles.card}>
      <CardContent>
        <h2 className={styles.header}>Edit Profile</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <label htmlFor="username">
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

          {error && <Alert severity="error">{Object.entries(error.data.errors).flat().join(" ")}</Alert>}

          <Button variant="contained" type="submit" disabled={isLoading} sx={sxStyles.button}>
            Save
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserProfileForm;
