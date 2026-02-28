import { useState, useEffect } from "react";
import { vocabulary, phrases } from "./data";

const shuffleArray = (arr) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const getRandomWrongOptions = (items, correctItem, count = 3) => {
  const others = items.filter((item) => item !== correctItem);
  const shuffled = shuffleArray(others);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

export default function WordGame({ onBack }) {
  const [mode, setMode] = useState(null); // 'vocab' | 'phrases' | 'both'
  const [direction, setDirection] = useState("en-pt"); // 'en-pt' | 'pt-en'
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const allItems = mode === "vocab" ? vocabulary : mode === "phrases" ? phrases : [...vocabulary, ...phrases];

  const startGame = () => {
    if (mode && allItems.length >= 4) {
      const shuffled = shuffleArray(allItems);
      setItems(shuffled);
      setCurrentIndex(0);
      setScore(0);
      setGameStarted(true);
    }
  };

  useEffect(() => {
    if (gameStarted && items.length > 0 && currentIndex < items.length) {
      const current = items[currentIndex];
      const wrongOptions = getRandomWrongOptions(items, current);
      const allOpts = [current, ...wrongOptions];
      setOptions(shuffleArray(allOpts));
      setAnswered(false);
      setSelectedAnswer(null);
    }
  }, [gameStarted, items, currentIndex]);

  const handleAnswer = (option) => {
    if (answered) return;
    setSelectedAnswer(option);
    setAnswered(true);
    const correct = items[currentIndex];
    const isCorrect = (direction === "en-pt" ? option.pt === correct.pt : option.en === correct.en);
    if (isCorrect) setScore((s) => s + 1);
  };

  const nextQuestion = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setShowResult(true);
    }
  };

  const current = items[currentIndex];
  const correctItem = current;

  if (!mode) {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>🎮 Jogo de Palavras</h1>
        <p style={styles.subtitle}>Escolha o modo e a direção do quiz:</p>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>O que estudar?</h3>
          <div style={styles.buttonGroup}>
            <button style={styles.modeBtn} onClick={() => setMode("vocab")}>
              📚 Apenas Vocabulário
            </button>
            <button style={styles.modeBtn} onClick={() => setMode("phrases")}>
              💬 Apenas Frases
            </button>
            <button style={styles.modeBtn} onClick={() => setMode("both")}>
              🎯 Vocabulário + Frases
            </button>
          </div>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Direção do quiz</h3>
          <div style={styles.buttonGroup}>
            <button
              style={{ ...styles.modeBtn, ...(direction === "en-pt" ? styles.selected : {}) }}
              onClick={() => setDirection("en-pt")}
            >
              Inglês → Português
            </button>
            <button
              style={{ ...styles.modeBtn, ...(direction === "pt-en" ? styles.selected : {}) }}
              onClick={() => setDirection("pt-en")}
            >
              Português → Inglês
            </button>
          </div>
        </div>

        <button
          style={styles.startBtn}
          onClick={startGame}
          disabled={!mode || (mode === "vocab" && vocabulary.length < 4) || (mode === "phrases" && phrases.length < 4) || (mode === "both" && vocabulary.length + phrases.length < 4)}
        >
          🚀 Iniciar Jogo
        </button>

        <button style={styles.backBtn} onClick={onBack}>
          ← Voltar ao Menu
        </button>
      </div>
    );
  }

  if (showResult) {
    const percentage = items.length > 0 ? Math.round((score / items.length) * 100) : 0;
    return (
      <div style={styles.container}>
        <div style={styles.resultCard}>
          <h1 style={styles.resultTitle}>🎉 Fim do Jogo!</h1>
          <p style={styles.resultScore}>
            Você acertou <strong>{score}</strong> de <strong>{items.length}</strong> perguntas
          </p>
          <p style={styles.resultPercent}>{percentage}% de acertos</p>
          <p style={styles.resultMessage}>
            {percentage >= 80 ? "Excelente! Você está dominando o vocabulário!" : percentage >= 60 ? "Bom trabalho! Continue praticando!" : "Não desanime! Revise e tente novamente!"}
          </p>
          <button style={styles.startBtn} onClick={() => { setShowResult(false); setMode(null); }}>
            Jogar novamente
          </button>
          <button style={styles.backBtn} onClick={onBack}>
            ← Voltar ao Menu
          </button>
        </div>
      </div>
    );
  }

  if (!gameStarted || !current) return null;

  const questionText = direction === "en-pt" ? current.en : current.pt;
  const getOptionText = (opt) => (direction === "en-pt" ? opt.pt : opt.en);
  const isCorrectOption = (opt) =>
    direction === "en-pt" ? opt.pt === correctItem.pt : opt.en === correctItem.en;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.score}>
          Pontuação: {score} / {currentIndex + 1}
        </span>
        <span style={styles.progress}>
          Pergunta {currentIndex + 1} de {items.length}
        </span>
      </div>

      <div style={styles.questionCard}>
        <p style={styles.questionLabel}>
          {direction === "en-pt" ? "Em inglês:" : "Em português:"}
        </p>
        <h2 style={styles.questionText}>{questionText}</h2>
        <p style={styles.questionHint}>Qual é a tradução correta?</p>
      </div>

      <div style={styles.optionsGrid}>
        {options.map((opt, i) => {
          const isSelected = selectedAnswer === opt;
          const correct = isCorrectOption(opt);
          const showResult = answered && (isSelected || correct);

          let btnStyle = { ...styles.optionBtn };
          if (showResult) {
            if (correct) btnStyle = { ...btnStyle, ...styles.correctBtn };
            else if (isSelected && !correct) btnStyle = { ...btnStyle, ...styles.wrongBtn };
          }

          return (
            <button
              key={i}
              style={btnStyle}
              onClick={() => handleAnswer(opt)}
              disabled={answered}
            >
              {getOptionText(opt)}
              {showResult && correct && " ✓"}
              {showResult && isSelected && !correct && " ✗"}
            </button>
          );
        })}
      </div>

      {answered && (
        <div style={styles.feedback}>
          <p style={styles.feedbackText}>
            {isCorrectOption(selectedAnswer)
              ? "🎉 Correto! Parabéns!"
              : `❌ A resposta correta é: ${getOptionText(correctItem)}`}
          </p>
          <button style={styles.nextBtn} onClick={nextQuestion}>
            {currentIndex < items.length - 1 ? "Próxima pergunta →" : "Ver resultado final"}
          </button>
        </div>
      )}

      <button style={styles.backBtn} onClick={onBack}>
        ← Sair do jogo
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: 24,
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    maxWidth: 640,
    margin: "0 auto",
  },
  title: {
    fontSize: 28,
    color: "#1a1a2e",
    marginBottom: 8,
  },
  subtitle: {
    color: "#555",
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    color: "#333",
    marginBottom: 12,
  },
  buttonGroup: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
  },
  modeBtn: {
    padding: "12px 18px",
    background: "#f0f0f0",
    border: "2px solid #ddd",
    borderRadius: 10,
    cursor: "pointer",
    fontSize: 14,
    transition: "all 0.2s",
  },
  selected: {
    background: "#0077b6",
    color: "white",
    borderColor: "#0077b6",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 20,
    fontSize: 14,
    color: "#666",
  },
  score: {
    fontWeight: 600,
    color: "#0077b6",
  },
  progress: {
    color: "#888",
  },
  questionCard: {
    background: "linear-gradient(135deg, #0077b6 0%, #00b4d8 100%)",
    color: "white",
    padding: 28,
    borderRadius: 16,
    marginBottom: 24,
    boxShadow: "0 4px 14px rgba(0,119,182,0.3)",
  },
  questionLabel: {
    fontSize: 12,
    opacity: 0.9,
    margin: "0 0 8px 0",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  questionText: {
    fontSize: 22,
    margin: "0 0 8px 0",
    lineHeight: 1.4,
  },
  questionHint: {
    fontSize: 14,
    opacity: 0.85,
    margin: 0,
  },
  optionsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
    marginBottom: 24,
  },
  optionBtn: {
    padding: 16,
    background: "white",
    border: "2px solid #e0e0e0",
    borderRadius: 12,
    cursor: "pointer",
    fontSize: 15,
    textAlign: "left",
    transition: "all 0.2s",
  },
  correctBtn: {
    background: "#2ecc71",
    borderColor: "#27ae60",
    color: "white",
  },
  wrongBtn: {
    background: "#e74c3c",
    borderColor: "#c0392b",
    color: "white",
  },
  feedback: {
    marginBottom: 20,
    padding: 16,
    background: "#f8f9fa",
    borderRadius: 12,
    border: "1px solid #e9ecef",
  },
  feedbackText: {
    margin: "0 0 12px 0",
    fontSize: 16,
  },
  nextBtn: {
    padding: "12px 24px",
    background: "#0077b6",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 15,
    fontWeight: 600,
  },
  startBtn: {
    padding: "14px 28px",
    background: "linear-gradient(135deg, #0077b6 0%, #00b4d8 100%)",
    color: "white",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 16,
    boxShadow: "0 4px 12px rgba(0,119,182,0.3)",
  },
  resultCard: {
    textAlign: "center",
    padding: 32,
    background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
    borderRadius: 16,
    border: "1px solid #dee2e6",
  },
  resultTitle: {
    fontSize: 28,
    color: "#1a1a2e",
    marginBottom: 16,
  },
  resultScore: {
    fontSize: 20,
    color: "#333",
    marginBottom: 8,
  },
  resultPercent: {
    fontSize: 36,
    fontWeight: 700,
    color: "#0077b6",
    marginBottom: 16,
  },
  resultMessage: {
    fontSize: 16,
    color: "#555",
    marginBottom: 24,
  },
  backBtn: {
    padding: "10px 16px",
    background: "transparent",
    color: "#666",
    border: "1px solid #ccc",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 14,
  },
};
