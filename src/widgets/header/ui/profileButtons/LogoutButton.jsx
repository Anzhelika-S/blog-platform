import { logout } from "entities/auth/model/AuthSlice";
import { useDispatch } from "react-redux";

import styles from "./LogoutButton.module.scss";

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleOnclick = () => {
    dispatch(logout());
  };

  return (
    <button className={styles.button} onClick={handleOnclick}>
      Log Out
    </button>
  );
};

export default LogoutButton;
