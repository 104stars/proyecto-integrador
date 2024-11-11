import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Bubbles = ({ position, size }) => {
  const bubbleRef = useRef();
  const bubbleSpeed = 0.05;

  useFrame(() => {
    if (bubbleRef.current) {
      bubbleRef.current.position.y += bubbleSpeed;

      if (bubbleRef.current.position.y > 5) {
        bubbleRef.current.position.y = -5;
        bubbleRef.current.position.x = (Math.random() - 0.5) * 20;
        bubbleRef.current.position.z = (Math.random() - 0.5) * 20;
      }
    }
  });

  return (
    <mesh ref={bubbleRef} position={position}>
      <sphereGeometry args={[size, 30, 30]} />
      <meshStandardMaterial color="lightblue" transparent opacity={0.7} />
    </mesh>
  );
};

const BubbleGroup = ({ count, bubbleSize }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Bubbles
          key={index}
          position={[
            Math.random() * 50 - 30,
            Math.random() * -20,
            Math.random() * 50 - 30,
          ]}
          size={bubbleSize}
        />
      ))}
    </>
  );
};

export default BubbleGroup;
