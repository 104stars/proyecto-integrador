import React, { useRef, useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PositionalAudio,
  Center,
  Text3D,
  Loader,
} from "@react-three/drei";
import UnderwaterScene from "../../blender/UnderwaterScene";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase.config";

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
          cursor: "pointer",
          fontWeight: "bold",
          zIndex: 20,
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = "#004080";
          e.target.style.color = "#fff";
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = "#f0f0f0";
          e.target.style.color = "#000";
        }}
      >
        Sign Out
      </button>
      <button
        onClick={handleAudioToggle}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          padding: "10px 20px",

          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold",
          zIndex: 20,
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = "#004080";
          e.target.style.color = "#fff";
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = "#f0f0f0";
          e.target.style.color = "#000";
        }}
      >
        {isPlaying ? "Pause Audio" : "Play Audio"}
      </button>

      <Canvas
        dpr={[1, 1.5]}
        shadows
        camera={{ position: [5, 80, 80], fov: 90 }}
      >
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

          <UnderwaterScene scale={[1, 1, 1]} castShadow receiveShadow />

          <group position={[0, 5, 0]}>
            <PositionalAudio
              ref={audioRef}
              url="/sound/soundwater.mp3"
              loop
              distance={10}
              volume={70}
            />
          </group>

          <Center position={[0, 25, 15]} rotation={[0, 0, 0]}>
            <Text3D
              font="./fonts/blue-ocean.json"
              bevelEnabled
              bevelSize={0.02}
              bevelThickness={0.04}
              height={0.3}
              lineHeight={0.8}
              letterSpacing={0.1}
              size={4}
              castShadow
            >
              {
                "                            WELCOME             \n      \n         Explore how together we can care \n                    for and preserve         \n         water for a sustainable future."
              }
              <meshStandardMaterial color="#FFFFFF" />
            </Text3D>
          </Center>

          <OrbitControls
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / -2}
            minDistance={100}
            maxDistance={100}
          />
        </Suspense>
      </Canvas>

      <Loader />

      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {["Information", "Problems", "Quiz"].map((title, index) => (
          <div
            key={index}
            className="container"
            style={{
              width: "150px",
              padding: "15px",
              textAlign: "center",
              backgroundColor: "#fff",
              borderRadius: "5px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3>{title}</h3>
            <p>
              {title === "Information"
                ? "Water is essential for life."
                : title === "Problems"
                ? "See what pollution, acidification and scarcity look like in the ocean."
                : "Test your knowledge by answering some questions."}
            </p>
            <button onClick={() => navigateTo(`/${title.toLowerCase()}`)}>
              Enter
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scene;
