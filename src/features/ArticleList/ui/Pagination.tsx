import { createTheme, Pagination, PaginationItem, Stack, ThemeProvider } from "@mui/material";
import React from "react";
import { Link, useSearchParams } from "react-router";

const ListPagination = ({ articlesCount } : any) => {
  const totalPages = Math.ceil(articlesCount / 20);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePageChange = (_: any, newPage: number) => {
    setSearchParams({ page: newPage.toString() });
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
