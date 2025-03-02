import { fetchUserInfo, selectToken } from "entities/auth/model/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import SignInButton from "./visitorButtons/SignInButton";
import styles from "./Header.module.scss";
import SignUpButton from "./visitorButtons/SignUpButton";
import CreateArticleButton from "./profileButtons/CreateArticleButton";
import LogoutButton from "./profileButtons/LogOutButton";
import UserProfileButton from "./profileButtons/UserProfileButton";

const Header = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserInfo(token));
    }
  }, [token, dispatch]);

  return (
    <header className={styles.header}>
      <h1>Realworld Blog</h1>
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
