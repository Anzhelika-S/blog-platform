import { useSelector } from "react-redux";
import { Link } from "react-router";
import { selectUser } from "entities/auth/model/AuthSlice";
import img from "shared/assets/UserPicture.png";

import styles from "./UserProfileButton.module.scss";

const UserProfileButton = () => {
  const user = useSelector(selectUser);

  return (
    <Link to="/profile" className={styles.profileButton}>
      <div className={styles.userName}>{user.username}</div>
      <img className={styles.userPicture} src={user.image || img} alt="User Picture" />
    </Link>
  );
};

export default UserProfileButton;
