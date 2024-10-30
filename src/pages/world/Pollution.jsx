import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Loader } from "@react-three/drei";
import ProblemPollution from "../../blender/ProblemPollution";
import { useNavigate } from "react-router-dom";

const Pollution = () => {
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
        backgroundImage: "url('/img/fondo.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Texto de Información en el lado izquierdo */}
      <div
        style={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "2em",
            fontWeight: "bold",
            marginBottom: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: "50px",
              height: "2px",
              backgroundColor: "#fff",
              marginRight: "10px",
            }}
          ></span>
          Contamination
          <span
            style={{
              display: "inline-block",
              width: "50px",
              height: "2px",
              backgroundColor: "#fff",
              marginLeft: "10px",
            }}
          ></span>
        </h1>
        <p style={{ fontSize: "1em", lineHeight: "1.6", maxWidth: "500px" }}>
          Water pollution occurs when harmful substances, like plastics,
          chemicals, and waste, contaminate water bodies. It harms wildlife,
          damages ecosystems, and poses health risks to humans. Preventing water
          pollution is crucial for protecting the environment and ensuring clean
          water for all.
        </p>
        <button
          onClick={() => navigate("/problems")}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#00cc99",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "1em",
          }}
        >
          Back
        </button>
      </div>

      <div style={{ flex: "1", position: "relative" }}>
        <Canvas
          dpr={[1, 1.5]}
          shadows
          camera={{ position: [5, 20, 500], fov: 90 }}
        >
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
            <ProblemPollution
              scale={[1, 1, 1]}
              position={[0, -1, 0]}
              castShadow
            />
            <OrbitControls
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / -2}
              minDistance={50}
              maxDistance={200}
              enableRotate={true}
              enablePan={false}
            />
          </Suspense>
        </Canvas>
        <Loader />
      </div>
    </div>
  );
};

export default Pollution;
