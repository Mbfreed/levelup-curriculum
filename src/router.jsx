import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import HomeRoute from "./components/HomeRoute/HomeRoute";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import CourseCatalog from "./pages/CourseCatalog/CourseCatalog";
import LessonViewer from "./pages/LessonViewer/LessonViewer";
import ProfileNew from "./pages/Profile/ProfileNew";
import PeerReview from "./pages/PeerReview/PeerReview";
import Rewards from "./pages/Rewards/Rewards";
import Certificates from "./pages/Certificates/Certificates";
import Discussion from "./pages/Discussion/Discussion";
import DiscussionDetail from "./pages/DiscussionDetail/DiscussionDetail";
import NotFound from "./pages/NotFound/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: HomeRoute,
      },
      {
        path: "landing",
        Component: () => (
          <AuthRoute>
            <Landing />
          </AuthRoute>
        ),
      },
      {
        path: "login",
        Component: () => (
          <AuthRoute>
            <Login />
          </AuthRoute>
        ),
      },
      {
        path: "register",
        Component: () => (
          <AuthRoute>
            <Register />
          </AuthRoute>
        ),
      },
      {
        path: "dashboard",
        Component: () => (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "courses",
        Component: () => (
          <ProtectedRoute>
            <CourseCatalog />
          </ProtectedRoute>
        ),
      },
      {
        path: "courses/:courseId/lessons/:lessonId",
        Component: () => (
          <ProtectedRoute>
            <LessonViewer />
          </ProtectedRoute>
        ),
      },
      {
        path: "courses/:courseId/lessons/:lessonId/review",
        Component: () => (
          <ProtectedRoute>
            <PeerReview />
          </ProtectedRoute>
        ),
      },
      {
        path: "rewards",
        Component: () => (
          <ProtectedRoute>
            <Rewards />
          </ProtectedRoute>
        ),
      },
      {
        path: "certificates",
        Component: () => (
          <ProtectedRoute>
            <Certificates />
          </ProtectedRoute>
        ),
      },
      {
        path: "discussion",
        Component: () => (
          <ProtectedRoute>
            <Discussion />
          </ProtectedRoute>
        ),
      },
      {
        path: "discussion/:discussionId",
        Component: () => (
          <ProtectedRoute>
            <DiscussionDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        Component: () => (
          <ProtectedRoute>
            <ProfileNew />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
