import React, { useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useBox, usePlane } from "@react-three/cannon";

export const AnimatedModel = () => {
  const { scene, animations } = useGLTF("./model-3d/animation.glb");
  const { actions, mixer } = useAnimations(animations, scene);

  useEffect(() => {
    if (actions && animations.length > 0) {
      actions[Object.keys(actions)[0]].play();
    }

    return () => mixer.stopAllAction();
  }, [actions, mixer]);

  scene.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });

  return <primitive object={scene} scale={0.3} position={[1, 0, -2]} />;
};

export const Barrel = () => {
  const { scene } = useGLTF("./model-3d/barrel.glb");
  const [ref, api] = useBox(() => ({
    mass: 1,
    position: [2, 1, 1],
    restitution: 0.8,
  }));

  const handleClick = () => {
    api.applyImpulse([0, 5, 0], [0, 0, 0]);
  };

  scene.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });

  return (
    <primitive ref={ref} object={scene} scale={0.5} onClick={handleClick} />
  );
};

export const TrashBag = () => {
  const { scene } = useGLTF("./model-3d/black_trash_bag.glb");

  const [ref, api] = useBox(() => ({
    mass: 1,
    position: [0, 1, 1],
    restitution: 0.8,
  }));

  const handleClick = () => {
    api.applyImpulse([3, 0, 0], [0, 0, 0]);
  };

  scene.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });

  return (
    <primitive ref={ref} object={scene} scale={0.5} onClick={handleClick} />
  );
};

// Componente del suelo con físicas
export const Ground = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -0.5, 0],
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="lightblue" />
    </mesh>
  );
};

// Componente de paredes invisibles
export const Walls = () => {
  const wallProps = [
    { position: [0, -0.5, -5], rotation: [0, 0, 0] },
    { position: [0, -0.5, 5], rotation: [0, Math.PI, 0] },
    { position: [-5, -0.5, 0], rotation: [0, -Math.PI / 2, 0] },
    { position: [5, -0.5, 0], rotation: [0, Math.PI / 2, 0] },
  ];

  return wallProps.map((props, index) => (
    <mesh key={index} {...props}>
      <boxGeometry args={[10, 1, 0.1]} />
      <meshStandardMaterial transparent opacity={0} />
    </mesh>
  ));
};
