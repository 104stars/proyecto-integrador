import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Loader, Text3D, Environment } from "@react-three/drei";
import { Physics, useBox } from "@react-three/cannon";
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
        padding: "20px",
      }}

    >
{/* Header */}
<header
  style={{
    backgroundColor: "#333",
    color: "#fff",
    padding: "30px 60px", // Incrementa el padding para un encabezado más grande
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width:"100%",
    fontSize:"40px",
  }}
>
  
  <h2 style={{ margin: 0 }}></h2>
        <nav>
          <a href="information" style={{ margin: "0 30px", color: "#fff" }}>
            INFORMACION
          </a>
          <a href="scarcity" style={{ margin: "0 30px", color: "#fff" }}>
            ESCASEZ
          </a>
          <a href="acidification" style={{ margin: "0 30px", color: "#fff" }}>
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
          width: "80%",
          gap: "20px",
          height: "50vh",
          marginBottom: "30px",
        }}
      >
        {/* Caja 1 */}
        <div
          style={{
            flex: 1,
            backgroundColor: "blue",
            padding: "100px",
            borderRadius: "50px",
            boxShadow: "0px 20px 50px rgba(0, 0, 0, 0.3)",
            textAlign: "center",
            height: "50%",
          }}
        >
          <h2 style={{ fontSize: "5.8em", marginBottom: "20px", color: "white" }}>
            ¿Qué es la contaminación?
          </h2>
          <p style={{ fontSize: "3.0em", lineHeight: "2", color: "white" }}>
            La contaminación del agua ocurre cuando sustancias como plásticos,
            químicos y desechos afectan negativamente a los cuerpos de agua.
          </p>
        </div>

        {/* Caja 2 */}
        <div
          style={{
            flex: 1,
            backgroundColor: "skyblue",
            padding: "100px",
            borderRadius: "50px",
            boxShadow: "0px 20px 50px rgba(0, 0, 0, 0.3)",
            textAlign: "center",
            height: "50%",
          }}
        >
          <h2 style={{ fontSize: "5.8em", marginBottom: "20px", color: "white" }}>
            Consecuencias
          </h2>
          <p style={{ fontSize: "3.0em", lineHeight: "2", color: "white" }}>
            La contaminación afecta la biodiversidad, destruye ecosistemas y
            pone en riesgo la salud humana al contaminar nuestras fuentes de
            agua.
          </p>
        </div>

        {/* Caja 3 */}
        <div
          style={{
            flex: 1,
            backgroundColor: "green",
            padding: "100px",
            borderRadius: "50px",
            boxShadow: "0px 20px 50px rgba(0, 0, 0, 0.3)",
            textAlign: "center",
            height: "50%",
          }}
        >
          <h2 style={{ fontSize: "5.8em", marginBottom: "20px", color: "white" }}>
            Soluciones
          </h2>
          <p style={{ fontSize: "3.0em", lineHeight: "2", color: "white" }}>
            Reducir el uso de plásticos, evitar tirar químicos al agua y
            participar en programas de limpieza son acciones importantes.
          </p>
        </div>
      </div>

  

      {/* Canvas 3D */}
      <div
        style={{
          width: "100%",
          height: "90vh",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Canvas
          dpr={[1, 1.5]}
          shadows // Activar sombras
          camera={{ position: [5, 20, 500], fov: 90 }}
        >
          <Physics gravity={[0, 0, 0]}>
            <Suspense fallback={null}>
              <ambientLight intensity={ambientIntensity} />
              <directionalLight
                ref={lightRef}
                intensity={1.2}
                castShadow // Activar sombras proyectadas
                position={[5, 20, 80]}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
              />
              <PhysicalModel />
              <OrbitControls
                minDistance={1} maxDistance={120} enablePan={true}
              />
              <Text3D
                font="/fonts/blue-ocean.json"
                size={40}
                height={4}
                position={[-190, -110, 0]}
                bevelEnabled
                bevelSize={0}
              >
                "Cuidemos el agua"
                <meshStandardMaterial color="grey" />
              </Text3D>
              <Environment files="/img/small_harbor_01_1k.hdr" background />
            </Suspense>
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
    velocity: [5, 0, 0], // Velocidad inicial más rápida en el eje X
    args: [1, 1, 1],
  }));

  useEffect(() => {
    const unsubscribePosition = api.position.subscribe(([x]) => {
      if (x > 10 || x < -10) {
        api.velocity.set(-Math.sign(x) * 5, 0, 0); // Invertir dirección con velocidad rápida
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

