import { Card, CardContent, Typography, Checkbox, Button } from "@mui/material";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import styles from "shared/ui/Form/Form.module.scss";
import { useDispatch } from "react-redux";
import { sendRegistrationRequest } from "entities/auth/model/AuthSlice";

const SignUpForm = () => {
  const sxStyles = {
    card: { display: "flex", flexDirection: "column", marginTop: 4, width: 380, padding: 2 },
    form: { display: "flex", flexDirection: "column", gap: 1 },
    formSignIn: { alignSelf: "center", fontSize: 14 },
    button: { backgroundColor: "#1890FF", textTransform: "none" },
  };

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    const user = {
      user: { username: data.userName, email: data.email, password: data.password },
    };

    dispatch(sendRegistrationRequest(user));
  };

  return (
    <Card sx={sxStyles.card}>
      <CardContent>
        <h2 className={styles.header}>Create new account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <label htmlFor="username">
            {" "}
            Username
            <input
              id="username"
              className={(errors?.userName && `${styles.error} ${styles.input}`) || styles.input}
              type="text"
              placeholder="Username"
              {...register("userName", { required: "Required field", max: 20, min: 3, maxLength: 30 })}
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
            Password
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

          <label htmlFor="repeatPassword">
            {" "}
            Repeat password
            <input
              className={(errors?.repeatPassword && `${styles.error} ${styles.input}`) || styles.input}
              type="password"
              placeholder="Repeat password"
              id="repeatPassword"
              {...register("repeatPassword", {
                required: "Required field",
                validate: {
                  checkPassword: (repeatPassword, { password }) => {
                    return repeatPassword !== password ? "Passwords must match" : null;
                  },
                },
              })}
            />
            <div className={errors?.repeatPassword && styles.inputError}>
              {errors?.repeatPassword && (
                <p className={styles.errorMessage}>{errors?.repeatPassword?.message || "Error!"}</p>
              )}
            </div>
          </label>
          <div className={styles.checkbox}>
            <Checkbox id="checkbox" required />
            <label htmlFor="checkbox">I agree to the processing of my personal information</label>
          </div>

          <Button variant="contained" type="submit" disabled={!isValid} sx={sxStyles.button}>
            Create
          </Button>
          <Typography sx={sxStyles.formSignIn}>
            Already have an account?{" "}
            <Link to="/sign-in" style={{ textDecoration: "none", color: "#1890FF" }}>
              Sign in
            </Link>
            .
          </Typography>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;
