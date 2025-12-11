import React, { useState, useEffect } from 'react';
import { Trophy, Clock, Users, Star } from 'lucide-react';

const questions = [
  {
    id: 1,
    question: "1939-1940 оны дайны үед Парисын урлагийн ямар байгууллагууд хаагдсан байсан бэ?",
    options: [
      "Музей ба номын сан",
      "Соёлын ордон, театр, концертын танхим, бүжгийн ордон",
      "Зураачдын студи",
      "Урлагийн сургууль"
    ],
    correct: 1,
    image: "🎭",
    timeLimit: 20
  },
  {
    id: 2,
    question: "Лувр музейн ямар алдартай зургуудыг аврахаар хайрцагласан байсан бэ?",
    options: [
      "Да Винчи, Пикассо",
      "Ван Гог, Моне",
      "Рембрандт, Вермер, Рафаэль, Мона Лиза",
      "Микеланджело, Рубенс"
    ],
    correct: 2,
    image: "🖼️",
    timeLimit: 20
  },
  {
    id: 3,
    question: "Германы эзлэн түрэмгийлэл дуусмагц ямар үйл явдал болсон бэ?",
    options: [
      "Бүх зураг устгагдсан",
      "Зургууд Францад буцаж ирсэнгүй",
      "Урлаг амьд хэвээр, Францын соёлын зүрх зогсонги байдалд орсны бэлгэдэл",
      "Музейнүүд хаагдсан хэвээр үлдсэн"
    ],
    correct: 2,
    image: "🏛️",
    timeLimit: 20
  },
  {
    id: 4,
    question: "Францын ямар газар дээр Францын урлаг амьд хэвээр байгаагийн баталгаа байлаа гэж дурдсан бэ?",
    options: [
      "Парис хот",
      "Версаль ордон",
      "Франц улсын эргэн тойронд далд газар",
      "Лондон хот"
    ],
    correct: 2,
    image: "🗺️",
    timeLimit: 20
  },
  {
    id: 5,
    question: "Нацистууд Парисыг эзлэн авсны дараа ямар урлагийн бүтээлийг цагтай уралдан зургуудаа хамгаалсан бэ?",
    options: [
      "Зөвхөн Мона Лизаг",
      "Соёлын их нуулгэлт гэж үзсэн бүх зургуудыг",
      "Францын зургийн төрөлхийг",
      "Европын бүх бүтээлүүдийг"
    ],
    correct: 1,
    image: "🎨",
    timeLimit: 20
  },
  {
    id: 6,
    question: "Парисын хоосон театрын музейд ямар амьтан байсан бэ.",
    options: [
      "Содоо",
      "Нохой",
      "Муур",
      "Хонь"
    ],
    correct: 2,
    image: "🏛️",
    timeLimit: 20
  }
];

