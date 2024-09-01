import React, { useEffect, useState, useRef } from 'react';
import { auth } from '../../../firebase.config';
import { useNavigate } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
import * as THREE from 'three';

// Parameters for the cosine wave animation
const frequency = 0.5; // Frequency of the wave
const amplitude = 2;   // Amplitude of the wave
const speed = 2;       // Speed of the wave

// Main Scene component that sets up the 3D environment
const Scene = () => {
  return (
    <Canvas
      shadows // Enable shadows in the Canvas
      camera={{ position: [0, 10, 20], fov: 50 }} // Set up the camera with position and field of view
      gl={{ clearColor: '#808080' }} // Set the background color of the Canvas
    >
      {/* Directional light with shadows enabled */}
      <directionalLight
        position={[5, 5, 5]} // Position of the light
        intensity={1} // Light intensity
        castShadow // Enable shadow casting
        shadow-mapSize-width={1024} // Shadow map resolution
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5} // Near plane of the shadow camera
        shadow-camera-far={50} // Far plane of the shadow camera
        shadow-camera-left={-10} // Shadow camera bounds
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      
      {/* Ambient light for general illumination */}
      <ambientLight intensity={0.3} />

      {/* Plane that receives shadows */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} /> {/* Plane geometry */}
        <shadowMaterial opacity={0.5} /> {/* Special material for receiving shadows */}
      </mesh>

      {/* The 3D object with cosine wave animation */}
      <OscillatingCylinder />

      {/* Orbit controls for navigating the scene */}
      <OrbitControls />
    </Canvas>
  );
};

// OscillatingCylinder component handles the cosine wave animation of the object
const OscillatingCylinder = () => {
  const meshRef = useRef();
  const clock = new THREE.Clock(); // Create a clock for time-based animation

  // Animation loop
  useFrame(() => {
    const time = clock.getElapsedTime(); // Get elapsed time from the clock
    if (meshRef.current) {
      const width = 10; // Define the width of the visible area
      const x = (time * 5) % width; // Compute the x position and wrap it
      const y = 2 * Math.cos(0.5 * x); // Compute y position using a cosine function
      meshRef.current.position.set(x - width / 2, y, 0); // Set the position of the cylinder
    }
  });

  return (
    <mesh
      ref={meshRef} // Reference to the mesh for animation
      castShadow // Enable shadow casting for the object
      receiveShadow // Enable the object to receive shadows
    >
      <cylinderGeometry args={[1, 1, 2, 32]} /> {/* Cylinder geometry with specified dimensions */}
      <meshStandardMaterial color="blue" /> {/* Standard material with color */}
    </mesh>
  );
};

// Dashboard component which handles user authentication and renders the 3D scene
function Dashboard() {
  const navigate = useNavigate(); // Hook for navigation
  const [user, setUser] = useState(null); // State to manage the current user

  useEffect(() => {
    // Set up authentication state listener
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set the user if authenticated
      } else {
        navigate('/'); // Redirect to home if not authenticated
      }
    });

    // Cleanup the subscription on unmount
    return () => unsubscribe();
  }, [navigate]);

  // Function to handle user sign-out
  const handleSignOut = () => {
    auth.signOut().then(() => {
      navigate('/'); // Redirect to home after sign-out
    }).catch((error) => {
      console.error("Error signing out:", error); // Log any sign-out errors
    });
  };

  // If the user is not authenticated, return null
  if (!user) return null;

  // Render the dashboard with a 3D scene and sign-out button
  return (
    <div style={{ height: '110vh', width: '110vw', position: 'relative', backgroundColor: '#808080' }}>
        <button onClick={handleSignOut}
         >Sign Out</button>
   
      {/* Title in the center of the page */}
      <h1 style={{
        position: 'absolute',
        top: '20%',
        left: '40%',
        transform: 'translate(-30%, -50%)',
        color: '#333',
        fontSize: '2rem',
        zIndex: 10 // Ensures the title is above the 3D scene
      }}>
        Problemas Medioambientales 
       
      </h1>
  
      {/* Title in the center of the page */}
      <h1 style={{
        position: 'absolute',
        top: '26%',
        left: '40%',
        transform: 'translate(40%, -50%)',
        color: '#333',
        fontSize: '2rem',
        zIndex: 10 // Ensures the title is above the 3D scene
      }}>
      AGUA
       
      </h1>
      <Canvas>
        <ambientLight intensity={0.5} /> {/* Ambient light */}
        <directionalLight position={[2, 0, 3]} intensity={1} /> {/* Directional light */}
        <OscillatingCylinder /> {/* 3D object with cosine wave animation */}
        <PointerLockControls /> {/* Controls for first-person view */}
      </Canvas>
    </div>
  );
}

export default Dashboard;



