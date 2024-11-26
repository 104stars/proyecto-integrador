import "./Scarcity.css";
import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Loader, Environment } from "@react-three/drei";
import ProblemScarcity from "../../blender/ProblemScarcity";
import { useNavigate } from "react-router-dom";

const Scarcity = () => {
  const lightRef = useRef();
  const cameraRef = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.cameraRef = cameraRef;
  }, []);

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <div className="container">
      <Canvas
        className="canvas"
        dpr={[1, 1.5]}
        shadows
        camera={{ position: [5, 20, 80], fov: 45 }}
        onCreated={({ camera }) => (cameraRef.current = camera)}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0} />
          <directionalLight
            ref={lightRef}
            intensity={5}
            castShadow
            position={[5, 20, 10]}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-left={-50}
            shadow-camera-right={50}
            shadow-camera-top={50}
            shadow-camera-bottom={-50}
            shadow-bias={-0.001}
          />
          <ProblemScarcity scale={[1, 1, 1]} position={[0, -1, 0]} />
          <OrbitControls minDistance={1} maxDistance={120} enablePan={true} />
        </Suspense>
        <Environment files="/img/bluesky.hdr" background />
      </Canvas>
      <Loader />

      <div className="text-container">
        <h1 className="text-title">Escasez de agua</h1>
        <p className="text-description">
          La escasez de agua se produce cuando la demanda de agua supera la
          oferta o la calidad es inadecuada para las necesidades humanas,
          medioambientales o agrícolas. Es consecuencia del cambio climático, el
          uso excesivo, la contaminación y la mala gestión, y afecta a miles de
          millones de personas en todo el mundo, poniendo en peligro la
          seguridad alimentaria y la salud.
        </p>
        <button className="text-button" onClick={() => navigate("/problems")}>
          Back
        </button>
      </div>
    </div>
  );
};

export default Scarcity;
