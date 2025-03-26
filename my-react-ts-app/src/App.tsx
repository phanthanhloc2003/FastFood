import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header/Header";
import { setCredentials } from "./store/slices/authSlice";
import { getDetailUser } from "./services/user";
import { useDispatch } from "react-redux";
import AppRoutes from "./routes";

const App: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const user = await getDetailUser();
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
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <AppRoutes />
        </main>
      </div>
    </Router>
  );
};

export default App;
