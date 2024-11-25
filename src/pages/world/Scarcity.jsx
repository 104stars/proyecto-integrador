import './Scarcity.css'
import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Loader, Environment } from "@react-three/drei";
import ProblemScarcity from "../../blender/ProblemScarcity";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

const Scarcity = () => {
  const lightRef = useRef();
  const cameraRef = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [positionIndex, setPositionIndex] = useState(0);

 
  
  useEffect(() => {
    window.cameraRef = cameraRef; // Makes cameraRef globally accessible
  }, []);


  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <div className="container">
      {/* 3D Scene */}
      <Canvas
        className="canvas"
        dpr={[1, 1.5]}
        shadows
        camera={{ position: [5, 20, 500], fov: 45 }}
        onCreated={({ camera }) => (cameraRef.current = camera)}
      >
        <Suspense fallback={null}>
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
          <OrbitControls minDistance={1} maxDistance={120} enablePan={true} />
        </Suspense>
        <Environment files="/img/bluesky.hdr" background />
      </Canvas>
      <Loader />
  
      {/* Bottom Text Container */}
      <div className="text-container">
        <h1 className="text-title">Water Scarcity</h1>
        <p className="text-description">
          Water scarcity occurs when water demand surpasses supply or quality is
          inadequate for human, environmental, or agricultural needs. It stems
          from climate change, overuse, pollution, and poor management, impacting
          billions globally with risks to food security and health.
        </p>
        <button className="text-button" onClick={() => navigate("/problems")}>
          Back
        </button>
      </div>
    </div>
  );
};

export default Scarcity;
