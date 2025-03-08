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
import { NotFoundPage } from "pages/NotFoundPage";

import ProtectedRoute from "../shared/ui/ProtectedRoute/ProtectedRoute";

import ErrorBoundary from "./providers/ErrorBoundary";

const App = () => {
  const token = useSelector(selectToken);

  return (
    <>
      <Header />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Navigate replace to="/articles" />} />
          <Route path="/articles" element={<ArticleList />} />

          <Route path="/articles/:slug" element={<ArticlePage />} />
          <Route
            path="/articles/:slug/edit"
            element={
              <ProtectedRoute>
                <EditArticlePage />
              </ProtectedRoute>
            }
          />

          <Route path="/sign-in" element={token ? <Navigate replace to="/" /> : <SignInPage />} />
          <Route path="/sign-up" element={token ? <Navigate replace to="/" /> : <SignUpPage />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/new-article"
            element={
              <ProtectedRoute>
                <CreateArticlePage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ErrorBoundary>
    </>
  );
};

export default App;
