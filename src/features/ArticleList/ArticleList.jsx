import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress, Alert, Box, Card } from '@mui/material';

import Article from '../Article/Article';
import ListPagination from '../Pagination/Pagination';

import styles from './ArticleList.module.scss';
import { fetchArticles, selectArticles } from './ArticleListSlice';

export const ArticleList = () => {
  const articles = useSelector(selectArticles);
  const dispatch = useDispatch();
  const sxStyles = {
    boxShadow: {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: 70,
      background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))',
    },
    card: { maxHeight: 140, padding: 2, overflow: 'hidden', position: 'relative' },
    loadingBox: { display: 'flex', height: 200, justifyContent: 'center', alignContent: 'center', flexWrap: 'wrap' },
  };

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  return (
    <>
      {!articles.loading && articles.error ? (
        <Alert severity="error">Something went wrong, try reloading the page</Alert>
      ) : null}
      {articles.loading && (
        <Box sx={sxStyles.loadingBox}>
          <CircularProgress />
        </Box>
      )}
      {!articles.loading && !articles.error ? (
        <ul className={styles.list}>
          {articles.articles.map((article) => {
            return (
              <Card component="li" key={article.slug} sx={sxStyles.card}>
                <Article article={article} />
                <Box component="span" sx={sxStyles.boxShadow} />
              </Card>
            );
          })}
        </ul>
      ) : null}
      <ListPagination />
    </>
  );
};
