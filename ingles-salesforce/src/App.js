import { useState, useEffect } from "react";
import { vocabulary, phrases } from "./data";
import WordGame from "./WordGame";

const getRandomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

export default function App() {
  const [current, setCurrent] = useState(null);
  const [showRandom, setShowRandom] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [randomVocab, setRandomVocab] = useState(null);
  const [randomPhrase, setRandomPhrase] = useState(null);


  const generateRandom = () => {
    setRandomVocab(getRandomItem(vocabulary));
    setRandomPhrase(getRandomItem(phrases));
  };

  useEffect(() => {
    if (showRandom) {
      setRandomVocab(getRandomItem(vocabulary));
      setRandomPhrase(getRandomItem(phrases));
    }
  }, [showRandom]);

  const lessons = [
    {
      id: 1,
      title: "Vocabulário Básico de Salesforce",
      items: vocabulary
    },
    {
      id: 2,
      title: "Frases Comuns no Trabalho",
      items: phrases
    }
  ];

  if (showGame) {
    return <WordGame onBack={() => setShowGame(false)} />;
  }

  return (
    <div style={{ padding: 20, fontFamily: "Arial", maxWidth: 600 }}>
      <h1>Aprender Inglês - Salesforce</h1>
      <p>Escolha uma opção abaixo:</p>

      <div
        onClick={() => setShowGame(true)}
        style={{
          border: "2px solid #0077b6",
          padding: 15,
          borderRadius: 10,
          marginTop: 10,
          cursor: "pointer",
          background: "#e8f4fc"
        }}
      >
        <strong>🎮 Jogo de Palavras</strong>
        <p style={{ margin: "5px 0 0 0", fontSize: 14, color: "#666" }}>
          Quiz de múltipla escolha para praticar vocabulário e frases
        </p>
      </div>

      <div
        onClick={() => setShowRandom(true)}
        style={{
          border: "2px solid #28a745",
          padding: 15,
          borderRadius: 10,
          marginTop: 10,
          cursor: "pointer",
          background: "#f0f8f0"
        }}
      >
        <strong>🎲 Vocabulário e Frase Aleatória</strong>
        <p style={{ margin: "5px 0 0 0", fontSize: 14, color: "#666" }}>
          Veja uma palavra e uma frase aleatória
        </p>
      </div>

      <p style={{ marginTop: 20 }}>Ou clique em uma lição para estudar:</p>

      {lessons.map((lesson) => (
        <div
          key={lesson.id}
          onClick={() => setCurrent(lesson)}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            borderRadius: 10,
            marginTop: 10,
            cursor: "pointer"
          }}
        >
          <strong>{lesson.title}</strong>
        </div>
      ))}

      {current && (
        <div
          style={{
            marginTop: 20,
            padding: 15,
            border: "1px solid #aaa",
            borderRadius: 10
          }}
        >
          <h2>{current.title}</h2>
          <ul>
            {current.items.map((item, index) => (
              <li key={index}>
                <strong>{item.en}</strong> — {item.pt}
              </li>
            ))}
          </ul>
          <button
            onClick={() => setCurrent(null)}
            style={{
              marginTop: 15,
              padding: "8px 12px",
              background: "#007bff",
              color: "white",
              border: "none",
              borderRadius: 5
            }}
          >
            Voltar
          </button>
        </div>
      )}
      {showRandom && randomVocab && randomPhrase && (
        <div
          style={{
            marginTop: 20,
            padding: 20,
            border: "2px solid #28a745",
            borderRadius: 10,
            background: "#f9f9f9"
          }}
        >
          <h2>🎲 Vocabulário Aleatório</h2>
          <div style={{ marginBottom: 20 }}>
            <strong style={{ fontSize: 18, color: "#333" }}>{randomVocab.en}</strong>
            <p style={{ margin: "5px 0 0 0", color: "#666" }}>{randomVocab.pt}</p>
          </div>

          <h2>📝 Frase Aleatória</h2>
          <div>
            <strong style={{ fontSize: 18, color: "#333" }}>{randomPhrase.en}</strong>
            <p style={{ margin: "5px 0 0 0", color: "#666" }}>{randomPhrase.pt}</p>
          </div>

          <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
            <button
              onClick={generateRandom}
              style={{
                padding: "10px 20px",
                background: "#28a745",
                color: "white",
                border: "none",
                borderRadius: 5,
                cursor: "pointer",
                fontSize: 14
              }}
            >
              🔄 Nova Palavra
            </button>
            <button
              onClick={() => setShowRandom(false)}
              style={{
                padding: "10px 20px",
                background: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: 5,
                cursor: "pointer",
                fontSize: 14
              }}
            >
              Voltar ao Menu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
