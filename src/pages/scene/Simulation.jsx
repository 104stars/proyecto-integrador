import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Center, Text3D } from "@react-three/drei";
import ProblemScene from "../../blender/ProblemScene";
import { useNavigate } from "react-router-dom";

const Simulation = () => {
  const lightRef = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [ambientIntensity, setAmbientIntensity] = useState(2);

  // Efecto de oscilación de intensidad de luz con un intervalo más largo (cada 3 segundos)
  useEffect(() => {
    const interval = setInterval(() => {
      setAmbientIntensity((prevIntensity) => (prevIntensity === 2 ? 3 : 2));
    }, 3000); // Cambia cada 3 segundos en lugar de 1 segundo

    return () => clearInterval(interval);
  }, []);

  // Posiciona la luz direccional solo una vez
  useEffect(() => {
    if (lightRef.current) {
      lightRef.current.position.set(5, 10, 5);
    }
  }, []);

  // Configura el evento wheel como pasivo
  useEffect(() => {
    const handleWheel = (event) => {
      // Agrega lógica aquí si es necesario
    };
    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const handleLoad = () => {
    setLoading(false);
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

      <button
        onClick={() => navigate("/scene")}
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
        Back
      </button>

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
            minDistance={10}
            maxDistance={20}
          />
        </Suspense>
      </Canvas>

      <div
        style={{
          position: "absolute",
          bottom: "300px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {["Scarcity", "Pollution", "Acidification "].map((title, index) => (
          <button
            key={index}
            onClick={() => navigate(`/${title.toLowerCase()}`)}
            style={{
              width: "150px",
              padding: "15px",
              border: "none",
              borderRadius: "5px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
              fontWeight: "bold",
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
            {title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Simulation;
