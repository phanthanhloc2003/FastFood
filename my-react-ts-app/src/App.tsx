import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { setCredentials } from "./store/slices/authSlice";

import { useDispatch } from "react-redux";
import AppRoutes from "./routes";
import usersApi from "./services/user";

const App: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const user = await usersApi.getById();
          dispatch(setCredentials({ user }));
        } catch (error) {
          console.error("Error fetching user:", error);
          localStorage.removeItem("token");
        }
      }
    };
    fetchUser();
  }, [dispatch]);

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
