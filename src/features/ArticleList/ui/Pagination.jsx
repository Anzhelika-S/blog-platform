import { createTheme, Pagination, PaginationItem, Stack, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router";

import { selectArticlesCount } from "../model/ArticleListSlice";

const ListPagination = () => {
  const articlesCount = useSelector(selectArticlesCount);
  const totalPages = Math.ceil(articlesCount / 20);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePageChange = (_, newPage) => {
    setSearchParams({ page: newPage });
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#1890FF",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={2} direction="row" sx={{ justifyContent: "center", marginBottom: 3 }}>
        <Pagination
          shape="rounded"
          count={totalPages}
          page={currentPage}
          color="primary"
          onChange={handlePageChange}
          renderItem={(item) => <PaginationItem component={Link} to={`/articles/?page=${item.page}`} {...item} />}
        />
      </Stack>
    </ThemeProvider>
  );
};

export default ListPagination;
