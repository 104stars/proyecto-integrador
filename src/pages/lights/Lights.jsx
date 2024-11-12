import React, { useRef } from "react";
import { useHelper } from "@react-three/drei";

const Lights = () => {
  const lightRef = useRef();
  useHelper(lightRef); // Esto te ayudará a ver la posición de la luz en la escena.

  return (
    <>
      {/* Luz ambiental con una intensidad ajustada */}
      <ambientLight intensity={3} />

      {/* Luz direccional configurada para sombras */}
      <directionalLight
        ref={lightRef}
        intensity={3} // Ajusta la intensidad a un nivel más natural
        castShadow
        color={"white"}
        position={[5, 5, 5]}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
    </>
  );
};

export default Lights;
