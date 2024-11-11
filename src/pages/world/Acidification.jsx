import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Loader, Shadow } from "@react-three/drei";
import { Model } from "../../blender/ProblemAcidification";
import { useNavigate } from "react-router-dom";
import Lights from "../lights/Lights";
import WelcomeText from "./WelcomeText";
import BubbleGroup from "../control/Bubbles";
import { gsap } from "gsap";

const Acidification = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isRotating, setIsRotating] = useState(false);
  const controlsRef = useRef();

  const handleLoad = () => {
    setLoading(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter" && controlsRef.current) {
        setIsRotating((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = isRotating;
      controlsRef.current.autoRotateSpeed = 5;
    }
  }, [isRotating]);

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
          ACIDIFICACIÓN
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
        <p style={{ fontSize: "1.5em", lineHeight: "1.6", maxWidth: "500px" }}>
          La acidificación de los océanos es una amenaza silenciosa que pone en
          riesgo no solo a los ecosistemas marinos, sino también a nuestra
          propia supervivencia. Los océanos son vitales para la vida en la
          Tierra; generan gran parte del oxígeno que respiramos y regulan el
          clima. Protegerlos es proteger nuestro futuro. Cambios simples en
          nuestro día a día, como reducir el consumo de combustibles fósiles y
          apoyar prácticas sostenibles, pueden marcar la diferencia. Actuemos
          juntos para frenar esta amenaza y preservar la riqueza y diversidad de
          nuestros océanos para las generaciones futuras.
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

      <div style={{ flex: "1", position: "relative" }}>
        <Canvas
          dpr={[1, 1.5]}
          shadows
          camera={{ position: [5, -3, 15], fov: 50, near: 0.1, far: 1000 }}
        >
          <Suspense fallback={null} onLoaded={handleLoad}>
            <Lights />

            <WelcomeText />

            <group
              position={[0, -30, 0]}
              rotation={[Math.PI / 6, Math.PI / 4, 0]}
            >
              <Model castShadow receiveShadow />
              <Shadow color="white" colorStop={0} opacity={0.5} fog={false} />
            </group>
            <BubbleGroup count={100} bubbleSize={1} />

            <OrbitControls
              ref={controlsRef}
              minDistance={200}
              maxDistance={300}
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
