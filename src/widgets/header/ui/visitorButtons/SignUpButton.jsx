import { Link } from "react-router";

import styles from "./SignUpButton.module.scss";

const SignUpButton = () => {
  return (
    <Link to="/sign-up" className={styles.signUpButton}>
      Sign up
    </Link>
  );
};

export default SignUpButton;
