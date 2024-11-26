import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useBox } from "@react-three/cannon";

const ProblemScarcity = (props) => {
  const group = useRef();
  const { scene, animations } = useGLTF("./model-3d/alm.glb");
  const { actions } = useAnimations(animations, group);

  // Set up physics body with `useBox`
  const [ref, api] = useBox(() => ({
    mass: 1, // Add some mass so gravity affects the object
    position: [0, 0, 0],
    args: [1, 1, 1], // Approximate size of the model for physics
    ...props,
  }));

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

  // Handle click event to apply force (simulate "jump")
  const handleClick = () => {
    api.velocity.set(0, 5, 0); // Apply an upward velocity
  };

  return (
    <primitive
      ref={(instance) => {
        group.current = instance;
        ref.current = instance; // Link the physics ref to the group ref
      }}
      object={scene}
      onClick={handleClick}
      {...props}
    />
  );
};

export default ProblemScarcity;
useGLTF.preload("./model-3d/escasez.glb");
