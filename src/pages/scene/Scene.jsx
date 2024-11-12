import "./scene.css";
import React, { useRef, useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PositionalAudio,
  Loader,
  Environment,
} from "@react-three/drei";
import UnderwaterScene from "../../blender/UnderwaterScene";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase.config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";
import logo from "/img/logo.jpg";

const Scene = ({ playAudio }) => {
  const audioRef = useRef();
  const cameraRef = useRef();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(playAudio);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying]);

  const handleAudioToggle = () => {
    setIsPlaying(!isPlaying);
  };

  const startIntro = () => {
    setShowIntro(false);
  };

  const handleLogout = () => {
    auth.signOut().then(() => navigate("/"));
  };

  const logCameraPosition = () => {
    if (cameraRef.current) {
      const { x, y, z } = cameraRef.current.position;
      console.log("Camera Position:", x, y, z);
    }
  };

  return (
    <div className="scene-container">
      {/* Navbar */}
      <nav className="navbar">
        <div>
          <img src={logo} alt="Logo" className="navbar-logo" />
        </div>
        <div className="nav-links">
          <button
            onClick={() => navigate("/information")}
            className="nav-button"
          >
            INFORMATE
          </button>
          <button onClick={() => navigate("/quiz")} className="nav-button">
            QUIZ
          </button>
          <button onClick={handleLogout} className="logout-button">
            SALIR
          </button>
        </div>
      </nav>

      {/* Volume Control */}
      <FontAwesomeIcon
        icon={isPlaying ? faVolumeUp : faVolumeMute}
        onClick={handleAudioToggle}
        className="volume-icon"
      />

      {/* Intro Screen */}
      {showIntro && (
        <div className="intro-container">
          <h1 className="intro-title">BIENVENIDO</h1>
          <p className="intro-text">
            Explora cómo podemos cuidar y preservar juntos el agua para un
            futuro sostenible.
          </p>
          <button onClick={startIntro} className="start-button">
            Comenzar
          </button>
        </div>
      )}

      {/* Canvas */}
      <Canvas
        dpr={[1, 1.5]}
        shadows
        camera={{
          position: [11.375716828347702, 2.2, 10.15589038197989],
          fov: 45,
        }}
        onCreated={({ camera }) => (cameraRef.current = camera)}
      >
        <group position={[0, 5, 0]}>
          <PositionalAudio
            ref={audioRef}
            url="/sound/soundwater.mp3"
            loop
            distance={10}
            volume={70}
          />
        </group>
        <Suspense fallback={null}>
          <ambientLight intensity={2} />
          <directionalLight
            position={[5, 10, 5]}
            intensity={1.2}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          <OrbitControls
            minPolarAngle={0}
            maxPolarAngle={Math.PI}
            enablePan={true}
          />
          <Environment files="/img/pizzo-skye.hdr" background />
          <UnderwaterScene />
        </Suspense>
      </Canvas>

      {/* Log Camera Position Button */}
      <button
        onClick={logCameraPosition}
        style={{
          position: "absolute",
          top: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "#4CAF50",
          color: "white",
          fontSize: "16px",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
          zIndex: 1000, // Ensures it appears on top of other elements
        }}
      >
        Log Camera Position
      </button>

      <Loader />
    </div>
  );
};

export default Scene;
