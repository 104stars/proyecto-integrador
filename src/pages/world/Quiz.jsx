import React, { useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { Environment, OrbitControls, Text } from "@react-three/drei";
import { db } from "../../../firebase.config";
import { doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const quizData = [
  {
    id: 1,
    question: "¿Qué haces si encuentras una fuga de agua?",
    options: [
      {
        text: "Cerrar la llave principal",
        points: 10,
        model: "buena.glb",
        scale: 1.2,
      },
      { text: "Ignorarla", points: -5, model: "mala.glb", scale: 0.9 },
    ],
  },
  {
    id: 2,
    question: "Ves basura en un río. ¿Qué decides hacer?",
    options: [
      {
        text: "Recolectarla y tirarla",
        points: 10,
        model: "buena.glb",
        scale: 1.2,
      },
      { text: "Seguir caminando", points: -5, model: "mala.glb", scale: 0.9 },
    ],
  },
  {
    id: 3,
    question: "¿Cómo contribuyes a reducir la escasez de agua?",
    options: [
      {
        text: "Recojo agua lluvia",
        points: 10,
        model: "buena.glb",
        scale: 1.2,
      },
      { text: "No me preocupa", points: -5, model: "mala.glb", scale: 1.1 },
    ],
  },
];

const OptionModel = ({ option, onClick, position }) => {
  const model = useLoader(GLTFLoader, `./model-3d/${option.model}`);
  return (
    <group position={position} onClick={() => onClick(option.points)}>
      <primitive object={model.scene} scale={option.scale} />

      <Text
        position={[-0.3, -0.5, 0]}
        fontSize={0.4}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {option.text}
      </Text>
    </group>
  );
};

const QuizScene = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [reward, setReward] = useState("");

  const auth = getAuth();
  const user = auth.currentUser;

  const handleOptionClick = async (points) => {
    const newScore = score + points;
    setScore(newScore);

    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setFinished(true);
      await saveRewards(newScore);
    }
  };

  const saveRewards = async (finalScore) => {
    const newReward =
      finalScore >= 30
        ? "Insignia de Oro 🥇"
        : finalScore >= 20
        ? "Insignia de Plata 🥈"
        : "Insignia de Bronce 🥉";

    setReward(newReward);

    if (user) {
      const rewardRef = doc(db, "user_rewards", user.uid);
      await setDoc(
        rewardRef,
        {
          reward: newReward,
          score: finalScore,
          date: new Date().toISOString(),
        },
        { merge: true }
      );
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setFinished(false);
    setReward("");
  };

  return (
    <div>
      {/* Header */}
      <header
        style={{
          backgroundColor: "#333",
          color: "#fff",
          padding: "10px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ margin: 0 }}></h2>
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
          }}
        >
          <a href="scene" style={{ margin: "0 15px", color: "#fff" }}>
            INICIO
          </a>
        </nav>
      </header>
      <div style={{ height: "100vh", width: "100vw" }}>
        <Canvas shadows camera={{ position: [0, 0, 10], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
          <OrbitControls enablePan={false} />
          <Environment files="/img/playa.hdr" background />

          {finished ? (
            <>
              {/* Mensaje de Quiz Terminado */}
              <Text
                position={[0, 3, 0]}
                fontSize={0.7}
                color="black"
                anchorX="center"
                anchorY="middle"
              >
                ¡Quiz Terminado!
              </Text>
              <Text
                position={[0, 1, 0]}
                fontSize={0.5}
                color="white"
                anchorX="center"
                anchorY="middle"
              >
                Puntuación Final: {score}
              </Text>
              <Text
                position={[0, -1, 0]}
                fontSize={0.5}
                color="black"
                anchorX="center"
                anchorY="middle"
              >
                Recompensa: {reward}
              </Text>

              {/* Botón para reiniciar */}
              <mesh position={[0, -3, 0]} onClick={handleRestartQuiz}>
                <boxGeometry args={[4, 1.5, 0.5]} />
                <meshStandardMaterial color="#4CAF50" />
                <Text
                  position={[0, 0, 0.3]}
                  fontSize={0.4}
                  color="white"
                  anchorX="center"
                  anchorY="middle"
                >
                  Reiniciar Quiz
                </Text>
              </mesh>
            </>
          ) : (
            <>
              {/* Pregunta en Texto 3D */}
              <Text
                position={[0, 3, 0]}
                fontSize={0.6}
                color="black"
                anchorX="center"
                anchorY="middle"
              >
                {quizData[currentQuestion]?.question}
              </Text>
              {/* Opciones como modelos */}
              <OptionModel
                option={quizData[currentQuestion].options[0]}
                onClick={handleOptionClick}
                position={[-3, -2, 0]} // Izquierda
              />
              <OptionModel
                option={quizData[currentQuestion].options[1]}
                onClick={handleOptionClick}
                position={[3, -1.5, 0]}
              />
            </>
          )}
        </Canvas>
      </div>
    </div>
  );
};

export default QuizScene;
