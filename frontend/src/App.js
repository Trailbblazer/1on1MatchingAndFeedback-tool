import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import AddStartup from "./pages/AddStartup/AddStartup";
import AddStartupView from "./pages/AddStartupView/AddStartupView";
import AddCoaches from "./pages/AddCoaches/AddCoaches";
import AddCoachesView from "./pages/AddCoachesView/AddCoachesView";
import StartMatching from "./pages/StartMatching/Start Matching";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-startup" element={<AddStartup />} />
        <Route path="/view-startups" element={<AddStartupView />} />
        <Route path="/add-coaches" element={<AddCoaches />} />
        <Route path="/view-coaches" element={<AddCoachesView />} />
        <Route path="/start-matching" element={<StartMatching />} />
      </Routes>
    </Router>
  );
}

export default App;
