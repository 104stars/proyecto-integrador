import React, { useEffect, useState } from "react";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "../../../firebase.config";
import { useNavigate } from "react-router-dom";
import UserDAO from "../../dao/UserDAO";
import "./Login.css";
import ReCAPTCHA from "react-google-recaptcha";

/**
 * Login Component
 *
 * This component handles user authentication using Google Sign-In.
 * It also manages redirection based on the user's authentication state.
 */
function Login() {
  const navigate = useNavigate();
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  useEffect(() => {
    // Set up an observer for changes in the user's authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If a user is already logged in, redirect them to the scene page
        navigate("/scene");
      }
    });

    // Clean up the observer when the component unmounts
    return () => unsubscribe();
  }, [navigate]);

  /**
   * Handles the Google Sign-In process
   * This function is triggered when the user clicks the login button
   */
  const handleLogin = async () => {
    if (!isCaptchaVerified) {
      alert("Please complete the CAPTCHA");
      return;
    }

    try {
      // Attempt to sign in with Google
      const result = await signInWithPopup(auth, provider);

      // Prepare user data for storage
      const user = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        createdAt: new Date(),
      };

      // Store the user data in Firestore using the UserDAO
      await UserDAO.createUser(user);

      // Redirect the user to the scene page after successful login
      navigate("/scene");
    } catch (error) {
      console.error("Login Failed:", error);
      // Note: Consider adding user-friendly error handling here
    }
  };

  const onChange = (value) => {
    setIsCaptchaVerified(!!value);
  };
  return (
    <div className="login-container">
      <h1>Welcome</h1>
      <h2>Get started here</h2>

      <button onClick={handleLogin} className="google-button">
        <img src="/google.svg" alt="" className="google-logo" />
        Login with Google
      </button>
      <div style={{ marginTop: "20px" }}>
        <ReCAPTCHA
          sitekey="6LfuJW8qAAAAADPUyKVhafuj4e1KymtQlu1iqUM4"
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default Login;
