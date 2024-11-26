import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

const ProblemPollution = (props) => {
  const group = useRef();
  // Load the GLTF model along with its animations
  const { scene, animations } = useGLTF('./model-3d/contamination.glb');
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // Play both animations when the component mounts
    if (actions) {
      actions.Object_14Action?.play();
      
    }

    return () => {
      // Cleanup animations on unmount
      actions.Object_14Action?.stop();
     
    };
  }, [actions]);

  return <primitive ref={group} object={scene} {...props} />;
};

export default ProblemPollution;
useGLTF.preload("./model-3d/contamination.glb")