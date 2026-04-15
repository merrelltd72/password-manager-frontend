import { lazy } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import axios from "axios";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import SignupPage from "./pages/SignupPage";
// import LandingPage from "./pages/LandingPage";
// import LoginPage from "./pages/LoginPage";
// import CreateAccountPage from "./pages/CreateAccountPage";
// import ViewAccountsPage from "./pages/ViewAccountsPage";
// import GeneratePassword from "./components/GeneratePassword";
// import AccountUploadPage from "./pages/AccountUploadPage";
// import CreatePasswordReminder from "./pages/CreatePasswordReminder";
// import PageNotFoundPage from "./pages/PageNotFoundPage";

const Header = lazy(() => import("./components/Header"));
const Footer = lazy(() => import("./components/Footer"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const CreateAccountPage = lazy(() => import("./pages/CreateAccountPage"));
const ViewAccountsPage = lazy(() => import("./pages/ViewAccountsPage"));
const GeneratePassword = lazy(() => import("./components/GeneratePassword"));
const AccountUploadPage = lazy(() => import("./pages/AccountUploadPage"));
const CreatePasswordReminder = lazy(
  () => import("./pages/CreatePasswordReminder"),
);
const PageNotFoundPage = lazy(() => import("./pages/PageNotFoundPage"));

axios.defaults.baseURL = `${import.meta.env.VITE_API_BASE_URL}`;
axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    element: (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    ),
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/login", element: <LoginPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/create", element: <CreateAccountPage /> },
          {
            path: "/accounts",
            element: <ViewAccountsPage />,
          },
          { path: "/accountupload", element: <AccountUploadPage /> },
          { path: "/generatepassword", element: <GeneratePassword /> },
          {
            path: "/createpasswordreminder/:accountId",
            element: <CreatePasswordReminder />,
          },
        ],
      },
      { path: "*", element: <PageNotFoundPage /> },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
