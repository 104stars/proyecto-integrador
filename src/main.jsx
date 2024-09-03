import { StrictMode } from 'react'; // Import StrictMode from React to enable additional checks and warnings for development
import { createRoot } from 'react-dom/client'; // Import createRoot from React DOM to render the app into the DOM
import App from './App.jsx'; // Import the main App component
import './index.css'; // Import global CSS styles
import { Scene } from 'three'; // Import Scene from the Three.js library (note: seems unused in this code)

// Create a root element and render the App component within StrictMode
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App /> {/* Render the main App component inside StrictMode */}
  </StrictMode>,
);

