"use client";

import React, { useState, useEffect, useRef } from "react";
import { useApp } from "../context/AppContext";
import { Trophy, RotateCcw, Award, CheckCircle, HelpCircle } from "lucide-react";
import { motion } from "motion/react";

// ==========================================
// OUTSIDE HELPERS & STATIC CONFIG (For Strict Pure Component Validation)
// ==========================================
const glyphs = ["🌐", "🤖", "💻", "🔒", "⚡", "🔋", "📱", "📡"];

const quizQuestions = [
  {
    q: "Siapakah pendiri utama dari platform Rizky Smart Community?",
    options: ["Andi Wijaya", "Muhammad Rizky", "Siti Rahmah", "Budi Santoso"],
    answer: "Muhammad Rizky",
  },
  {
    q: "Prodi apa yang sedang ditempuh oleh Muhammad Rizky saat ini?",
    options: ["Sistem Informasi", "Teknik Elektro", "Ilmu Komputer", "Sains Data"],
    answer: "Ilmu Komputer",
  },
  {
    q: "Manakah teknologi React Framework yang direkomendasikan untuk platform 3D RSC?",
    options: ["Vue.js", "Angular", "Next.js", "Django"],
    answer: "Next.js",
  },
  {
    q: "Dari manakah asal tempat tinggal asal Muhammad Rizky di Aceh?",
    options: ["Meulaboh", "Cadek, Aceh Besar", "Banda Aceh Kota", "Lhokseumawe"],
    answer: "Cadek, Aceh Besar",
  },
];

function checkWinner(squares: (string | null)[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function spawn2048(grid: number[][]) {
  const emptyCells: { r: number; c: number }[] = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (grid[r][c] === 0) emptyCells.push({ r, c });
    }
  }
  if (emptyCells.length > 0) {
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    grid[randomCell.r][randomCell.c] = Math.random() > 0.8 ? 4 : 2;
  }
}

