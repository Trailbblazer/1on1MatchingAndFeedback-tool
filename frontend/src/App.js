import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import UserHome from "./pages/UserHome/UserHome"; // New user home page
import AddStartup from "./pages/AddStartup/AddStartup";
import AddStartupView from "./pages/AddStartupView/AddStartupView";
import AddCoaches from "./pages/AddCoaches/AddCoaches";
import AddCoachesView from "./pages/AddCoachesView/AddCoachesView";
import StartMatching from "./pages/StartMatching/Start Matching";
import SignupPage from "./pages/login/SignupPage";
import LoginPage from "./pages/login/LoginPage";
import AddTime from "./pages/AddCoaches/AddTime";
import UserProfile from "./pages/UserHome/UserProfile"
 // New user profile page
// New user meetings page
import { StrictMode } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import CoachList from "./pages/AddCoaches/CoachList";

function App() {
  const CLIENT_ID = "884933282507-roa52cm6ntvi89uu89mebusvv13hppgu0l5p.apps.googleusercontent.com";
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // 'admin' or 'user'
  const [userData, setUserData] = useState(null); // Store user data

  const handleLogin = (role = 'admin', data = null) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setUserData(data);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUserData(null);
  };

  const ProtectedRoute = ({ children, adminOnly = false }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    
    if (adminOnly && userRole !== 'admin') {
      return <Navigate to="/user-dashboard" replace />;
    }
    
    return children;
  };

  const UserRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    
    if (userRole === 'admin') {
      return <Navigate to="/" replace />;
    }
    
    return children;
  };

  return (
    <StrictMode>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route
              path="/login"
              element={<LoginPage onLogin={handleLogin} />}
            />
            <Route 
              path="/SignupPage"  
              element={<SignupPage onLogin={handleLogin} />} 
            />

            {/* Admin routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute adminOnly={true}>
                  <Home onLogout={handleLogout} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-startup"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AddStartup />
                </ProtectedRoute>
              }
            />
            <Route
              path="/view-startups"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AddStartupView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/view-coaches"
              element={
                <ProtectedRoute adminOnly={true}>
                  <CoachList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-coaches"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AddCoaches />
                </ProtectedRoute>
              }
            />
            <Route
              path="/coach-availability"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AddTime />
                </ProtectedRoute>
              }
            />
            <Route
              path="/start-matching"
              element={
                <ProtectedRoute adminOnly={true}>
                  <StartMatching />
                </ProtectedRoute>
              }
            />

            {/* User routes */}
            <Route
              path="/user-dashboard"
              element={
                <UserRoute>
                  <UserHome userData={userData} onLogout={handleLogout} />
                </UserRoute>
              }
            />
            <Route
              path="/user-profile"
              element={
                <UserRoute>
                  <UserProfile userData={userData} />
                </UserRoute>
              }
            />
        

            {/* Redirect based on role */}
            <Route
              path="*"
              element={
                isAuthenticated ? (
                  userRole === 'admin' ? 
                    <Navigate to="/" replace /> : 
                    <Navigate to="/user-dashboard" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </Router>
      </GoogleOAuthProvider>
    </StrictMode>
  );
}

export default App;