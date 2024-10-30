import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ProblemScene from "../../blender/ProblemScene";
import { useNavigate } from "react-router-dom";

const Bubble = ({ left, size, duration }) => (
  <div
    style={{
      position: "absolute",
      bottom: "-50px",
      left: `${left}%`,
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      borderRadius: "50%",
      animation: `floatUp ${duration}s ease-in infinite`,
    }}
  />
);

const Simulation = () => {
  const lightRef = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [ambientIntensity, setAmbientIntensity] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setAmbientIntensity((prevIntensity) => (prevIntensity === 2 ? 3 : 2));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (lightRef.current) {
      lightRef.current.position.set(5, 10, 5);
    }
  }, []);

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        position: "relative",
        backgroundImage: "url('/img/fondo.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div style={{ flex: 1, position: "relative" }}>
        <Canvas shadows camera={{ position: [5, 20, 500], fov: 90 }}>
          <Suspense fallback={null} onLoaded={handleLoad}>
            <ambientLight intensity={ambientIntensity} />
            <directionalLight
              ref={lightRef}
              intensity={1}
              castShadow
              position={[5, 20, 80]}
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
            <ProblemScene scale={[1, 1, 1]} position={[0, -1, 0]} castShadow />
            <OrbitControls
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / -2}
              minDistance={20}
              maxDistance={30}
              enableRotate={true}
              enablePan={false}
            />
          </Suspense>
        </Canvas>
      </div>

      <div
        style={{
          flex: "0.3",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "#fff",
          borderLeft: "2px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
            fontSize: "1.5em",
            fontWeight: "bold",
          }}
        >
          Simulation Options
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            width: "100%",
            textAlign: "center",
          }}
        >
          {["Scarcity", "Pollution", "Acidification"].map((title, index) => (
            <button
              key={index}
              onClick={() => navigate(`/${title.toLowerCase()}`)}
              style={{
                width: "100%",
                padding: "15px",
                border: "none",
                borderRadius: "20px",
                backgroundColor: "rgba(0, 128, 128, 0.7)",
                color: "#fff",
                cursor: "pointer",
                fontWeight: "bold",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                transition: "background-color 0.3s ease, transform 0.2s ease",
                textAlign: "center",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "rgba(0, 128, 128, 0.9)";
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "rgba(0, 128, 128, 0.7)";
                e.target.style.transform = "scale(1)";
              }}
            >
              {title.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {[...Array(30)].map((_, index) => (
        <Bubble
          key={index}
          left={Math.random() * 100}
          size={10 + Math.random() * 30}
          duration={10 + Math.random() * 10}
        />
      ))}

      {loading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "5px",
            width: "100%",
            backgroundColor: "#004080",
            zIndex: 10,
            transition: "width 0.5s ease-out",
          }}
        >
          <div
            style={{
              height: "100%",
              backgroundColor: "#fff",
              width: loading ? "100%" : "0%",
              transition: "width 0.5s ease-out",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Simulation;
