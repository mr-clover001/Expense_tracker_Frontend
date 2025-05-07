import React, { useContext, useEffect } from "react";
import axiosInstance from "../utlis/axiosinstance";
import { API_PATHS } from "../utlis/apiPath";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export const useUserAuth = () => {
  const { user, updateUser, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) return; // If user is already set, no need to fetch again

    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
        if (response.data) {
          updateUser(response.data); // Update user context with the fetched data
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        if (error.response && error.response.status === 401) {
          clearUser(); // Clear user data if not authorized
          navigate("/login"); // Redirect to login page
        }
      }
    };

    fetchUserInfo();

    return () => {
      // Cleanup if needed
    };
  }, [user, updateUser, clearUser, navigate]);

  // No need to return anything if you just want to handle side effects
};
