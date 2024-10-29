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
        onClick={() => navigate("/problems")}
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
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          padding: "20px",
          borderRadius: "10px",
          color: "#fff",
          width: "80%",
          maxWidth: "600px",
          textAlign: "center",
          zIndex: 15,
        }}
      >
        <h1
          style={{ marginBottom: "10px", fontSize: "24px", fontWeight: "bold" }}
        >
          Water Acidification
        </h1>
        <p>
          Ocean acidification occurs when carbon dioxide (CO2) dissolves in the
          water, lowering its pH. This affects marine ecosystems, weakening
          corals, mollusks and other species that depend on a balanced
          environment. It is one of the consequences of the increase of CO2 in
          the atmosphere, caused mainly by human activities such as the burning
          of fossil fuels.
        </p>
      </div>

      <Canvas
        dpr={[1, 1.5]}
        shadows
        camera={{ position: [5, 20, 500], fov: 90 }}
      >
        <Suspense fallback={null} onLoaded={handleLoad}>
          <ambientLight intensity={-2} />
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
          />
        </Suspense>
      </Canvas>
      <Loader />
    </div>
  );
};

export default Acidification;
