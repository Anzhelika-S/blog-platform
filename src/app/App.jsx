import { Route, Routes } from "react-router";
import { Header } from "widgets/header";
import { ArticleList } from "features/ArticleList";
import { ArticlePage } from "pages/ArticlePage";
import { SignUpPage } from "pages/SignUpPage";
import { SignInPage } from "pages/SignInPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/" element={<ArticleList />} />
        <Route path="/articles/:slug" element={<ArticlePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/profile" />
      </Routes>
    </>
  );
}

export default App;
