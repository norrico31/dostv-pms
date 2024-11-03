import { ReactElement } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ManageUserRolesPage from "./pages/ManageUserRoles";
import UsersPage from "./pages/Users";
import { AppProvider } from "./context/AppContext";
import { PrivateRoute, PublicRoute } from "./components/PrivateRoute";

export default function App(): ReactElement {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/users"
            element={
              <PrivateRoute>
                <UsersPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/manage-roles"
            element={
              <PrivateRoute>
                <ManageUserRolesPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/"
            element={
              localStorage.getItem("isLoggedIn") ? (
                <Navigate to="/home" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </HashRouter>
    </AppProvider>
  );
}
