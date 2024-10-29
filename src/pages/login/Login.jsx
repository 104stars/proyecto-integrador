import React, { useEffect, useState } from "react";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "../../../firebase.config";
import { useNavigate } from "react-router-dom";
import UserDAO from "../../dao/UserDAO";
import "./Login.css";
import ReCAPTCHA from "react-google-recaptcha";

function Login() {
  const navigate = useNavigate();
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/scene");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async () => {
    if (!isCaptchaVerified) {
      alert("Please complete the CAPTCHA");
      return;
    }

    try {
      const result = await signInWithPopup(auth, provider);
      const user = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        createdAt: new Date(),
      };

      await UserDAO.createUser(user);

      navigate("/scene");
    } catch (error) {
      console.error("Login Failed:", error);
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
          sitekey="6LdwKW8qAAAAAO6z-i-fx86kikV_s0GHKHHF0bfh"
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default Login;
