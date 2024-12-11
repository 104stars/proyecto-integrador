import React, { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Loader, Environment, Text } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import {
  Barrel,
  TrashBag,
  Ground,
  Walls,
  AnimatedModel,
} from "../../blender/ProblemAcidification";
import PostProcessing from "../PostProcessing";

const Acidification = () => {
  const [isPostProcessingEnabled, setIsPostProcessingEnabled] = useState(true);

  const togglePostProcessing = () => {
    setIsPostProcessingEnabled((prev) => !prev);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
      }}
    >
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
          <a href="scarcity" style={{ margin: "0 15px", color: "#fff" }}>
            ESCASEZ
          </a>
          <a href="pollution" style={{ margin: "0 15px", color: "#fff" }}>
            CONTAMINACION
          </a>
        </nav>
      </header>

      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "20px",
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            gap: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "#8c8c8c",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              color: "white",
            }}
          >
            <h3 style={{ margin: "0 0 10px" }}>Acidificación</h3>
            <p>
              La acidificación de los océanos es un fenómeno provocado por la
              absorción de dióxido de carbono de la atmósfera. Esto causa
              problemas severos en los ecosistemas marinos, afectando organismos
              y alterando el equilibrio de los océanos.
            </p>
          </div>

          <div
            style={{
              backgroundColor: "#80c661",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              color: "white",
            }}
          >
            <h3 style={{ margin: "0 0 10px" }}>Sensibilización</h3>
            <p>
              Los océanos son el pulmón del planeta. Ayúdanos a protegerlos:
              reduce tu huella de carbono, fomenta el uso de energía renovable y
              apoya políticas que preserven los ecosistemas marinos.
            </p>
          </div>

          <div
            style={{
              backgroundColor: "#61c6b7",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              color: "white",
            }}
          >
            <h3 style={{ margin: "0 0 10px" }}>Soluciones</h3>
            <p>
              Reducir el uso de combustibles fósiles, proteger los ecosistemas
              marinos y adoptar prácticas sostenibles son medidas clave para
              combatir este problema.
            </p>
          </div>

          {/* Botón para activar/desactivar el postprocesado */}
          <button
            onClick={togglePostProcessing}
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              backgroundColor: "#007BFF",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {isPostProcessingEnabled
              ? "Desactivar Postprocesado"
              : "Activar Postprocesado"}
          </button>
        </div>

        <div
          style={{
            backgroundColor: "#e8f5e9",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <Canvas shadows camera={{ position: [10, 10, 10], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} castShadow />

            <Suspense fallback={null}>
              <Environment files="/img/mud_road_puresky_1k.hdr" background />
              <OrbitControls
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 2}
                minDistance={3}
                maxDistance={200}
                enablePan={false}
              />
              <Physics>
                <Ground />
                <Walls />
                <Barrel />
                <TrashBag />
                <AnimatedModel />

                <Text
                  position={[0, 3, -5]}
                  fontSize={1}
                  color="black"
                  anchorX="center"
                  anchorY="middle"
                >
                  CUIDEMOS LOS OCEANOS
                </Text>
              </Physics>
            </Suspense>

            {isPostProcessingEnabled && <PostProcessing />}
          </Canvas>
          <Loader />
        </div>
      </div>
    </div>
  );
};

export default Acidification;
