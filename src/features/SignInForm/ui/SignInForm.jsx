import { Card, CardContent, Typography, Button } from "@mui/material";
import { Link } from "react-router";

import styles from "./SignInForm.module.scss";

const SignInForm = () => {
  const sxStyles = {
    card: { display: "flex", flexDirection: "column", marginTop: 2, width: 380, padding: 2 },
    form: { display: "flex", flexDirection: "column", gap: 1 },
    formSignIn: { alignSelf: "center" },
    button: { backgroundColor: "#1890FF" },
  };

  return (
    <Card sx={sxStyles.card}>
      <CardContent>
        <h2 className={styles.header}>Sign In</h2>
        <form action="" className={styles.form}>
          <label>Email address</label>
          <input type="text" required className={styles.input} />
          <label>Password</label>
          <input type="text" required className={styles.input} />
          <Button variant="contained" sx={sxStyles.button}>
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
