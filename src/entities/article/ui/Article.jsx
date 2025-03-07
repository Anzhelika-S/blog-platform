import { CardContent, CardHeader, Button, Box, Typography, Avatar } from "@mui/material";
import Markdown from "markdown-to-jsx";
import { FavoriteRounded, FavoriteBorderRounded } from "@mui/icons-material";
import { Link, useNavigate } from "react-router";
import img from "shared/assets/UserPicture.png";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "entities/auth/model/AuthSlice";

import { sendDeleteRequest } from "../model/articleSlice";

import styles from "./Article.module.scss";

const sxStyles = {
  gridContainer: { display: "flex", flexWrap: "nowrap", gap: 2 },
  leftSection: { flex: 3, display: "flex", flexDirection: "column", gap: 1 },
  rightSection: { flex: 1, display: "flex", justifyContent: "end", alignItems: "start", gap: 1 },
  titleBox: { display: "flex", alignItems: "center", gap: 1 },
  tags: { display: "flex", gap: 1, maxWidth: 600, overflow: "hidden" },
  tagsView: { display: "flex", gap: 1, maxWidth: 600, flexWrap: "wrap" },
  authorBox: { textAlign: "end" },
  authorImage: { height: 50, width: 50 },
  cardHeader: { color: "#1890FF", padding: 0, maxWidth: 600 },
  cardBody: { padding: 0, display: "flex", flexDirection: "column", gap: 1 },
  headerText: {
    maxWidth: 600,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  headerTextView: {
    maxWidth: 600,
    overflowWrap: "anywhere",
  },
  descriptionBox: { maxWidth: 600, overflowWrap: "anywhere", color: "gray" },
};

const Article = ({ article, showActions }) => {
  const { body, description, title, createdAt, tagList, favorited, favoritesCount, author, slug } = article;
  const date = new Date(createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const loggedInUser = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(sendDeleteRequest(slug));
    navigate("/");
  };

  return (
    <Box sx={sxStyles.gridContainer}>
      <Box sx={sxStyles.leftSection}>
        <Box sx={sxStyles.titleBox}>
          <Link to={`/articles/${slug}`} className={styles.link}>
            <CardHeader
              title={<Typography sx={showActions ? sxStyles.headerTextView : sxStyles.headerText}>{title}</Typography>}
              sx={sxStyles.cardHeader}
            />
          </Link>
          <button className={styles.button}>
            {favorited ? <FavoriteRounded /> : <FavoriteBorderRounded />}
            <span>{favoritesCount}</span>
          </button>
        </Box>
        <CardContent sx={sxStyles.cardBody}>
          <Box sx={showActions ? sxStyles.tagsView : sxStyles.tags}>
            {tagList.map((tag, index) => (
              <div className={styles.tag} key={index}>
                {tag}
              </div>
            ))}
          </Box>
          <Box sx={sxStyles.descriptionBox}>{description}</Box>
          <Markdown className={styles.body}>{body}</Markdown>
        </CardContent>
      </Box>
      <Box sx={sxStyles.rightSection}>
        <Box sx={sxStyles.authorBox}>
          <Typography variant="h5">{author.username}</Typography>
          <Typography color="#00000080" variant="subtitle1">
            {date}
          </Typography>
          {loggedInUser?.username === author.username && showActions && (
            <Button variant="outlined" color="error" onClick={handleClick}>
              Delete
            </Button>
          )}
        </Box>
        <Box>
          <Avatar sx={{ width: 50, height: 50 }} src={author.image || img} alt={author.username} />
        </Box>
      </Box>
    </Box>
  );
};

export default Article;
