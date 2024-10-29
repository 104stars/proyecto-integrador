import React, { useEffect, useState } from "react";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "../../../firebase.config";
import { useNavigate } from "react-router-dom";
import UserDAO from "../../dao/UserDAO";
import ReCAPTCHA from "react-google-recaptcha";
import "./Login.css"; // Ensure your new CSS file is linked
import "./Login.css?version=2";


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
    <div className="wrapper"> {/* Add this wrapper div */}
        <div className="login-frame">
          <h1>Welcome</h1>
            <h2 className="login-title">Get started</h2>
            <button onClick={handleLogin} className="google-button">
                <img src="/google.svg" alt="Google logo" className="google-logo" />
                Sign in with Google
            </button>
            <div className="captcha-container">
                <ReCAPTCHA
                    sitekey="6LdwKW8qAAAAAO6z-i-fx86kikV_s0GHKHHF0bfh"
                    onChange={onChange}
                />
            </div>
        </div>
    </div>
);}

export default Login;
