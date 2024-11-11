import { Center, Html, Text, Text3D } from "@react-three/drei";

const WelcomeText = () => {
  return (
    <>
      <Center top left position={[15, 15, 0]}>
        <Text3D
          font="/fonts/blue-ocean.json"
          bevelEnabled
          bevelSize={0.02}
          bevelThickness={0.01}
          height={0.5}
          lineHeight={0.75}
          letterSpacing={0.05}
          size={3}
        >
          {`ACIDIFICACIÓN`}
          <meshNormalMaterial />
        </Text3D>
      </Center>

      <Html
        occlude
        wrapperClass="welcome-text"
        center
        distanceFactor={15}
        transform
        position={[3, 13, 0]}
        style={{
          color: "white",
          fontSize: "30pt",
        }}
      >
        <h1>OCEANO</h1>
      </Html>
    </>
  );
};

export default WelcomeText;
