// InformationPage.js
import React, { Suspense, useState, useEffect } from "react";
import { OrbitControls, Environment, Html, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useNavigate } from "react-router-dom";
import YouTube from "react-youtube";

// Función para habilitar sombras en todos los objetos de un modelo GLTF
function enableShadow(obj) {
  obj.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
}

// Componente para el bote de basura con texto "Basura"
function TrashBinModel({ position, onClick, isUp }) {
  const { scene } = useGLTF("./model-3d/barrel.glb");
  enableShadow(scene);

  return (
    <>
      <primitive
        object={scene}
        scale={1}
        position={
          isUp ? position : [position[0], position[1] - 0.5, position[2]]
        }
        onClick={onClick}
      />
      <Html position={[-1, 1, 0]} center>
        <div style={{ color: "white", fontWeight: "bold", fontSize: "1.2em" }}>
          CONTAMINACIÓN
        </div>
      </Html>
    </>
  );
}

// Componente para el tronco de árbol con texto "Tronco"
function TreeTrunkModel({ isRotating, onClick }) {
  const { scene } = useGLTF("./model-3d/low_poly_tree_trunk.glb");
  enableShadow(scene);

  useFrame(() => {
    if (isRotating) {
      scene.rotation.y += 0.02;
    }
  });

  return (
    <>
      <primitive
        object={scene}
        scale={1}
        position={[0, 0, 0]}
        onClick={onClick}
      />
      <Html position={[0, 1, 0]} center>
        <div style={{ color: "white", fontWeight: "bold", fontSize: "1.2em" }}>
          ESCASEZ
        </div>
      </Html>
    </>
  );
}

// Componente para el coral con texto "Coral"
function CoralModel({ position, onClick }) {
  const { scene } = useGLTF("./model-3d/mushroom.glb");
  enableShadow(scene);

  return (
    <>
      <primitive
        object={scene}
        scale={0.5}
        position={position}
        onClick={onClick}
      />
      <Html position={[1, 1, 0]} center>
        <div style={{ color: "white", fontWeight: "bold", fontSize: "1.2em" }}>
          ACIDIFICACIÓN
        </div>
      </Html>
    </>
  );
}

