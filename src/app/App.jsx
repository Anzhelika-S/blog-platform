import './App.css';
import { Route, Routes } from 'react-router';

import Header from '../components/header/Header';
import { ArticleList } from '../features/ArticleList/ArticleList';
import ArticlePage from '../pages/ArticlePage';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/articles/:slug" element={<ArticlePage />} />
      </Routes>
    </>
  );
}

export default App;
