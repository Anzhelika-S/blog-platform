import { Navigate, Route, Routes } from "react-router";
import { Header } from "widgets/header";
import { ArticleList } from "features/ArticleList";
import { ArticlePage } from "pages/ArticlePage";
import { SignUpPage } from "pages/SignUpPage";
import { SignInPage } from "pages/SignInPage";
import { useSelector } from "react-redux";
import { selectToken } from "entities/auth/model/AuthSlice";
import { UserProfilePage } from "pages/UserProfilePage";
import { CreateArticlePage } from "pages/CreateArticlePage";
import { EditArticlePage } from "pages/EditArticlePage";
import NotFoundPage from "pages/NotFoundPage/ui/NotFoundPage";

import ErrorBoundary from "./providers/ErrorBoundary";

function App() {
  const token = useSelector(selectToken);

  return (
    <>
      <Header />
      <ErrorBoundary>
        <Routes>
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/" element={<ArticleList />} />
          <Route path="/articles/:slug" element={<ArticlePage />} />
          <Route path="/sign-in" element={token ? <Navigate replace to="/" /> : <SignInPage />} />
          <Route path="/sign-up" element={token ? <Navigate replace to="/" /> : <SignUpPage />} />
          <Route path="/profile" element={!token ? <Navigate replace to="/sign-in" /> : <UserProfilePage />} />
          <Route path="/new-article" element={!token ? <Navigate replace to="/sign-in" /> : <CreateArticlePage />} />
          <Route path="/:slug/edit" element={!token ? <Navigate replace to="/sign-in" /> : <EditArticlePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ErrorBoundary>
    </>
  );
}

export default App;
