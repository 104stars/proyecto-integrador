import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Loader } from "@react-three/drei";
import ProblemScarcity from "../../blender/ProblemScarcity";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

const Scarcity = () => {
  const lightRef = useRef();
  const cameraRef = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [positionIndex, setPositionIndex] = useState(0);

  // Array of camera positions to cycle through
  const cameraPositions = [
    { x: -84, y: 50, z: -19 },
    { x: -46, y: 60, z: 93 },
    { x: -64, y: 50, z: 58 },
    { x: -21.372, y: 20.438, z: -14.206 }
  ];

  useEffect(() => {
    window.cameraRef = cameraRef; // Makes cameraRef globally accessible
  }, []);

  setInterval(() => console.log(window.cameraRef.current.position), 1000000); // Logs every second

  useEffect(() => {
    // Function to cycle through the camera positions
    const cycleCameraPosition = () => {
      const nextIndex = (positionIndex + 1) % cameraPositions.length;
      const { x, y, z } = cameraPositions[nextIndex];

      // Animate camera to the next position with GSAP
      gsap.to(cameraRef.current.position, {
        x,
        y,
        z,
        duration: 2,
        ease: "power4.out",
      });

      setPositionIndex(nextIndex);
    };

    // Adding button to the UI
    const cycleButton = document.createElement("button");
    cycleButton.innerText = "Cycle Camera Position";
    cycleButton.style.position = "absolute";
    cycleButton.style.top = "20px";
    cycleButton.style.right = "20px";
    cycleButton.style.padding = "10px 20px";
    cycleButton.style.backgroundColor = "#00cc99";
    cycleButton.style.color = "#fff";
    cycleButton.style.border = "none";
    cycleButton.style.borderRadius = "5px";
    cycleButton.style.cursor = "pointer";
    cycleButton.onclick = cycleCameraPosition;

    document.body.appendChild(cycleButton);

    // Clean up
    return () => {
      document.body.removeChild(cycleButton);
    };
  }, [positionIndex]);

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
      {/* Information text */}
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
          Water Scarcity
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
          Water scarcity occurs when water demand surpasses supply or quality is
          inadequate for human, environmental, or agricultural needs. It stems
          from climate change, overuse, pollution, and poor management,
          impacting billions globally with risks to food security and health.
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

      {/* 3D scene on the right side */}
      <div style={{ flex: "1", position: "relative" }}>
        <Canvas
          dpr={[1, 1.5]}
          shadows
          camera={{ position: [5, 20, 500], fov: 60 }}
          onCreated={({ camera }) => (cameraRef.current = camera)}
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
            <ProblemScarcity scale={[1, 1, 1]} position={[0, -1, 0]} castShadow />
            <OrbitControls            
              minDistance={1}
              maxDistance={120}
              enablePan={true}
            />
          </Suspense>
        </Canvas>
        <Loader />
      </div>
    </div>
  );
};

export default Scarcity;
