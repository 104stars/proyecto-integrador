import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

const ProblemScarcity = (props) => {
  const group = useRef();
  // Load the GLTF model along with its animations
  const { scene, animations } = useGLTF('./model-3d/alm.glb');
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // Play both animations when the component mounts
    if (actions) {
      actions.Scene?.play();
      actions.birdsAction?.play();
    }

    return () => {
      // Cleanup animations on unmount
      actions.Scene?.stop();
      actions.birdsAction?.stop();
    };
  }, [actions]);

  return <primitive ref={group} object={scene} {...props} />;
};

export default ProblemScarcity;
useGLTF.preload("./model-3d/escasez.glb");