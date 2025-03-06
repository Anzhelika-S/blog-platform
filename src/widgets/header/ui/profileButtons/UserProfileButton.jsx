import { useSelector } from "react-redux";
import { Link } from "react-router";
import { selectUser } from "entities/auth/model/AuthSlice";
import img from "shared/assets/UserPicture.png";
import { Avatar } from "@mui/material";

import styles from "./UserProfileButton.module.scss";

const UserProfileButton = () => {
  const user = useSelector(selectUser) || JSON.parse(localStorage.getItem("user"));

  return (
    <Link to="/profile" className={styles.profileButton}>
      <div className={styles.userName}>{user.username}</div>
      <Avatar src={user.image || img} alt={user.username} />
    </Link>
  );
};

export default UserProfileButton;
