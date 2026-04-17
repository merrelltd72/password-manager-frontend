import { lazy } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { ROUTES } from "./constants/routes";

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

axios.defaults.baseURL = String(`${import.meta.env.VITE_API_BASE_URL}`);
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
      { path: ROUTES.home, element: <LandingPage /> },
      { path: ROUTES.signup, element: <SignupPage /> },
      { path: ROUTES.login, element: <LoginPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: ROUTES.create, element: <CreateAccountPage /> },
          {
            path: ROUTES.accounts,
            element: <ViewAccountsPage />,
          },
          { path: ROUTES.accountUpload, element: <AccountUploadPage /> },
          { path: ROUTES.generatePassword, element: <GeneratePassword /> },
          {
            path: ROUTES.createPasswordReminder(":accountId"),
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
