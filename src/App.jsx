import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Dashboard from './pages/scene/Scene';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/scene" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
