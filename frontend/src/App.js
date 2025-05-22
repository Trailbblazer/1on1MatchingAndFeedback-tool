import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import AddStartup from "./pages/AddStartup/AddStartup";
import AddStartupView from "./pages/AddStartupView/AddStartupView";
import AddCoaches from "./pages/AddCoaches/AddCoaches";
import AddCoachesView from "./pages/AddCoachesView/AddCoachesView";
import StartMatching from "./pages/StartMatching/Start Matching"; // <- fixed import
import SignupPage from "./pages/login/SignupPage";
import LoginPage from "./pages/login/LoginPage";
import { StrictMode } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const CLINET_ID = 884933282507-roa52cm6ntvi89mebusvv13hppgu0l5p.apps.googleusercontent.com;
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <StrictMode>
      <GoogleOAuthProvider clientId={CLINET_ID}> {/* <- add clientId */}
        <Router>
          <Routes>
            {/* Public routes */}
            <Route
              path="/login"
              element={<LoginPage onLogin={handleLogin} />}
            />
            <Route path="/signup" element={<SignupPage />} />

            {/* Protected routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-startup"
              element={
                <ProtectedRoute>
                  <AddStartup />
                </ProtectedRoute>
              }
            />
            <Route
              path="/view-startups"
              element={
                <ProtectedRoute>
                  <AddStartupView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-coaches"
              element={
                <ProtectedRoute>
                  <AddCoaches />
                </ProtectedRoute>
              }
            />
            <Route
              path="/view-coaches"
              element={
                <ProtectedRoute>
                  <AddCoachesView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/start-matching"
              element={
                <ProtectedRoute>
                  <StartMatching />
                </ProtectedRoute>
              }
            />

            {/* Redirect to login by default */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </GoogleOAuthProvider>
    </StrictMode>
  );
}

export default App;
