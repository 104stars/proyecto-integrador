import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Loader, Text3D, Environment } from "@react-three/drei";
import { Physics, useBox } from "@react-three/cannon";
import { EffectComposer, ChromaticAberration } from "@react-three/postprocessing";
import ProblemPollution from "../../blender/ProblemPollution";
import { useNavigate } from "react-router-dom";

const Pollution = () => {
  const lightRef = useRef();
  const navigate = useNavigate();
  const [ambientIntensity, setAmbientIntensity] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setAmbientIntensity((prevIntensity) => (prevIntensity === 2 ? 3 : 2));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#ffffff",
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: "#333",
          color: "#fff",
          padding: "2rem 4rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          fontSize: "1.5rem",
        }}
      >
        <h2 style={{ margin: 0 }}></h2>
        <nav>
          <a href="information" style={{ margin: "0 1rem", color: "#fff" }}>
            INFORMACION
          </a>
          <a href="scarcity" style={{ margin: "0 1rem", color: "#fff" }}>
            ESCASEZ
          </a>
          <a href="acidification" style={{ margin: "0 1rem", color: "#fff" }}>
            ACIDIFICACION
          </a>
        </nav>
      </header>

      {/* Contenedor de Cajas de Texto */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "90%",
          gap: "2rem",
          marginBottom: "2rem",
        }}
      >
        {/* Caja 1 */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#0277bd",
            padding: "2rem",
            borderRadius: "1rem",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: "2rem", marginBottom: "1rem", color: "white" }}>
            ¿Qué es la contaminación?
          </h2>
          <p style={{ fontSize: "1rem", lineHeight: "1.5", color: "white" }}>
            La contaminación del agua ocurre cuando sustancias como plásticos,
            químicos y desechos afectan negativamente a los cuerpos de agua.
          </p>
        </div>

        {/* Caja 2 */}
        <div
          style={{
            flex: 1,
            backgroundColor: "skyblue",
            padding: "2rem",
            borderRadius: "1rem",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: "2rem", marginBottom: "1rem", color: "white" }}>
            Consecuencias
          </h2>
          <p style={{ fontSize: "1rem", lineHeight: "1.5", color: "white" }}>
            La contaminación afecta la biodiversidad, destruye ecosistemas y
            pone en riesgo la salud humana al contaminar nuestras fuentes de
            agua.
          </p>
        </div>

        {/* Caja 3 */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#00796b",
            padding: "2rem",
            borderRadius: "1rem",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: "2rem", marginBottom: "1rem", color: "white" }}>
            Soluciones
          </h2>
          <p style={{ fontSize: "1rem", lineHeight: "1.5", color: "white" }}>
            Reducir el uso de plásticos, evitar tirar químicos al agua y
            participar en programas de limpieza son acciones importantes.
          </p>
        </div>
      </div>

      {/* Canvas 3D */}
      <div
        style={{
          width: "80%",
          height: "50vh",
          borderRadius: "1rem",
          overflow: "hidden",
          boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Canvas
          dpr={[1, 1.5]}
          shadows
          camera={{ position: [5, 20, 500], fov: 90 }}
        >
          <Physics gravity={[0, 0, 0]}>
            <Suspense fallback={null}>
              <ambientLight intensity={ambientIntensity} />
              <directionalLight
                ref={lightRef}
                intensity={1.2}
                castShadow
                position={[5, 20, 80]}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
              />
              <PhysicalModel />
              <OrbitControls minDistance={1} maxDistance={120} enablePan={true} />
              <Text3D
                font="/fonts/blue-ocean.json"
                size={40}
                height={2}
                position={[-170, -30, 0]}
                bevelEnabled
                bevelSize={0}
              >
                "Cuidemos el agua"
                <meshStandardMaterial color="grey" />
              </Text3D>
              <Environment files="/img/playa.hdr" background />
            </Suspense>

            {/* Postprocessing Effects */}
            <EffectComposer>
              <ChromaticAberration offset={[0.001, 0.001]} />
            </EffectComposer>
          </Physics>
        </Canvas>
        <Loader />
      </div>
    </div>
  );
};

const PhysicalModel = () => {
  const [ref, api] = useBox(() => ({
    mass: 1,
    position: [0, 0, 0],
    velocity: [5, 0, 0],
    args: [1, 1, 1],
  }));

  useEffect(() => {
    const unsubscribePosition = api.position.subscribe(([x]) => {
      if (x > 10 || x < -10) {
        api.velocity.set(-Math.sign(x) * 5, 0, 0);
      }
    });

    return () => unsubscribePosition();
  }, [api]);

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <ProblemPollution scale={[1, 1, 1]} />
    </mesh>
  );
};

export default Pollution;