export default function GamesView() {
  const { addPoints, leaderboardUsers } = useApp();
  const [activeGame, setActiveGame] = useState<"snake" | "memory" | "tictactoe" | "2048" | "quiz">("quiz");

  // ==========================================
  // GAME 1: RETRO CYBER SNAKE GAME
  // ==========================================
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [snakeScore, setSnakeScore] = useState(0);
  const [snakeGameOver, setSnakeGameOver] = useState(true);
  const snakeDirection = useRef({ x: 0, y: -1 });

  useEffect(() => {
    if (activeGame !== "snake") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gridSize = 20;
    const tileCount = 15; // 300x300 pixel stage
    let snake = [{ x: 7, y: 7 }];
    let food = { x: 3, y: 3 };
    let intervalId: any;

    const resetFood = () => {
      food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount),
      };
    };

    const drawGame = () => {
      // Clear
      ctx.fillStyle = "#020617";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Food
      ctx.fillStyle = "#ef4444";
      ctx.beginPath();
      ctx.arc(food.x * gridSize + gridSize / 2, food.y * gridSize + gridSize / 2, gridSize / 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Snake body
      snake.forEach((part, index) => {
        ctx.fillStyle = index === 0 ? "#06b6d4" : "#0891b2";
        ctx.fillRect(part.x * gridSize + 1, part.y * gridSize + 1, gridSize - 2, gridSize - 2);
      });
    };

    const updateGame = () => {
      if (snakeGameOver) return;

      const head = {
        x: snake[0].x + snakeDirection.current.x,
        y: snake[0].y + snakeDirection.current.y,
      };

      // Collision borders
      if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        setSnakeGameOver(true);
        addPoints(Math.floor(snakeScore / 2)); // Earn points from score
        return;
      }

      // Collision self
      for (let part of snake) {
        if (head.x === part.x && head.y === part.y) {
          setSnakeGameOver(true);
          addPoints(Math.floor(snakeScore / 2));
          return;
        }
      }

      snake.unshift(head);

      // Check food
      if (head.x === food.x && head.y === food.y) {
        setSnakeScore((prev) => prev + 10);
        resetFood();
      } else {
        snake.pop();
      }

      drawGame();
    };

    drawGame();

    if (!snakeGameOver) {
      intervalId = setInterval(updateGame, 150);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          if (snakeDirection.current.y === 0) snakeDirection.current = { x: 0, y: -1 };
          break;
        case "ArrowDown":
          if (snakeDirection.current.y === 0) snakeDirection.current = { x: 0, y: 1 };
          break;
        case "ArrowLeft":
          if (snakeDirection.current.x === 0) snakeDirection.current = { x: -1, y: 0 };
          break;
        case "ArrowRight":
          if (snakeDirection.current.x === 0) snakeDirection.current = { x: 1, y: 0 };
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearInterval(intervalId);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [snakeGameOver, activeGame, snakeScore, addPoints]);

  const startSnakeGame = () => {
    setSnakeScore(0);
    setSnakeGameOver(false);
    snakeDirection.current = { x: 0, y: -1 };
  };

  const handleSnakeBtnControl = (dir: { x: number; y: number }) => {
    snakeDirection.current = dir;
  };

  // ==========================================
  // GAME 2: MEMORY GAME
  // ==========================================
  const [memoryGrid, setMemoryGrid] = useState<any[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [memoryMatches, setMemoryMatches] = useState(0);
  const [memoryMoves, setMemoryMoves] = useState(0);

  const startMemoryGame = () => {
    const doubleCards = [...glyphs, ...glyphs].map((g, i) => ({
      id: i,
      glyph: g,
      flipped: false,
      matched: false,
    }));
    // Shuffle
    const shuffled = doubleCards.sort(() => Math.random() - 0.5);
    setMemoryGrid(shuffled);
    setSelectedCards([]);
    setMemoryMatches(0);
    setMemoryMoves(0);
  };

  const handleCardClick = (idx: number) => {
    if (selectedCards.length >= 2 || memoryGrid[idx].flipped || memoryGrid[idx].matched) return;

    // Flip selected card
    const updated = [...memoryGrid];
    updated[idx].flipped = true;
    setMemoryGrid(updated);

    const newSelection = [...selectedCards, idx];
    setSelectedCards(newSelection);

    if (newSelection.length === 2) {
      setMemoryMoves((m) => m + 1);
      const [firstIdx, secondIdx] = newSelection;

      if (memoryGrid[firstIdx].glyph === memoryGrid[secondIdx].glyph) {
        // Match found
        setTimeout(() => {
          const matchedGrid = [...memoryGrid];
          matchedGrid[firstIdx].matched = true;
          matchedGrid[secondIdx].matched = true;
          setMemoryGrid(matchedGrid);
          setMemoryMatches((m) => m + 1);

          const matchedCount = matchedGrid.filter((c) => c.matched).length;
          if (matchedCount === glyphs.length * 2) {
            addPoints(50);
          }

          setSelectedCards([]);
        }, 600);
      } else {
        // No match - Flip back
        setTimeout(() => {
          const resetGrid = [...memoryGrid];
          resetGrid[firstIdx].flipped = false;
          resetGrid[secondIdx].flipped = false;
          setMemoryGrid(resetGrid);
          setSelectedCards([]);
        }, 1000);
      }
    }
  };

  // ==========================================
  // GAME 3: TIC TAC TOE
  // ==========================================
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [tttWinner, setTttWinner] = useState<string | null>(null);

  const handleTTTClick = (idx: number) => {
    if (board[idx] || tttWinner) return;

    const newBoard = [...board];
    newBoard[idx] = "X"; // Player is always X
    setBoard(newBoard);
    setIsXNext(false);

    // Check winner
    const winner = checkWinner(newBoard);
    if (winner) {
      setTttWinner(winner);
      if (winner === "X") addPoints(25);
      return;
    }

    if (!newBoard.includes(null)) {
      setTttWinner("Draw");
      return;
    }

    // AI Move
    setTimeout(() => {
      const aiBoard = [...newBoard];
      const emptyIndices = aiBoard.map((v, i) => (v === null ? i : null)).filter((v) => v !== null) as number[];
      if (emptyIndices.length > 0) {
        const randomAiMove = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        aiBoard[randomAiMove] = "O";
        setBoard(aiBoard);
        setIsXNext(true);

        const aiWinner = checkWinner(aiBoard);
        if (aiWinner) {
          setTttWinner(aiWinner);
        } else if (!aiBoard.includes(null)) {
          setTttWinner("Draw");
        }
      }
    }, 400);
  };

  const resetTTT = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setTttWinner(null);
  };

  // ==========================================
  // GAME 4: 2048 CYBER MERGE
  // ==========================================
  const [board2048, setBoard2048] = useState<number[][]>([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);
  const [score2048, setScore2048] = useState(0);

  const start2048Game = () => {
    let fresh = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    // Add two random 2s
    spawn2048(fresh);
    spawn2048(fresh);
    setBoard2048(fresh);
    setScore2048(0);
  };

  // 2048 Move logic simulation
  const move2048 = (dir: "up" | "down" | "left" | "right") => {
    let grid = board2048.map((row) => [...row]);
    let shifted = false;
    let addedScore = 0;
    let addedPoints = 0;

    // Shift & Merge simulations (simplified representation for stable UI feedback)
    if (dir === "left") {
      for (let r = 0; r < 4; r++) {
        const row = grid[r].filter((v) => v !== 0);
        const newRow: number[] = [];
        for (let i = 0; i < row.length; i++) {
          if (row[i] === row[i + 1]) {
            newRow.push(row[i] * 2);
            addedScore += row[i] * 2;
            addedPoints += Math.floor(row[i] / 4);
            i++;
            shifted = true;
          } else {
            newRow.push(row[i]);
          }
        }
        while (newRow.length < 4) newRow.push(0);
        if (newRow.join(",") !== board2048[r].join(",")) shifted = true;
        grid[r] = newRow;
      }
    }

    if (shifted) {
      spawn2048(grid);
      setBoard2048(grid);
      if (addedScore > 0) {
        setScore2048((s) => s + addedScore);
      }
      if (addedPoints > 0) {
        addPoints(addedPoints);
      }
    }
  };

  // ==========================================
  // GAME 5: TECH TRIVIA QUIZ
  // ==========================================
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleAnswerSubmit = (ans: string) => {
    setSelectedAnswer(ans);
    if (ans === quizQuestions[currentQuizIdx].answer) {
      setQuizScore((s) => s + 25);
      addPoints(25); // Award points on the fly!
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      if (currentQuizIdx < quizQuestions.length - 1) {
        setCurrentQuizIdx((i) => i + 1);
      } else {
        setQuizFinished(true);
      }
    }, 1200);
  };

  const resetQuiz = () => {
    setCurrentQuizIdx(0);
    setSelectedAnswer(null);
    setQuizScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="relative px-4 md:px-12 py-12 z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column: Game Area (8 cols) */}
      <div className="lg:col-span-8 space-y-6">
        {/* Game Navigation Header */}
        <div className="flex flex-wrap gap-2 pb-4 border-b border-slate-900">
          {[
            { id: "quiz", label: "Tech Quiz 📝" },
            { id: "snake", label: "Cyber Snake 🐍" },
            { id: "memory", label: "Memory Cards 🃏" },
            { id: "tictactoe", label: "Tic Tac Toe ⭕" },
            { id: "2048", label: "2048 Cyber 🔢" },
          ].map((g) => (
            <button
              key={g.id}
              onClick={() => {
                setActiveGame(g.id as any);
                if (g.id === "snake") startSnakeGame();
                if (g.id === "memory") startMemoryGame();
                if (g.id === "tictactoe") resetTTT();
                if (g.id === "2048") start2048Game();
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                activeGame === g.id
                  ? "bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)] border border-cyan-400/40"
                  : "bg-slate-950/40 hover:bg-slate-900 border border-slate-850 text-slate-400 hover:text-white"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>

        {/* GAME CONTENT CONTAINER BOX */}
        <div className="p-8 rounded-2xl border border-slate-800 bg-slate-950/40 backdrop-blur-xl shadow-2xl flex flex-col items-center justify-center min-h-[420px]">
          {/* 1. TECH TRIVIA QUIZ */}
          {activeGame === "quiz" && (
            <div className="w-full max-w-xl">
              <div className="flex justify-between items-center mb-6 border-b border-slate-900 pb-4">
                <span className="text-xxs font-mono text-cyan-400 uppercase tracking-widest">
                  TECH TRIVIA EXAM
                </span>
                <span className="text-sm font-bold text-white font-mono">
                  Points Gained: {quizScore}
                </span>
              </div>

              {!quizFinished ? (
                <div>
                  <h3 className="text-lg font-bold text-white mb-6 leading-relaxed">
                    {quizQuestions[currentQuizIdx].q}
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {quizQuestions[currentQuizIdx].options.map((opt, index) => {
                      const isCorrect = opt === quizQuestions[currentQuizIdx].answer;
                      const isSelected = selectedAnswer === opt;
                      let btnStyle = "bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-900";

                      if (selectedAnswer) {
                        if (isSelected) {
                          btnStyle = isCorrect
                            ? "bg-emerald-500/20 border-emerald-500 text-emerald-300"
                            : "bg-red-500/20 border-red-500 text-red-300";
                        } else if (isCorrect) {
                          btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-300";
                        }
                      }

                      return (
                        <button
                          key={index}
                          onClick={() => !selectedAnswer && handleAnswerSubmit(opt)}
                          disabled={!!selectedAnswer}
                          className={`w-full p-4 rounded-xl border text-left text-sm font-sans transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {selectedAnswer && isCorrect && <CheckCircle className="w-5 h-5 text-emerald-400" />}
                          {selectedAnswer && isSelected && !isCorrect && <HelpCircle className="w-5 h-5 text-red-400" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <Award className="w-12 h-12 text-cyan-400 mx-auto mb-4 animate-bounce" />
                  <h3 className="text-2xl font-bold text-white mb-2">Quiz Selesai!</h3>
                  <p className="text-slate-400 text-sm font-light mb-6">
                    Hebat! Anda menyelesaikan quiz pemrograman dan siber security.
                  </p>
                  <button
                    onClick={resetQuiz}
                    className="px-6 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 mx-auto cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" /> Main Lagi
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 2. CYBER SNAKE GAME */}
          {activeGame === "snake" && (
            <div className="flex flex-col items-center">
              <div className="flex justify-between w-full max-w-xs mb-4 text-xs font-mono text-slate-400">
                <span>Score: {snakeScore}</span>
                <span>CYBER_STAGE_300</span>
              </div>

              <div className="relative border border-slate-800 rounded-2xl overflow-hidden shadow-inner">
                <canvas ref={canvasRef} width={300} height={300} className="bg-slate-950" />
                {snakeGameOver && (
                  <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center text-center">
                    <h3 className="text-xl font-bold text-white mb-2">Cyber Snake</h3>
                    <p className="text-slate-400 text-xs font-light mb-4 max-w-[200px]">
                      Gunakan tombol kontrol di bawah atau panah keyboard untuk bermain!
                    </p>
                    <button
                      onClick={startSnakeGame}
                      className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs uppercase tracking-wider cursor-pointer"
                    >
                      Mulai Main
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile controls visual keypads */}
              <div className="grid grid-cols-3 gap-2 mt-6 w-36">
                <div />
                <button
                  onClick={() => handleSnakeBtnControl({ x: 0, y: -1 })}
                  className="p-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white rounded-lg flex items-center justify-center cursor-pointer"
                >
                  ▲
                </button>
                <div />
                <button
                  onClick={() => handleSnakeBtnControl({ x: -1, y: 0 })}
                  className="p-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white rounded-lg flex items-center justify-center cursor-pointer"
                >
                  ◀
                </button>
                <button
                  onClick={() => handleSnakeBtnControl({ x: 0, y: 1 })}
                  className="p-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white rounded-lg flex items-center justify-center cursor-pointer"
                >
                  ▼
                </button>
                <button
                  onClick={() => handleSnakeBtnControl({ x: 1, y: 0 })}
                  className="p-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white rounded-lg flex items-center justify-center cursor-pointer"
                >
                  ▶
                </button>
              </div>
            </div>
          )}

          {/* 3. MEMORY CARDS MATCHING GAME */}
          {activeGame === "memory" && (
            <div className="w-full max-w-md">
              <div className="flex justify-between items-center mb-6 text-xs font-mono text-slate-400 border-b border-slate-900 pb-3">
                <span>Moves: {memoryMoves}</span>
                <span>Matches: {memoryMatches} / {glyphs.length}</span>
                <button onClick={startMemoryGame} className="text-cyan-400 hover:underline">
                  Reset
                </button>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {memoryGrid.map((card, idx) => {
                  const isVisible = card.flipped || card.matched;
                  return (
                    <div
                      key={card.id}
                      onClick={() => handleCardClick(idx)}
                      className={`h-16 rounded-xl border flex items-center justify-center text-xl cursor-pointer transition-all duration-300 ${
                        isVisible
                          ? "bg-cyan-950/40 border-cyan-500/50 text-white"
                          : "bg-slate-950 border-slate-800 text-transparent hover:border-slate-700"
                      }`}
                    >
                      {isVisible ? card.glyph : "?"}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 4. TIC TAC TOE */}
          {activeGame === "tictactoe" && (
            <div className="flex flex-col items-center">
              <h3 className="text-sm font-mono text-cyan-400 mb-4 uppercase tracking-wider">
                TTT vs AI Assistant
              </h3>

              <div className="grid grid-cols-3 gap-3 w-48 mb-6">
                {board.map((sq, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleTTTClick(idx)}
                    className="h-14 w-14 bg-slate-950 hover:bg-slate-900 border border-slate-850 rounded-xl text-lg font-bold text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <span className={sq === "X" ? "text-cyan-400" : "text-pink-500"}>{sq}</span>
                  </button>
                ))}
              </div>

              {tttWinner && (
                <div className="text-center space-y-3">
                  <p className="text-sm font-mono text-white">
                    {tttWinner === "Draw" ? "Hasil Imbang!" : `Pemenang: ${tttWinner}`}
                  </p>
                  <button
                    onClick={resetTTT}
                    className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono uppercase"
                  >
                    Main Lagi
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 5. 2048 CYBER GAME */}
          {activeGame === "2048" && (
            <div className="flex flex-col items-center">
              <div className="flex justify-between w-full max-w-xs mb-4 text-xs font-mono text-slate-400">
                <span>Score: {score2048}</span>
                <button onClick={start2048Game} className="text-cyan-400 hover:underline">
                  New Game
                </button>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-4 gap-2 w-64 h-64">
                {board2048.map((row, r) =>
                  row.map((val, c) => (
                    <div
                      key={`${r}-${c}`}
                      className="rounded-lg bg-slate-900 border border-slate-800/40 flex items-center justify-center text-xs font-bold text-white font-mono"
                      style={{
                        backgroundColor: val > 0 ? `rgba(6, 182, 212, ${Math.min(0.8, val / 1024)})` : undefined,
                      }}
                    >
                      {val > 0 ? val : ""}
                    </div>
                  ))
                )}
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => move2048("left")}
                  className="px-3 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white rounded text-xs font-mono cursor-pointer"
                >
                  ◀ Geser Merge
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Mini Games Leaderboard (4 cols) */}
      <div className="lg:col-span-4 space-y-6">
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950/40 backdrop-blur-xl">
          <h3 className="text-sm font-mono uppercase tracking-widest text-cyan-400 mb-4 flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-cyan-400" /> Leaderboard Rankings
          </h3>

          <div className="space-y-4">
            {leaderboardUsers.map((lbUser, i) => (
              <div key={i} className="flex justify-between items-center py-2.5 border-b border-slate-900/40 last:border-0">
                <div className="flex gap-3 items-center">
                  <span className="text-xs font-mono text-slate-500">#{i + 1}</span>
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-900 border border-slate-800">
                    <img src={lbUser.avatar} alt={lbUser.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">{lbUser.name}</span>
                    <span className="text-xxs font-mono text-slate-500 uppercase">Lv. {lbUser.level} {lbUser.role}</span>
                  </div>
                </div>

                <span className="text-xs font-mono text-cyan-400 font-bold">{lbUser.points} Pts</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
