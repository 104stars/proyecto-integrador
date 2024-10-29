// InformationPage.js
import React, { Suspense, useState } from "react";
import { OrbitControls, Environment, Loader, Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useNavigate } from "react-router-dom";
import Video from "../world/Video";

const Information = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/scene");
    }, 500);
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        position: "relative",
        backgroundImage: "url('/img/fondo.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <button
        onClick={handleBack}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          padding: "10px 20px",

          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold",
          zIndex: 20,
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = "#004080";
          e.target.style.color = "#fff";
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = "#f0f0f0";
          e.target.style.color = "#000";
        }}
      >
        Back
      </button>

      <Canvas shadows camera={{ position: [5, 150, 80], fov: 90 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={8} />
          <directionalLight position={[0, 1, 5]} intensity={8} />
          <Text
            position={[0, 0.8, 0.8]}
            fontSize={0.5}
            color="#FFFFFF"
            anchorX="center"
            anchorY="bottom"
          >
            VIDEO
          </Text>

          <Video position={[0, 0, 1]} />
          <OrbitControls
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 4}
            minAzimuthAngle={-Math.PI / 10}
            maxAzimuthAngle={Math.PI / 10}
            minDistance={3}
            maxDistance={4}
            enableRotate={true}
            enablePan={false}
          />
        </Suspense>
      </Canvas>

      <Loader />

      {loading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 100,
            color: "#fff",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          Loading...
        </div>
      )}

      <div
        style={{
          position: "absolute",
          bottom: "250px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {["Causes", "Problem", "Solution"].map((title, index) => (
          <button
            key={index}
            onClick={() => navigate(`/${title.toLowerCase()}`)}
            style={{
              width: "150px",
              padding: "15px",

              border: "none",
              borderRadius: "5px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#004080";
              e.target.style.color = "#fff";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#f0f0f0";
              e.target.style.color = "#000";
            }}
          >
            {title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Information;
