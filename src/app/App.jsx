import { Navigate, Route, Routes } from "react-router";
import { Header } from "widgets/header";
import { ArticleList } from "features/ArticleList";
import { ArticlePage } from "pages/ArticlePage";
import { SignUpPage } from "pages/SignUpPage";
import { SignInPage } from "pages/SignInPage";
import { useSelector } from "react-redux";
import { selectToken } from "entities/auth/model/AuthSlice";
import { UserProfilePage } from "pages/UserProfilePage";

function App() {
  const token = useSelector(selectToken);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/" element={<ArticleList />} />
        <Route path="/articles/:slug" element={<ArticlePage />} />
        <Route path="/sign-in" element={token ? <Navigate replace to="/" /> : <SignInPage />} />
        <Route path="/sign-up" element={token ? <Navigate replace to="/" /> : <SignUpPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
      </Routes>
    </>
  );
}

export default App;
