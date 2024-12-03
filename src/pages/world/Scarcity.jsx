import "./Scarcity.css";
import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Loader, Environment } from "@react-three/drei";
import { Physics, usePlane } from "@react-three/cannon"; // Import usePlane
import ProblemScarcity from "../../blender/ProblemScarcity";
import { useNavigate } from "react-router-dom";
import { EffectComposer, Vignette } from "@react-three/postprocessing";

// Plane Component
const GroundPlane = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0], // Rotate to make it horizontal
    position: [0, -5, 0], // Position it slightly below the model
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[100, 100]} /> {/* Large plane */}
      <meshStandardMaterial color="lightgray" visible={false} />{" "}
      {/* Invisible plane */}
    </mesh>
  );
};

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
      <header
        style={{
          backgroundColor: "#333",
          color: "#fff",
          padding: "10px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ margin: 0 }}></h2>
        <nav>
          <a href="information" style={{ margin: "0 15px", color: "#fff" }}>
            INFORMATE
          </a>
          <a href="acidification" style={{ margin: "0 15px", color: "#fff" }}>
            ACIDIFICACION
          </a>
          <a href="pollution" style={{ margin: "0 15px", color: "#fff" }}>
            CONTAMINACION
          </a>
        </nav>
      </header>

      <Canvas
        className="canvas"
        dpr={[1, 1.5]}
        shadows
        camera={{ position: [5, 20, 80], fov: 45 }}
        onCreated={({ camera }) => (cameraRef.current = camera)}
      >
        <Suspense fallback={null}>
          <Physics gravity={[0, -9.8, 0]}>
            {" "}
            {/* Wrap with Physics */}
            <ambientLight intensity={0.5} />
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
            <GroundPlane /> {/* Add ground plane */}
            <ProblemScarcity scale={[1, 1, 1]} position={[0, 0, 0]} />
          </Physics>
          <OrbitControls minDistance={1} maxDistance={120} enablePan={true} />
          <EffectComposer>
            <Vignette eskil={false} offset={0.1} darkness={0.7} />
          </EffectComposer>
        </Suspense>
        <Environment files="/img/bluesky.hdr" background />
      </Canvas>
      <Loader />

      <div className="text-container">
        <div className="text-section">
          <h1 className="text-title">Escasez de agua</h1>
          <p className="text-description">
            La escasez de agua se produce cuando la demanda de agua supera la
            oferta o la calidad es inadecuada para las necesidades humanas,
            medioambientales o agrícolas. Es consecuencia del cambio climático,
            el uso excesivo, la contaminación y la mala gestión, y afecta a
            miles de millones de personas en todo el mundo, poniendo en peligro
            la seguridad alimentaria y la salud.
          </p>
        </div>
        <div className="text-section">
          <h1 className="text-title">Causas</h1>
          <p className="text-description">
            La escasez de agua se debe a factores como el cambio climático, la
            deforestación, el crecimiento poblacional, la contaminación de
            fuentes hídricas y la mala gestión de recursos. Estas causas reducen
            la disponibilidad de agua potable, afectando a ecosistemas y
            comunidades.
          </p>
        </div>
        <div className="text-section">
          <h1 className="text-title">Impacto</h1>
          <p className="text-description">
            Fomentar el uso eficiente del agua, proteger y reforestar cuencas
            hidrográficas, implementar tecnologías de reciclaje y
            desalinización, reducir la contaminación y promover la educación
            ambiental son medidas clave para garantizar un acceso sostenible al
            recurso hídrico.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Scarcity;
