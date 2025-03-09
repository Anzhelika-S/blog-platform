import { fetchUserInfo, selectToken } from "entities/auth/model/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router";

import SignInButton from "./visitorButtons/SignInButton";
import styles from "./Header.module.scss";
import SignUpButton from "./visitorButtons/SignUpButton";
import CreateArticleButton from "./profileButtons/CreateArticleButton";
import LogoutButton from "./profileButtons/LogoutButton";
import UserProfileButton from "./profileButtons/UserProfileButton";

const Header = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken) || JSON.parse(localStorage.getItem("token"));
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (token && !user) {
      dispatch(fetchUserInfo(token));
    }
  }, [token, user, dispatch]);

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
