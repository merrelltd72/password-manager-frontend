import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SignupPage from "./pages/SignupPage";
import LandingPage from "./pages/LandingPage";

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
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
