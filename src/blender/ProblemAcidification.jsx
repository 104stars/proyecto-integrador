import React from "react";
import { useGLTF } from "@react-three/drei";

const UnderwaterScene = (props) => {
  // Cargar el archivo .glb
  const { scene } = useGLTF("./model-3d/acidificacion.glb");

  // Renderizar el modelo cargado
  return <primitive object={scene} {...props} />;
};

export default UnderwaterScene;

// Pre-cargar el modelo para optimizar la carga
useGLTF.preload("./model-3d/acidicacion.glb");
