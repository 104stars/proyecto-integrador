import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import App from "./App.jsx";
import "./index.css";
import Login from "./pages/login/Login.jsx";
//import Hola from "./pages/welcome/Hola.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },

  // path to the 3d welcome page
  /*   {
    path: "/Hola",
    element: <Hola />,
  }, */
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
