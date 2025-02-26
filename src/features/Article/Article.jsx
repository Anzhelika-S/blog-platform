import { Card, CardContent, CardHeader, Box, Typography } from '@mui/material';
import Markdown from 'markdown-to-jsx';
import { FavoriteRounded, FavoriteBorderRounded } from '@mui/icons-material';

import img from '../../img/UserPicture.png';

const sxStyles = {
  card: { maxHeight: 140, padding: 2, overflow: 'hidden', position: 'relative' },
  gridContainer: { display: 'flex', flexWrap: 'nowrap', gap: 2 },
  leftSection: { flex: 3, display: 'flex', flexDirection: 'column', gap: 1 },
  rightSection: { flex: 1, display: 'flex', justifyContent: 'end', alignItems: 'start', gap: 1 },
  titleBox: { display: 'flex', alignItems: 'center', gap: 1 },
  tags: { display: 'flex', gap: 1 },
  authorBox: { textAlign: 'end' },
  authorImage: { height: 50, width: 50 },
  cardHeader: { color: '#1890FF', padding: 0 },
  cardBody: { padding: 0, display: 'flex', flexDirection: 'column', gap: 1 },
  boxShadow: {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 70,
    background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))',
  },
};

const Article = ({ article }) => {
  const { body, description, title, createdAt, tagList, favorited, favoritesCount, author } = article;
  const date = new Date(createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <Card sx={sxStyles.card}>
      <Box sx={sxStyles.gridContainer}>
        <Box sx={sxStyles.leftSection}>
          <Box sx={sxStyles.titleBox}>
            <CardHeader title={title} sx={sxStyles.cardHeader} />
            {favorited ? <FavoriteRounded /> : <FavoriteBorderRounded />}
            <span>{favoritesCount}</span>
          </Box>
          <CardContent sx={sxStyles.cardBody}>
            <Box sx={sxStyles.tags}>
              {tagList.map((tag, index) => (
                <button key={index}>{tag}</button>
              ))}
            </Box>
            <div>{description}</div>
            <Markdown>{body}</Markdown>
          </CardContent>
        </Box>
        <Box sx={sxStyles.rightSection}>
          <Box sx={sxStyles.authorBox}>
            <Typography variant="h5">{author.username}</Typography>
            <Typography color="#00000080" variant="subtitle1">
              {date}
            </Typography>
          </Box>
          <Box>
            <img src={author.image || img} alt="User Picture" style={sxStyles.authorImage} />
          </Box>
        </Box>
      </Box>
      <Box component="span" sx={sxStyles.boxShadow} />
    </Card>
  );
};

export default Article;
