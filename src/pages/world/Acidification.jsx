import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Loader } from "@react-three/drei";
import ProblemAcidification from "../../blender/ProblemAcidification";
import { useNavigate } from "react-router-dom";

const Acidification = () => {
  const lightRef = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

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

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        backgroundImage: "url('/img/fondo.jpg')",
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
          Water Acidification
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
          Ocean acidification occurs when carbon dioxide (CO2) dissolves in the
          water, lowering its pH. This affects marine ecosystems, weakening
          corals, mollusks and other species that depend on a balanced
          environment. It is one of the consequences of the increase of CO2 in
          the atmosphere, caused mainly by human activities such as the burning
          of fossil fuels.
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

      {/* Canvas para el escenario 3D en el lado derecho */}
      <div style={{ flex: "1", position: "relative" }}>
        <Canvas
          dpr={[1, 1.5]}
          shadows
          camera={{ position: [5, 20, 500], fov: 90 }}
        >
          <Suspense fallback={null} onLoaded={handleLoad}>
            <ambientLight intensity={2} />
            <directionalLight
              ref={lightRef}
              intensity={1}
              castShadow
              position={[5, 20, 80]}
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
            <ProblemAcidification
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

export default Acidification;
