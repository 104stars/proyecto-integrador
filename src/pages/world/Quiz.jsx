import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { db } from "../../../firebase.config";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const quizData = [
  {
    id: 1,
    question: "¿Qué haces si encuentras una fuga de agua?",
    options: [
      { text: "Cerrar la llave principal", points: 10, color: "green" },
      { text: "Ignorarla", points: -5, color: "red" },
    ],
  },
  {
    id: 2,
    question: "Ves basura en un río. ¿Qué decides hacer?",
    options: [
      { text: "Recolectarla y tirarla", points: 10, color: "green" },
      { text: "Seguir caminando", points: -5, color: "red" },
    ],
  },
  {
    id: 3,
    question: "¿Cómo contribuyes a reducir la escasez de agua?",
    options: [
      { text: "Recojo agua lluvia", points: 10, color: "green" },
      { text: "No me preocupa", points: -5, color: "red" },
    ],
  },
  {
    id: 4,
    question: "Tu comunidad sufre contaminación. ¿Qué propones?",
    options: [
      { text: "Campañas de reforestación", points: 10, color: "green" },
      { text: "No hacer nada", points: -5, color: "red" },
    ],
  },
];

const InteractiveQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [reward, setReward] = useState("");

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      loadProgress();
    }
  }, [user]);

  const loadProgress = async () => {
    const docRef = doc(db, "user_quiz_progress", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setCurrentQuestion(data.current_question || 0);
      setScore(data.score || 0);
      setFinished(data.finished || false);
    }
  };

  const saveProgress = async (updatedFinished = false) => {
    const docRef = doc(db, "user_quiz_progress", user.uid);
    await setDoc(
      docRef,
      {
        current_question: currentQuestion,
        score: score,
        finished: updatedFinished,
      },
      { merge: true }
    );
  };

  const saveRewards = async (finalScore) => {
    const newReward =
      finalScore >= 30
        ? "Insignia de Oro 🥇"
        : finalScore >= 20
        ? "Insignia de Plata 🥈"
        : "Insignia de Bronce 🥉";

    setReward(newReward);

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
  };

  const handleOptionClick = async (points) => {
    const newScore = score + points;
    setScore(newScore);

    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      saveProgress();
    } else {
      setFinished(true);
      saveProgress(true);
      saveRewards(newScore);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        position: "relative",
        backgroundColor: "#000",
      }}
    >
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
      <div style={{ height: "100vh", width: "100vw", backgroundColor: "#000" }}>
        <Canvas camera={{ position: [0, 3, 7] }}>
          <OrbitControls />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} intensity={1} />

          <Html
            position={[0, 4, 0]}
            style={{ color: "white", textAlign: "center", fontSize: "1.5rem" }}
          >
            <h2>{quizData[currentQuestion]?.question}</h2>
          </Html>

          {quizData[currentQuestion]?.options.map((option, index) => (
            <mesh
              key={index}
              position={[index * 3 - 1.5, 0, 0]}
              onClick={() => handleOptionClick(option.points)}
            >
              <boxGeometry args={[1.5, 1.5, 1.5]} />
              <meshStandardMaterial color={option.color} />
              <Html
                position={[0, 1, 0]}
                style={{ textAlign: "center", color: "#fff", fontSize: "1rem" }}
              >
                <span>{option.text}</span>
              </Html>
            </mesh>
          ))}
        </Canvas>
      </div>
    </div>
  );
};

export default InteractiveQuiz;
