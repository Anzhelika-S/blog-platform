import { Link } from "react-router";

import styles from "./CreateArticleButton.module.scss";

const CreateArticleButton = () => {
  return (
    <Link to="/new-article" className={styles.button}>
      Create article
    </Link>
  );
};

export default CreateArticleButton;
