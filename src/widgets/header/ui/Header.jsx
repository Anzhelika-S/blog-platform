import SignInButton from "./SignInButton";
import styles from "./Header.module.scss";
import SignUpButton from "./SignUpButton";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>Realworld Blog</h1>
      <SignInButton />
      <SignUpButton />
    </header>
  );
};

export default Header;
