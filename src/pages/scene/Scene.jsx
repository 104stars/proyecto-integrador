/* import React, { useRef, useEffect, useState, Suspense } from "react";
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

const Scene = ({ playAudio }) => {
  const audioRef = useRef();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(playAudio);
  useEffect(() => {
    let lastFrame = performance.now();

    const animate = () => {
      const now = performance.now();
      if (now - lastFrame >= 16) {
        lastFrame = now;
      }
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  useEffect(() => {
    const handleWheel = (event) => {};

    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying]);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => navigate("/"))
      .catch((error) => console.error("Error al cerrar sesión:", error));
  };
  const handleAudioToggle = () => {
    setIsPlaying(!isPlaying);
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        position: "relative",
      }}
    >
      <button
        onClick={handleSignOut}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          backgroundColor: "#000",
          color: "#fff",
          cursor: "pointer",
          fontWeight: "bold",
          zIndex: 20,
        }}
      >
        Salir
      </button>
      <FontAwesomeIcon
        icon={isPlaying ? faVolumeUp : faVolumeMute}
        onClick={handleAudioToggle}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          cursor: "pointer",
          fontSize: "24px",
          color: "#fff",
          zIndex: 20,
        }}
      />

      <Canvas
        dpr={[1, 1.5]}
        shadows
        camera={{ position: [5, 80, 80], fov: 90 }}
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
            minDistance={5}
            maxDistance={1200}
          />
          <Environment files="/img/pizzo-skye.hdr" background />
          <UnderwaterScene />
        </Suspense>
      </Canvas>
      <Loader />

      <div
        style={{
          position: "absolute",
          top: "10%",
          width: "100%",
          textAlign: "center",
        }}
      >
        <h1
          style={{ fontSize: "3em", fontWeight: "bold", marginBottom: "10px" }}
        >
          Welcome!
        </h1>
        <p
          style={{
            fontSize: "1.2em",
            lineHeight: "1.4",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          Explore how together we can care for and preserve water for a
          sustainable future.
        </p>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          justifyContent: "space-around",
          width: "80%",
        }}
      >
        {[
          {
            title: "Information",
            description:
              "Water is essential for life, but its responsible use is key to ensuring its availability in the future. Water sustainability is about conserving, reusing and managing this vital resource efficiently, ensuring that both people and the planet can thrive. Find out how small actions can make a big difference!",
            path: "/information",
          },
          {
            title: "Problems",
            description:
              "Explore the Simulation Zone and discover how different actions impact water globally. Immerse yourself in interactive scenarios and learn how we can solve problems such as scarcity and pollution - click and start your journey to a more sustainable future!",
            path: "/Problems",
          },
          {
            title: "Quiz",
            description:
              "Test your knowledge in the Quiz Zone. Answer questions about water conservation, pollution and sustainable solutions - challenge yourself and find out how much you know about water care! Click to get started!",
            path: "/quiz",
          },
        ].map((feature, index) => (
          <div
            key={index}
            style={{
              width: "250px",
              padding: "20px",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              color: "#ffffff",
              borderRadius: "10px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
            }}
          >
            <h3 style={{ fontSize: "1.5em", marginBottom: "15px" }}>
              {feature.title}
            </h3>
            <p
              style={{
                fontSize: "1em",
                lineHeight: "1.5",
                marginBottom: "20px",
              }}
            >
              {feature.description}
            </p>
            <button
              onClick={() => navigateTo(feature.path)}
              style={{
                padding: "10px 20px",
                backgroundColor: "#00cc99",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "1em",
              }}
            >
              Enter
            </button>
          </div>
        ))}
      </div>

      <Loader />
    </div>
  );
};

export default Scene;
 */

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
  const [currentPositionIndex, setCurrentPositionIndex] = useState(0);

  const cameraPositions = [
    { x: -84, y: 50, z: -19 },
    { x: -46, y: 60, z: 93 },
    { x: -64, y: 50, z: 58 },
    { x: -21.372, y: 20.438, z: -14.206 },
  ];

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

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#000",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Navbar horizontal */}
      <nav
        style={{
          position: "absolute",
          top: 0,
          width: "100%",
          backgroundColor: "#333",
          color: "#fff",
          padding: "5px 0px ",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 1000,
        }}
      >
        {/* Logo */}
        <div>
          <img src={logo} alt="Logo" style={{ height: "40px" }} />
        </div>

        {/* Navigation Links */}
        <div style={{ display: "flex", gap: "15px" }}>
          {" "}
          <button
            onClick={() => navigate("/information")}
            style={{
              background: "none",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              fontSize: "1em",
            }}
          >
            INFORMATE
          </button>
          <button
            onClick={() => navigate("/quiz")}
            style={{
              background: "none",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              fontSize: "1em",
            }}
          >
            QUIZ
          </button>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#29c667",
              color: "#000",
              padding: "10px 15px",
              borderRadius: "5px",
              fontWeight: "bold",
              cursor: "pointer",
              border: "none",
              fontSize: "1em",
            }}
          >
            SALIR
          </button>
        </div>
      </nav>

      {/* Volume Icon */}
      <FontAwesomeIcon
        icon={isPlaying ? faVolumeUp : faVolumeMute}
        onClick={handleAudioToggle}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          cursor: "pointer",
          fontSize: "24px",
          color: "#fff",
          zIndex: 20,
        }}
      />

      {/* Texto de bienvenida en el lado izquierdo */}
      {showIntro && (
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "50px",
            maxWidth: "500px",
            zIndex: 20,
            color: "#fff",
          }}
        >
          <h1
            style={{
              fontSize: "4em",
              fontWeight: "bold",
              color: "#ffffff",
              marginBottom: "20px",
              lineHeight: "1.2",
            }}
          >
            BIENVENIDO
          </h1>
          <p
            style={{
              fontSize: "1.2em",
              color: "#cccccc",
              lineHeight: "1.6",
              marginBottom: "30px",
            }}
          >
            Explora cómo podemos cuidar y preservar juntos el agua para un
            futuro sostenible.
          </p>
          <button
            onClick={startIntro}
            style={{
              backgroundColor: "#29c667",
              color: "#000",
              padding: "12px 24px",
              borderRadius: "5px",
              fontWeight: "bold",
              cursor: "pointer",
              border: "none",
              fontSize: "1em",
            }}
          >
            Comenzar
          </button>
        </div>
      )}

      {/* Canvas Section */}
      <Canvas
        dpr={[1, 1.5]}
        shadows
        camera={{ position: [40, -100, 500], fov: 90 }}
        onCreated={({ camera }) => (cameraRef.current = camera)}
        style={{ height: "100vh", width: "100%" }}
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

      <Loader />
    </div>
  );
};

export default Scene;
