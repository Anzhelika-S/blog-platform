import { Link } from "react-router";
import img from "shared/assets/UserPicture.png";
import { Avatar } from "@mui/material";
import { useGetUserInfoQuery } from "shared/api/blogApi";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "entities/auth/model/AuthSlice";

import styles from "./UserProfileButton.module.scss";

const UserProfileButton = () => {
  const { data: user } = useGetUserInfoQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(setUser(user.user));
    }
  }, [dispatch, user]);

  return (
    <Link to="/profile" className={styles.profileButton}>
      <div className={styles.userName}>{user?.user.username}</div>
      <Avatar src={user?.user.image || img} alt={user?.user.username} />
    </Link>
  );
};

export default UserProfileButton;
