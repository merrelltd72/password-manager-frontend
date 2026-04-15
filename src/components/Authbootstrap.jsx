import { useEffect } from "react";
import axios from "axios";
import { useAuthDispatch } from "../context/AuthContext";

const AuthBootstrap = ({ children }) => {
  const dispatch = useAuthDispatch();

  useEffect(() => {
    let isMounted = true;

    const restoreSession = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/isLoggedIn`,
          {
            withCredentials: true,
          },
        );

        if (!isMounted) return;

        dispatch({
          type: "RESTORE_SESSION",
          payload: {
            user: res.data?.logged_in ? (res.data.user ?? null) : null,
          },
        });
      } catch (error) {
        if (!isMounted) return;
        dispatch({ type: "RESTORE_SESSION", payload: { user: null } });
      }
    };

    restoreSession();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  return children;
};
export default AuthBootstrap;
