import { createTheme, Pagination, Stack, ThemeProvider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { fetchArticles } from '../ArticleList/ArticleListSlice';

const ListPagination = () => {
  const articlesCount = useSelector((state) => state.articles.articlesCount);
  const totalPages = Math.floor(articlesCount / 20);
  const dispatch = useDispatch();

  const handlePageChange = (evt, newPage) => {
    const newOffset = (newPage - 1) * 20;

    dispatch(fetchArticles(newOffset));
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#1890FF',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={2} direction="row" sx={{ justifyContent: 'center' }}>
        <Pagination shape="rounded" count={totalPages} color="primary" onChange={handlePageChange} />
      </Stack>
    </ThemeProvider>
  );
};

export default ListPagination;

// color for buttons #1890FF
