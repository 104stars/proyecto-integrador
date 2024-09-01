import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Dashboard from './pages/scene/Scene';

// Main App component that sets up routing for the application
function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the root path, which renders the Login component */}
        <Route path="/" element={<Login />} />
        
        {/* Route for the "/scene" path, which renders the Dashboard component */}
        <Route path="/scene" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;




