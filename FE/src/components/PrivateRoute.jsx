import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const accessToken = sessionStorage.getItem("accessToken");

      if (!accessToken) {
        // Redirect to "/" if accessToken is not found
        navigate("/");
        setLoading(false);
        return;
      }

      try {
        // Fetch user info if accessToken is found
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/auth/getUserInfo`,
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        );

        const { groups } = response.data;

        // Check the role and decide the redirect path
        if (groups.includes("customer")) {
          navigate("/");
        } else if (groups.includes("admin")) {
          navigate("/admin");
        } else {
          navigate("/unauthorized"); // Handle other roles
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        navigate("/signin"); // Redirect to login on error
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner
  }

  return children;
};

export default PrivateRoute;