export default function ArtHistoryQuiz() {
  const [gameState, setGameState] = useState('lobby');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [answers, setAnswers] = useState([]);
  const [showCorrect, setShowCorrect] = useState(false);
  
  // Mini game states
  const [miniGameType, setMiniGameType] = useState(null);
  const [miniGameCards, setMiniGameCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [fallingItems, setFallingItems] = useState([]);
  const [basketPosition, setBasketPosition] = useState(50);
  const [caughtItems, setCaughtItems] = useState(0);
  const [miniGameScore, setMiniGameScore] = useState(0);
  const [miniGameTime, setMiniGameTime] = useState(15);

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0 && !showCorrect) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showCorrect) {
      handleTimeout();
    }
  }, [timeLeft, gameState, showCorrect]);

  useEffect(() => {
    if (gameState === 'minigame' && miniGameTime > 0) {
      const timer = setTimeout(() => setMiniGameTime(miniGameTime - 1), 1000);
      return () => clearTimeout(timer);
    } else if (gameState === 'minigame' && miniGameTime === 0) {
      continueToNextQuestion();
    }
  }, [miniGameTime, gameState]);

  useEffect(() => {
    if (gameState === 'minigame' && miniGameType === 1 && miniGameTime > 0) {
      const interval = setInterval(() => {
        setFallingItems(prev => {
          const newItems = [...prev];
          if (Math.random() > 0.65 && newItems.length < 4) {
            newItems.push({
              id: Date.now() + Math.random(),
              emoji: ['🎨', '🖼️', '🏛️', '🎭', '🗿', '✨'][Math.floor(Math.random() * 6)],
              x: Math.random() * 80 + 10,
              y: 0
            });
          }
          return newItems.map(item => ({
            ...item,
            y: item.y + 2.5
          })).filter(item => {
            if (item.y > 82 && Math.abs(item.x - basketPosition) < 10) {
              setCaughtItems(c => c + 1);
              setMiniGameScore(s => s + 150);
              return false;
            }
            return item.y < 100;
          });
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [gameState, miniGameType, basketPosition, miniGameTime]);

  const startGame = () => {
    setGameState('playing');
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    setTimeLeft(20);
    setSelectedAnswer(null);
    setShowCorrect(false);
  };

  const handleTimeout = () => {
    setShowCorrect(true);
    setTimeout(() => {
      nextQuestion();
    }, 3000);
  };

  const handleAnswer = (index) => {
    if (selectedAnswer !== null || showCorrect) return;
    
    setSelectedAnswer(index);
    const isCorrect = index === questions[currentQuestion].correct;
    const points = isCorrect ? Math.max(500, 1000 - (20 - timeLeft) * 25) : 0;
    
    if (isCorrect) {
      setScore(score + points);
    }
    
    setAnswers([...answers, { 
      question: currentQuestion, 
      correct: isCorrect,
      points: points 
    }]);
    
    setShowCorrect(true);
    
    setTimeout(() => {
      nextQuestion();
    }, 3000);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setGameState('minigame');
      initMiniGame();
    } else {
      setGameState('results');
    }
  };

  const initMiniGame = () => {
    const gameType = Math.floor(Math.random() * 2);
    setMiniGameType(gameType);
    setMiniGameTime(15);
    setMiniGameScore(0);
    
    if (gameType === 0) {
      const cards = ['🎨', '🖼️', '🏛️', '🎭'];
      const doubled = [...cards, ...cards].sort(() => Math.random() - 0.5);
      setMiniGameCards(doubled.map((emoji, i) => ({ id: i, emoji })));
      setFlippedCards([]);
      setMatchedCards([]);
    } else {
      setFallingItems([]);
      setCaughtItems(0);
      setBasketPosition(50);
    }
  };

  const continueToNextQuestion = () => {
    setScore(score + miniGameScore);
    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswer(null);
    setTimeLeft(20);
    setShowCorrect(false);
    setGameState('playing');
  };

  const handleCardClick = (id) => {
    if (flippedCards.length === 2 || matchedCards.includes(id) || flippedCards.includes(id)) return;
    
    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);
    
    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (miniGameCards[first].emoji === miniGameCards[second].emoji) {
        setMatchedCards([...matchedCards, first, second]);
        setMiniGameScore(miniGameScore + 300);
        setFlippedCards([]);
        
        if (matchedCards.length + 2 === miniGameCards.length) {
          setTimeout(() => continueToNextQuestion(), 1000);
        }
      } else {
        setTimeout(() => setFlippedCards([]), 800);
      }
    }
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setBasketPosition(Math.max(5, Math.min(95, x)));
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((touch.clientX - rect.left) / rect.width) * 100;
    setBasketPosition(Math.max(5, Math.min(95, x)));
  };

  const getButtonColor = (index) => {
    if (!showCorrect) {
      return selectedAnswer === index 
        ? 'bg-blue-600 border-blue-400' 
        : 'bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700';
    }
    
    if (index === questions[currentQuestion].correct) {
      return 'bg-green-600 border-green-400';
    }
    
    if (selectedAnswer === index && index !== questions[currentQuestion].correct) {
      return 'bg-red-600 border-red-400';
    }
    
    return 'bg-gray-600 border-gray-500 opacity-50';
  };

  if (gameState === 'lobby') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="text-center space-y-8 max-w-2xl">
          <div className="animate-bounce">
            <div className="text-8xl mb-4">🎨</div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            Урлагийн Түүх
          </h1>
          <p className="text-2xl text-blue-200 mb-8">
            Дэлхийн 2-р дайны үеийн Францын урлаг
          </p>
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border-2 border-white/20">
            <div className="flex items-center justify-center gap-8 mb-6 flex-wrap">
              <div className="text-center">
                <Users className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <p className="text-white font-bold">Нэг тоглогч</p>
              </div>
              <div className="text-center">
                <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <p className="text-white font-bold">{questions.length} асуулт</p>
              </div>
              <div className="text-center">
                <Clock className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <p className="text-white font-bold">+ Бонус</p>
              </div>
            </div>
            <button
              onClick={startGame}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold text-2xl py-6 px-12 rounded-2xl transform hover:scale-105 transition-all shadow-2xl"
            >
              🚀 ТОГЛООМ ЭХЛҮҮЛЭХ
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'minigame') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-4xl w-full border-2 border-white/20">
          <div className="flex justify-between items-center mb-6">
            <div className="text-center flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                🎮 Бонус тоглоом!
              </h2>
              <p className="text-yellow-400 text-lg">Нэмэлт оноо цуглуулаарай</p>
            </div>
            <div className="bg-yellow-400/20 rounded-2xl px-6 py-3 border-2 border-yellow-400">
              <p className="text-yellow-400 text-sm">Хугацаа</p>
              <p className="text-white text-3xl font-bold">{miniGameTime}с</p>
            </div>
          </div>

          <div className="text-center mb-6">
            <div className="inline-block bg-white/10 rounded-2xl px-8 py-4 border border-white/20">
              <p className="text-white text-sm mb-1">Бонус оноо</p>
              <p className="text-yellow-400 text-4xl font-bold">+{miniGameScore}</p>
            </div>
          </div>

          {miniGameType === 0 ? (
            <div>
              <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl p-4 mb-6 border border-pink-500/30">
                <p className="text-white text-center text-lg font-semibold">
                  🎴 Хос олох - Ижил хөзрийг олоорой! (+300 оноо)
                </p>
              </div>
              <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
                {miniGameCards.map((card) => (
                  <button
                    key={card.id}
                    onClick={() => handleCardClick(card.id)}
                    disabled={matchedCards.includes(card.id)}
                    className={`aspect-square rounded-2xl text-5xl flex items-center justify-center transform transition-all duration-300 ${
                      flippedCards.includes(card.id) || matchedCards.includes(card.id)
                        ? 'bg-gradient-to-br from-green-400 to-emerald-600 scale-105 rotate-0'
                        : 'bg-gradient-to-br from-blue-500 to-purple-600 hover:scale-105 hover:rotate-3'
                    } shadow-xl border-2 border-white/30 disabled:opacity-100`}
                  >
                    {flippedCards.includes(card.id) || matchedCards.includes(card.id) ? (
                      <span className="animate-bounce">{card.emoji}</span>
                    ) : (
                      '❓'
                    )}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl p-4 mb-6 border border-blue-500/30">
                <p className="text-white text-center text-lg font-semibold">
                  🎯 Урлаг барих - Унаж буй зүйлсийг барь! ({caughtItems} барьсан, +150 оноо)
                </p>
              </div>
              <div 
                className="relative bg-gradient-to-b from-blue-900/50 to-purple-900/50 rounded-3xl h-96 overflow-hidden cursor-none border-4 border-white/20 shadow-2xl"
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
              >
                {fallingItems.map(item => (
                  <div
                    key={item.id}
                    className="absolute text-4xl transition-all duration-50 drop-shadow-lg"
                    style={{
                      left: `${item.x}%`,
                      top: `${item.y}%`,
                      transform: 'translate(-50%, -50%)',
                      animation: 'spin 2s linear infinite'
                    }}
                  >
                    {item.emoji}
                  </div>
                ))}
                <div
                  className="absolute bottom-4 text-6xl transition-all duration-100 drop-shadow-2xl"
                  style={{
                    left: `${basketPosition}%`,
                    transform: 'translateX(-50%)'
                  }}
                >
                  🧺
                </div>
              </div>
            </div>
          )}

          <button
            onClick={continueToNextQuestion}
            className="w-full mt-6 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white font-bold text-xl py-4 px-8 rounded-2xl transform hover:scale-105 transition-all shadow-xl border-2 border-green-300"
          >
            ⏭️ Үргэлжлүүлэх
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'results') {
    const maxScore = questions.length * 1000;
    const percentage = Math.round((score / maxScore) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-2xl w-full border-2 border-white/20">
          <div className="text-center mb-8">
            <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-4 animate-bounce" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Тоглоом дууслаа!
            </h2>
            <div className="text-6xl font-bold text-yellow-400 my-6">
              {score} оноо
            </div>
            <p className="text-2xl text-blue-200">
              {percentage}% зөв хариулт
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {questions.map((q, idx) => {
              const answer = answers.find(a => a.question === idx);
              return (
                <div key={idx} className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">
                      {answer?.correct ? '✅' : '❌'}
                    </span>
                    <div className="flex-1">
                      <p className="text-white font-semibold">Асуулт {idx + 1}</p>
                      {answer && (
                        <p className="text-yellow-400 text-sm">
                          +{answer.points} оноо
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={startGame}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold text-xl py-4 px-8 rounded-2xl transform hover:scale-105 transition-all"
          >
            🔄 Дахин тоглох
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/20">
            <p className="text-white text-sm">Асуулт {currentQuestion + 1}/{questions.length}</p>
            <div className="w-48 h-2 bg-white/20 rounded-full mt-2">
              <div 
                className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/20">
            <p className="text-yellow-400 text-2xl font-bold">⭐ {score}</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-6 border border-white/20">
          <div className="flex items-center justify-between">
            <Clock className="w-8 h-8 text-white" />
            <div className="flex-1 mx-4">
              <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${
                    timeLeft > 10 ? 'bg-green-500' : timeLeft > 5 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${(timeLeft / 20) * 100}%` }}
                />
              </div>
            </div>
            <span className="text-white text-2xl font-bold w-12 text-center">
              {timeLeft}
            </span>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 mb-6 border-2 border-white/20">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">{question.image}</div>
            <h3 className="text-2xl md:text-3xl font-bold text-white leading-relaxed">
              {question.question}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={selectedAnswer !== null || showCorrect}
              className={`${getButtonColor(index)} text-white font-bold text-lg md:text-xl p-6 rounded-2xl transform hover:scale-105 transition-all border-2 shadow-xl disabled:cursor-not-allowed`}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl bg-white/20 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-left">{option}</span>
              </div>
            </button>
          ))}
        </div>

        {showCorrect && (
          <div className="mt-6 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 animate-pulse">
            <p className="text-white text-xl text-center">
              {selectedAnswer === question.correct ? (
                <span className="text-green-400 font-bold">✅ Зөв! +{answers[answers.length - 1]?.points} оноо</span>
              ) : selectedAnswer !== null ? (
                <span className="text-red-400 font-bold">❌ Буруу хариулт</span>
              ) : (
                <span className="text-yellow-400 font-bold">⏰ Хугацаа дууслаа</span>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
