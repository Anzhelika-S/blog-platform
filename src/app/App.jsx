import './App.css';
import Header from '../components/header/Header';
import { ArticleList } from '../features/ArticleList/ArticleList';
import ListPagination from '../features/Pagination/Pagination';

function App() {
  return (
    <>
      <Header />
      <ArticleList />
      <ListPagination />
    </>
  );
}

export default App;
