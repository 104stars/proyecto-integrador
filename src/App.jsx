import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Dashboard from "./pages/scene/Scene";
import "./App.css";
import Simulation from "./pages/scene/Simulation";
import Information from "./pages/scene/Information";
import Acidification from "./pages/world/Acidification";
import Pollution from "./pages/world/Pollution";
import Scarcity from "./pages/world/Scarcity";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/scene" element={<Dashboard />} />
        <Route path="/problems" element={<Simulation />} />
        <Route path="/information" element={<Information />} />
        <Route path="/acidification" element={<Acidification />} />
        <Route path="/pollution" element={<Pollution />} />
        <Route path="/scarcity" element={<Scarcity />} />
      </Routes>
    </Router>
  );
}

export default App;
