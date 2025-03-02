import { Card, CardContent, Typography, Button } from "@mui/material";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import styles from "shared/ui/Form/Form.module.scss";

const SignInForm = () => {
  const sxStyles = {
    card: { display: "flex", flexDirection: "column", marginTop: 2, width: 380, padding: 2 },
    form: { display: "flex", flexDirection: "column", gap: 1 },
    formSignIn: { alignSelf: "center" },
    button: { backgroundColor: "#1890FF" },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Card sx={sxStyles.card}>
      <CardContent>
        <h2 className={styles.header}>Sign In</h2>
        <form action="" className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">
            {" "}
            Email
            <input
              className={styles.input}
              type="email"
              placeholder="Email"
              id="email"
              {...register("email", {
                required: "Required field",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Entered value does not match email format",
                },
              })}
            />
            <div className={errors?.email && styles.inputError}>
              {errors?.email && <p>{errors?.email?.message || "You should use a valid email"}</p>}
            </div>
          </label>

          <label htmlFor="password">
            {" "}
            Password
            <input
              className={styles.input}
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
              {errors?.password && <p>{errors?.password?.message || "Password should be 6 to 40 characters"}</p>}
            </div>
          </label>
          <Button variant="contained" type="submit" sx={sxStyles.button}>
            Login
          </Button>
          <Typography sx={sxStyles.formSignIn}>
            Don&apos;t have an account?{" "}
            <Link to="/sign-up" style={{ textDecoration: "none", color: "#1890FF" }}>
              Sign up
            </Link>
            .
          </Typography>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignInForm;
