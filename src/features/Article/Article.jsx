import { Card, CardContent, CardHeader, Box, Grid2, Typography } from '@mui/material';
import Markdown from 'markdown-to-jsx';
import { FavoriteRounded, FavoriteBorderRounded } from '@mui/icons-material';

import img from '../../img/UserPicture.png';

const Article = ({ article }) => {
  const { body, description, title, createdAt, tagList, favorited, favoritesCount, author } = article;
  const date = new Date(createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <Card sx={{ maxHeight: 140, padding: 2 }}>
      <Grid2 container spacing={2} direction="row" flexWrap="nowrap">
        <Grid2 size={9} direction="column">
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
            <CardHeader title={title} sx={{ color: '#1890FF', padding: 0 }} />
            {favorited ? <FavoriteRounded /> : <FavoriteBorderRounded />}
            <span>{favoritesCount}</span>
          </Box>
          <CardContent sx={{ padding: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {tagList.map((tag, index) => (
                <button key={index}>{tag}</button>
              ))}
            </Box>
            <div>{description}</div>
            <Markdown>{body}</Markdown>
          </CardContent>
        </Grid2>
        <Grid2 size={3}>
          <CardContent sx={{ display: 'flex', justifyContent: 'end', padding: 0, alignItems: 'center', gap: 1 }}>
            <Box sx={{ textAlign: 'end' }}>
              <Typography variant="h5">{author.username}</Typography>
              <Typography color="#00000080" variant="subtitle1">
                {date}
              </Typography>
            </Box>
            <Box>
              <img src={img} alt="User Picture" />
            </Box>
          </CardContent>
        </Grid2>
      </Grid2>
    </Card>
  );
};

export default Article;
