import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

const ProblemScarcity = (props) => {
  const group = useRef();
  const { scene, animations } = useGLTF("./model-3d/alm.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions) {
      actions.Scene?.play();
      actions.birdsAction?.play();
    }
    return () => {
      actions.Scene?.stop();
      actions.birdsAction?.stop();
    };
  }, [actions]);

  // Enable shadows on the model and its children
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  return <primitive ref={group} object={scene} {...props} />;
};

export default ProblemScarcity;
useGLTF.preload("./model-3d/escasez.glb");
