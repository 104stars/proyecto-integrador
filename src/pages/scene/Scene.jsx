import "./scene.css";
import React, { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { PositionalAudio, Loader, Environment, OrbitControls, TrackballControls } from "@react-three/drei";
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

  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying]);

  const handleAudioToggle = () => {
    setIsPlaying(!isPlaying);
  };

  const handleLogout = () => {
    auth.signOut().then(() => navigate("/"));
  };

  const logCameraPosition = () => {
    if (cameraRef.current) {
      const { x, y, z } = cameraRef.current.position;
      const { x: rotX, y: rotY, z: rotZ } = cameraRef.current.rotation;
      
      console.log("Camera Position:", x, y, z);
      console.log("Camera Rotation (rad):", rotX, rotY, rotZ);
    }
  };
  const handleStart = () => {
    if (cameraRef.current) {
      const targetPosition = {  x: 3.5056, y: -0.2875, z: 4.0448 };
      const targetRotation = { x: -1.578, y: 1.3087, z: 1.5785 };

      // Animate camera position and rotation with GSAP
      gsap.to(cameraRef.current.position, {
        x: targetPosition.x,
        y: targetPosition.y,
        z: targetPosition.z,
        duration: 3,
        ease: "power2.inOut"
      });

      gsap.to(cameraRef.current.rotation, {
        x: targetRotation.x,
        y: targetRotation.y,
        z: targetRotation.z,
        duration: 3,
        ease: "power2.inOut"
      });
    }
  };
  
  const CustomCamera = () => {
    const { camera } = useThree();
    cameraRef.current = camera; // Set cameraRef to the Three.js camera instance
    return null; // No need to render anything
  };

  return (
    <div className="scene-container">
      <nav className="navbar">
        <div>
          <img src={logo} alt="Logo" className="navbar-logo" />
        </div>
        <div className="nav-links">
          <button onClick={() => navigate("/information")} className="nav-button">
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

      <FontAwesomeIcon
        icon={isPlaying ? faVolumeUp : faVolumeMute}
        onClick={handleAudioToggle}
        className="volume-icon"
      />

      <div className="intro-container">
        <h1 className="intro-title">BIENVENIDO</h1>
        <p className="intro-text">
          Explora cómo podemos cuidar y preservar juntos el agua para un futuro sostenible.
        </p>
        <button className="start-button" onClick={handleStart}>
          Comenzar
        </button>
      </div>

      <Canvas
        dpr={[1, 1.5]}
        shadows
        camera={{
          position: [10.2995, 6.1062, 10.8091],
          rotation:[-0.5067, 0.78272, 0.3730],
          fov: 45,
        }}
      >
        <CustomCamera />
        
        <group position={[0, 5, 0]}>
          <PositionalAudio ref={audioRef} url="/sound/soundwater.mp3" loop distance={10} volume={70} />
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
          <Environment files="/img/pizzo-skye.hdr" background />
          <UnderwaterScene />
        </Suspense>
      </Canvas>

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
          zIndex: 1000,
        }}
      >
        Log Camera Position
      </button>

      <Loader />
    </div>
  );
};

export default Scene;
