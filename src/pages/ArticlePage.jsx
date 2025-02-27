import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { Card } from '@mui/material';

import { selectArticles } from '../features/ArticleList/ArticleListSlice';
import Article from '../features/Article/Article';

const ArticlePage = () => {
  const { articles } = useSelector(selectArticles);
  const { slug } = useParams();
  const article = articles.find((article) => article.slug === slug);

  return (
    <Card sx={{ maxWidth: 1000, margin: '10px auto', padding: 2 }}>
      <Article article={article} />
    </Card>
  );
};

export default ArticlePage;
