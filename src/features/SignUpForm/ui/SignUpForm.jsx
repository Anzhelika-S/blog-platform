import { Card, CardContent, Typography, Checkbox, Button, FormControlLabel } from "@mui/material";
import { Link } from "react-router";

import styles from "./SignUpForm.module.scss";

const SignUpForm = () => {
  const sxStyles = {
    card: { display: "flex", flexDirection: "column", marginTop: 2, width: 380, padding: 2 },
    form: { display: "flex", flexDirection: "column", gap: 1 },
    formSignIn: { alignSelf: "center" },
    button: { backgroundColor: "#1890FF" },
  };

  return (
    <Card sx={sxStyles.card}>
      <CardContent>
        <h2 className={styles.header}>Create new account</h2>
        <form action="" className={styles.form}>
          <label>Username</label>
          <input type="text" required className={styles.input} />
          <label>Email address</label>
          <input type="text" required className={styles.input} />
          <label>Password</label>
          <input type="text" required className={styles.input} />
          <label>Repeat Password</label>
          <input type="text" required className={styles.input} />
          <FormControlLabel
            label="I agree to the processing of my personal information"
            required
            control={<Checkbox />}
          />
          <Button variant="contained" sx={sxStyles.button}>
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
