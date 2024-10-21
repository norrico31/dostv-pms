import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

// This component will protect the home route
export function PrivateRoute({ children }: { children: ReactElement }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  // If the user is not logged in, redirect them to the login page
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// This component will protect the login route when the user is logged in
export function PublicRoute({ children }: { children: ReactElement }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  // If the user is already logged in, redirect them to the home page
  if (isLoggedIn) {
    return <Navigate to="/home" replace />;
  }

  return children;
}
