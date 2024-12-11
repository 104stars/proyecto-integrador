import "./scene.css";
import React, { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  PositionalAudio,
  Loader,
  Environment,
  useGLTF,
} from "@react-three/drei";

import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase.config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";
import logo from "/img/logo.jpg";

const Scene = ({ playAudio }) => {
  const introContainerRef = useRef();
  const problemsContainerRef = useRef();
  const audioRef = useRef();
  const cameraRef = useRef();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(playAudio);
  const [showIntro, setShowIntro] = useState(false);
  const [showScarcity, setShowScarcity] = useState(false);
  const [showPollution, setShowPollution] = useState(false);
  const [showAcid, setAcid] = useState(false);
  const pollutionContainerRef = useRef();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showSummary = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const FinalModel = () => {
    const { scene } = useGLTF("./model-3d/final.glb");

    useEffect(() => {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }, [scene]);

    return <primitive object={scene} />;
  };

  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying]);

  const handleAudioToggle = () => {
    setIsPlaying(!isPlaying);
  };

  const handleLogout = () => {
    auth.signOut().then(() => navigate("/"));
  };

  const handleIntro = () => {
    gsap.to(introContainerRef.current, {
      opacity: 0,
      duration: 0.3,
      y: -100,
      onComplete: () => {
        setShowIntro(true);
      },
    });
    if (cameraRef.current) {
      const targetPosition = { x: 3.5056, y: -0.2875, z: 4.0448 };
      const targetRotation = { x: -1.578, y: 1.3087, z: 1.5785 };

      gsap.to(cameraRef.current.position, {
        x: targetPosition.x,
        y: targetPosition.y,
        z: targetPosition.z,
        duration: 3,
        ease: "power2.inOut",
      });

      gsap.to(cameraRef.current.rotation, {
        x: targetRotation.x,
        y: targetRotation.y,
        z: targetRotation.z,
        duration: 3,
        ease: "power2.inOut",
        onComplete: () => {
          // Fade in problems container with opacity set to 0 initially
          gsap.fromTo(
            problemsContainerRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1 }
          );
        },
      });
    }
  };

  const handleScarcity = () => {
    if (cameraRef.current && problemsContainerRef.current) {
      const targetPosition = { x: 0.215, y: 1.071, z: 2.705 };
      const targetRotation = { x: -0.206, y: -0.475, z: -0.095 };

      // Animate the camera position and rotation
      gsap.to(cameraRef.current.position, {
        x: targetPosition.x,
        y: targetPosition.y,
        z: targetPosition.z,
        duration: 3,
        ease: "power2.inOut",
      });

      gsap.to(cameraRef.current.rotation, {
        x: targetRotation.x,
        y: targetRotation.y,
        z: targetRotation.z,
        duration: 3,
        ease: "power2.inOut",
      });

      // Fade out the intro container and then show scarcity
      gsap.to(problemsContainerRef.current, {
        opacity: 0,
        duration: 0.5,
        y: -100,
        ease: "power2.inOut",
        onComplete: () => {
          setShowIntro(false); // Hide intro
          setShowScarcity(true); // Show scarcity (will trigger fade-in in useEffect)
        },
      });
    }
  };

  // Trigger fade-in effect for scarcity block on showScarcity state change
  useEffect(() => {
    if (showScarcity && problemsContainerRef.current) {
      gsap.to(problemsContainerRef.current, {
        opacity: 1,
        duration: 1.5,

        ease: "power2.inOut",
      });
    }
  }, [showScarcity]);

  const handlePollution = () => {
    // Fade out the Scarcity container using problemsContainerRef
    gsap.to(problemsContainerRef.current, {
      opacity: 0,
      duration: 1,
      onComplete: () => {
        setShowScarcity(false); // Hide Scarcity content
        setShowPollution(true); // Show Pollution content
      },
    });

    if (cameraRef.current) {
      const targetPosition = { x: 0.255, y: 2.944, z: 0.619 };
      const targetRotation = { x: -0.105, y: 0.52, z: 0.052 };

      // Animate the camera movement
      gsap.to(cameraRef.current.position, {
        x: targetPosition.x,
        y: targetPosition.y,
        z: targetPosition.z,
        duration: 3,
        ease: "power2.inOut",
      });

      gsap.to(cameraRef.current.rotation, {
        x: targetRotation.x,
        y: targetRotation.y,
        z: targetRotation.z,
        duration: 3,
        ease: "power2.inOut",
      });
    }
  };

  // Fade-in animation for Pollution container when it becomes visible
  useEffect(() => {
    if (showPollution && pollutionContainerRef.current) {
      // Delay the fade-in to ensure it starts after showPollution is set
      gsap.to(pollutionContainerRef.current, {
        opacity: 1,
        duration: 1.5,
        ease: "power2.inOut",
        delay: 0.2, // Optional delay to ensure the state change completes before fade-in
      });
    }
  }, [showPollution]);

  const handleAcid = () => {
    // Fade out the Pollution container using pollutionContainerRef
    gsap.to(pollutionContainerRef.current, {
      opacity: 0,
      duration: 1,
      onComplete: () => {
        setShowPollution(false); // Hide Pollution content
        setAcid(true); // Show Acidification content
      },
    });

    if (cameraRef.current) {
      const targetPosition = { x: -0.548, y: 5.0181, z: -3.199 };
      const targetRotation = { x: -2.99, y: 0.603, z: 3.06 };

      // Animate the camera movement to the Acidification scene
      gsap.to(cameraRef.current.position, {
        x: targetPosition.x,
        y: targetPosition.y,
        z: targetPosition.z,
        duration: 3,
        ease: "power2.inOut",
      });

      gsap.to(cameraRef.current.rotation, {
        x: targetRotation.x,
        y: targetRotation.y,
        z: targetRotation.z,
        duration: 3,
        ease: "power2.inOut",
      });
    }
  };

  // Trigger fade-in effect for Acidification block when showAcid state changes
  useEffect(() => {
    if (showAcid && pollutionContainerRef.current) {
      // Use gsap to fade in the Acidification content
      gsap.to(pollutionContainerRef.current, {
        opacity: 1,
        duration: 1.5,
        ease: "power2.inOut",
      });
    }
  }, [showAcid]);

  const handleStart = () => {
    // Restablece los estados de las secciones y oculta el mensaje final
    setShowIntro(false);
    setShowScarcity(false);
    setShowPollution(false);
    setAcid(false);
    setShowEndMessage(false);

    gsap.killTweensOf([
      introContainerRef.current,
      problemsContainerRef.current,
      pollutionContainerRef.current,
    ]);
    gsap.set(
      [
        introContainerRef.current,
        problemsContainerRef.current,
        pollutionContainerRef.current,
      ],
      { opacity: 1 }
    );

    if (cameraRef.current) {
      const targetPosition = { x: 10.2995, y: 6.1062, z: 10.8091 };
      const targetRotation = { x: -0.5067, y: 0.78272, z: 0.373 };

      gsap.to(cameraRef.current.position, {
        x: targetPosition.x,
        y: targetPosition.y,
        z: targetPosition.z,
        duration: 3,
        ease: "power2.inOut",
      });

      gsap.to(cameraRef.current.rotation, {
        x: targetRotation.x,
        y: targetRotation.y,
        z: targetRotation.z,
        duration: 3,
        ease: "power2.inOut",
      });
    }
    // Reinicia el flujo desde la introducción
    setTimeout(() => {
      setShowIntro(true);
      handleIntro();
    }, 1000);
  };

  const CustomCamera = () => {
    const { camera } = useThree();
    cameraRef.current = camera;
    return null;
  };

  return (
    <div className="scene-container">
      <nav className="navbar">
        <div>
          <img src={logo} alt="Logo" className="navbar-logo" />
        </div>
        <div className="nav-links">
          <button
            onClick={() => navigate("/information")}
            className="nav-button"
          >
            INFORMATE
          </button>
          <button onClick={() => navigate("/quiz")} className="nav-button">
            QUIZ
          </button>
          <button onClick={handleLogout} className="logout-button">
            SALIR
          </button>
        </div>
      </nav>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Resumen de Problemáticas</h2>
            <p>
              El agua es esencial para la vida, pero enfrenta amenazas como la
              escasez, la contaminación y la acidificación de los océanos. Estos
              problemas impactan tanto a la humanidad como al medio ambiente. La
              acción inmediata es crucial para asegurar un futuro sostenible.
            </p>
            <button className="close-button" onClick={closeModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}

      <FontAwesomeIcon
        icon={isPlaying ? faVolumeUp : faVolumeMute}
        onClick={handleAudioToggle}
        className="volume-icon"
      />

      {/* Intro Container */}

      <div className="intro-container" ref={introContainerRef}>
        <h1 className="intro-title">BIENVENIDO</h1>
        <p className="intro-text">
          Explora cómo podemos cuidar y preservar juntos el agua para un futuro
          sostenible.
        </p>
        <button className="start-button" onClick={handleIntro}>
          Comenzar
        </button>
      </div>

      {/* Problems Container */}
      {showIntro && (
        <div
          className="intro-container"
          ref={problemsContainerRef}
          style={{ opacity: 0 }} // Start with opacity 0 for the fade-in effect
        >
          <h1 className="intro-problems">Introducción a problemas</h1>
          <p className="problems-text">
            El agua es esencial para la vida, pero su uso responsable es clave
            para garantizar su disponibilidad en el futuro. La sostenibilidad
            del agua consiste en conservar, reutilizar y gestionar
            eficientemente este recurso vital, garantizando que tanto las
            personas como el planeta puedan prosperar. A continuación veremos
            algunas de las consecuencias de no tomar acción por el agua.
          </p>
          <button className="start-button" onClick={handleScarcity}>
            Siguiente
          </button>
        </div>
      )}

      {showScarcity && (
        <div
          className="scarcity-container"
          ref={problemsContainerRef}
          style={{ opacity: 0 }} // Start with full opacity
        >
          <h1 className="intro-problems">Escasez de agua</h1>
          <p className="problems-text">
            La escasez de agua se produce cuando la demanda de agua supera la
            oferta o la calidad es inadecuada para las necesidades humanas,
            medioambientales o agrícolas. Es consecuencia del cambio climático,
            el uso excesivo, la contaminación y la mala gestión, y afecta a
            miles de millones de personas en todo el mundo, poniendo en peligro
            la seguridad alimentaria y la salud.
          </p>
          <button className="start-button" onClick={handlePollution}>
            Siguiente
          </button>
        </div>
      )}

      {/* Problems Container for Pollution */}
      {showPollution && (
        <div
          className="pollution-container"
          ref={pollutionContainerRef}
          style={{ opacity: 0 }} // Start hidden for fade-in effect
        >
          <h1 className="intro-problems">Contaminación</h1>
          <p className="problems-text">
            La contaminación del agua se produce cuando sustancias nocivas, como
            plásticos, productos químicos y residuos, contaminan las masas de
            agua. Daña la vida salvaje, daña los ecosistemas y plantea riesgos
            para la salud humana. Prevenirla es crucial para proteger el medio
            ambiente y garantizar agua limpia para todos.
          </p>
          <button className="start-button" onClick={handleAcid}>
            Siguiente
          </button>
        </div>
      )}
      {/* Problems Container for Pollution */}
      {showAcid && (
        <div
          className="pollution-container"
          ref={pollutionContainerRef}
          style={{ opacity: 0 }} // Start hidden for fade-in effect
        >
          <h1 className="intro-problems">Acidificación</h1>
          <p className="problems-text">
            La acidificación de los océanos es una amenaza silenciosa que pone
            en riesgo no solo a los ecosistemas marinos, sino también a nuestra
            propia supervivencia. Los océanos son vitales para la vida en la
            Tierra; generan gran parte del oxígeno que respiramos y regulan el
            clima. Protegerlos es proteger nuestro futuro. Cambios simples en
            nuestro día a día, como reducir el consumo de combustibles fósiles y
            apoyar prácticas sostenibles, pueden marcar la diferencia. Actuemos
            juntos para frenar esta amenaza y preservar la riqueza y diversidad
            de nuestros océanos para las generaciones futuras.
          </p>
          <button className="start-button" onClick={showSummary}>
            RESUMEN
          </button>
        </div>
      )}

      <Canvas
        dpr={[1, 1.5]}
        shadows
        camera={{
          position: [10.2995, 6.1062, 10.8091],
          rotation: [-0.5067, 0.78272, 0.373],
          fov: 45,
        }}
      >
        <CustomCamera />

        <group position={[0, 5, 0]}>
          <PositionalAudio
            ref={audioRef}
            url="/sound/soundwater.mp3"
            loop
            distance={10}
            volume={70}
          />
        </group>
        <Suspense fallback={null}>
          <ambientLight intensity={-0.4} />
          <directionalLight
            position={[10, 15, 10]}
            intensity={8}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={50}
            shadow-bias={-0.001}
          />

          <Environment files="/img/pizzo-skye.hdr" background />
          <FinalModel />
        </Suspense>
      </Canvas>

      <Loader />
    </div>
  );
};

export default Scene;
