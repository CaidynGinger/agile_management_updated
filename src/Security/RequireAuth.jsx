import axios from "axios";
import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";

export const RequireAuth = ({ allowedRoles }) => {
  const { Auth, setAuth } = useAuth();

  useEffect(() => {
    console.log(Auth);
  }, [Auth]);

  let decodedString = "{}";
  if (Auth.accessToken) {
    decodedString = atob(Auth?.accessToken?.split(".")[1]);
  }

  useEffect(() => {
    setAuth((prevState) => ({
      ...prevState,
      userData: JSON.parse(decodedString),
    }));
  }, [decodedString]);

  console.log(Auth.accessToken);
  console.log(allowedRoles);
  const location = useLocation();
  return Auth?.user?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : Auth.accessToken ? (
    <Navigate to="/Unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};
