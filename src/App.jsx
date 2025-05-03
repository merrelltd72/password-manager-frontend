import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SignupPage from "./pages/SignupPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import CreateAccountPage from "./pages/CreateAccountPage";
import ViewAccountsPage from "./pages/ViewAccountsPage";
import GeneratePassword from "./components/GeneratePassword";
import CreatePasswordReminderPage from "./pages/CreatePasswordReminderPage";
import AccountUploadPage from "./pages/AccountUploadPage";
import PageNotFoundPage from "./pages/PageNotFoundPage";


axios.defaults.baseURL = "http://localhost:3000";
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
      { path: "/create", element: <CreateAccountPage /> },
      {
        path: "/accounts",
        element: <ViewAccountsPage />,
      },
      { path: "/accountupload", element: <AccountUploadPage /> },
      { path: "/generatepassword", element: <GeneratePassword /> },
      { path: "/createpasswordreminder", element: <CreatePasswordReminderPage />},
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
