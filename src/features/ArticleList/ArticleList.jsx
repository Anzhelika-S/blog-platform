import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress, Alert, Box } from '@mui/material';

import Article from '../Article/Article';

import styles from './ArticleList.module.scss';
import { fetchArticles } from './ArticleListSlice';

export const ArticleList = () => {
  const articles = useSelector((state) => state.articles);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  return (
    <>
      {!articles.loading && articles.error ? (
        <Alert severity="error">Something went wrong, try reloading the page</Alert>
      ) : null}
      {articles.loading && (
        <Box sx={{ display: 'flex', height: 200, justifyContent: 'center', alignContent: 'center', flexWrap: 'wrap' }}>
          <CircularProgress />
        </Box>
      )}
      {!articles.loading && !articles.error ? (
        <ul className={styles.list}>
          {articles.articles.map((article) => {
            return (
              <li key={article.slug}>
                <Article article={article} />
              </li>
            );
          })}
        </ul>
      ) : null}
    </>
  );
};
