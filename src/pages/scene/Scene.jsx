import React, { useRef, useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PositionalAudio, Loader } from "@react-three/drei";
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
        backgroundImage: "url('/img/fondo.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
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
        Sign-off
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
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / -2}
            minDistance={100}
            maxDistance={100}
            enableRotate={true}
            enablePan={false}
          />
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