const Information = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isTrashUp, setIsTrashUp] = useState(true);
  const [isRotating, setIsRotating] = useState(false);
  const [coralPosition, setCoralPosition] = useState([1, 0, 0]); // Estado para la posición del coral
  const [forceRender, setForceRender] = useState(false); // Nuevo estado

  // Estado para controlar el mensaje de sensibilización y video
  const [activeMessage, setActiveMessage] = useState("");
  const [videoId, setVideoId] = useState(null); // Estado para controlar el ID del video

  const handleBack = () => {
    setForceRender((prev) => !prev); // Alterna el estado
    setLoading(true);
    setTimeout(() => {
      navigate("/scene");
    }, 500);
  };

  // useEffect para manejar los eventos de teclado
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        setIsTrashUp(!isTrashUp); // Alterna entre levantar y bajar el bote de basura
      }
      if (event.key === " ") {
        setIsRotating((prev) => !prev); // Alterna la rotación del tronco
      }

      // Movimiento del coral con las flechas
      setCoralPosition((prevPosition) => {
        const [x, y, z] = prevPosition;
        const step = 0.1; // Tamaño del paso

        switch (event.key) {
          case "ArrowUp":
            return z > -1.4 ? [x, y, z - step] : prevPosition;
          case "ArrowDown":
            return z < 1.4 ? [x, y, z + step] : prevPosition;
          case "ArrowLeft":
            return x > -2.4 ? [x - step, y, z] : prevPosition;
          case "ArrowRight":
            return x < 2.4 ? [x + step, y, z] : prevPosition;
          default:
            return prevPosition;
        }
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isTrashUp, isRotating]);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        position: "relative",
        backgroundColor: "#000",
      }}
    >
      {/* Header */}
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
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
          }}
        >
          <a href="scene" style={{ margin: "0 15px", color: "#fff" }}>
            INICIO
          </a>

          <div style={{ display: "flex", gap: "15px" }}>
            <a href="acidification" style={{ color: "#fff" }}>
              ACIDIFICACIÓN
            </a>
            <a href="scarcity" style={{ color: "#fff" }}>
              ESCASEZ
            </a>
            <a href="pollution" style={{ color: "#fff" }}>
              CONTAMINACION
            </a>
          </div>
        </nav>
      </header>
      <div
        style={{
          position: "absolute",
          top: "180px",
          left: "20px",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          color: "#fff",
          padding: "50px",
          borderRadius: "10px",
          zIndex: 10,
          maxWidth: "300px",
        }}
      >
        <h1 style={{ fontSize: "35px", marginBottom: "10px" }}>
          INSTRUCCIONES
        </h1>
        <p>
          Presiona <b>Enter</b> para mover el bote de basura, <b>Espacio</b>{" "}
          para rotar el tronco, y las <b>flechas</b> para mover el <b>Hongo</b>.
        </p>
        <p>
          También puedes hacer clic en cualquiera de los objetos para ver un
          mensaje y video de sensibilización.
        </p>
      </div>

      <Canvas
        key={forceRender}
        shadows
        camera={{ position: [0, 2, 5], fov: 60 }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[5, 5, 5]}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <Suspense fallback={null}>
          <Environment files="/img/pizzo-skye.hdr" background />
          <OrbitControls minDistance={5} maxDistance={6} enablePan={false} />

          {/* Base con sombra */}
          <mesh receiveShadow position={[0, -0.5, 0]}>
            <boxGeometry args={[5, 0.1, 3]} />
            <meshStandardMaterial color="#333" />
          </mesh>

          <TrashBinModel
            position={[-1, 0, 0]}
            isUp={isTrashUp}
            onClick={() => {
              setActiveMessage(
                "La contaminación del agua amenaza la vida en nuestro planeta. Cada gota cuenta: cuidemos nuestros ríos, lagos y océanos para asegurar un futuro saludable y sostenible para todos."
              );
              setVideoId("zjRwH987294");
            }}
          />

          <TreeTrunkModel
            isRotating={isRotating}
            onClick={() => {
              setActiveMessage(
                "El agua es un recurso limitado y esencial para la vida. Cada vez que ahorramos agua, damos un paso hacia un futuro sostenible. Cuidémosla hoy para no sufrir su ausencia mañana."
              );
              setVideoId("nuzQK9PzUzc");
            }}
          />

          <CoralModel
            position={coralPosition}
            onClick={() => {
              setActiveMessage(
                "La acidificación de los océanos pone en riesgo la vida marina y el equilibrio del ecosistema. Reduzcamos la contaminación y el uso de combustibles fósiles para proteger nuestros océanos y su biodiversidad."
              );
              setVideoId("6BH8AWDLih4");
            }}
          />
        </Suspense>
      </Canvas>

      {activeMessage && (
        <div
          style={{
            position: "absolute",
            top: "180px",
            right: "60px",
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            color: "#fff",
            padding: "20px",
            borderRadius: "10px",
            zIndex: 10,
            maxWidth: "250px",
            fontSize: "16px",
          }}
        >
          <p>{activeMessage}</p>
          <button
            onClick={() => setActiveMessage("")}
            style={{
              marginTop: "10px",
              backgroundColor: "#004080",
              color: "white",
              padding: "5px 10px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Cerrar
          </button>
        </div>
      )}

      {videoId && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 30,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <YouTube
            videoId={videoId}
            opts={{ height: "360", width: "640", playerVars: { autoplay: 1 } }}
          />
          <button
            onClick={() => setVideoId(null)}
            style={{
              marginTop: "10px",
              backgroundColor: "#004080",
              color: "white",
              padding: "5px 10px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Cerrar Video
          </button>
        </div>
      )}

      {loading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 100,
            color: "#fff",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          Loading...
        </div>
      )}
    </div>
  );
};

export default Information;
