import { Link } from "react-router";

import SignInButton from "./visitorButtons/SignInButton";
import styles from "./Header.module.scss";
import SignUpButton from "./visitorButtons/SignUpButton";
import CreateArticleButton from "./profileButtons/CreateArticleButton";
import LogoutButton from "./profileButtons/LogoutButton";
import UserProfileButton from "./profileButtons/UserProfileButton";

const Header = () => {
  const token = localStorage.getItem("token");

  return (
    <header className={styles.header}>
      <h1>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          Realworld Blog
        </Link>
      </h1>
      {token ? (
        <>
          <CreateArticleButton />
          <UserProfileButton />
          <LogoutButton />
        </>
      ) : (
        <>
          <SignInButton />
          <SignUpButton />
        </>
      )}
    </header>
  );
};

export default Header;
