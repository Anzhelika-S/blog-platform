import { Link } from "react-router";

import styles from "./SignInButton.module.scss";

const SignInButton = () => {
  return (
    <Link to="/sign-in" className={styles.signInButton}>
      Sign in
    </Link>
  );
};

export default SignInButton;
