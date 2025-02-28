import { Route, Routes } from 'react-router';
import { Header } from 'widgets/header';
import { ArticleList } from 'features/ArticleList';
import { ArticlePage } from 'pages/ArticlePage';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/" element={<ArticleList />} />
        <Route path="/articles/:slug" element={<ArticlePage />} />
        <Route path="/sign-in" />
        <Route path="/sign-up" />
        <Route path="/profile" />
      </Routes>
    </>
  );
}

export default App;
