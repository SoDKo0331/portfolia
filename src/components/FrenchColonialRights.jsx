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
    question: "Францын урлагийн бүтээлүүд эзлэн туух, бахархалд хэн нэгэн үндсэнийг нь барьж байсан уу?",
    options: [
      "Францын засгийн газар",
      "Музейн захирал",
      "Хэн нэгэн үүнийг зогсоохыг оролдсон",
      "Олон улсын байгууллага"
    ],
    correct: 2,
    image: "⚔️",
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
  }
];

export default function ArtHistoryQuiz() {
  const [gameState, setGameState] = useState('lobby'); // lobby, playing, results
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [answers, setAnswers] = useState([]);
  const [showCorrect, setShowCorrect] = useState(false);

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0 && !showCorrect) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showCorrect) {
      handleTimeout();
    }
  }, [timeLeft, gameState, showCorrect]);

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
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setTimeLeft(20);
      setShowCorrect(false);
    } else {
      setGameState('results');
    }
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
                <p className="text-white font-bold">20 секунд</p>
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
                      <p className="text-white font-semibold">Зураг {idx + 1}</p>
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
        {/* Header */}
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

        {/* Timer */}
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

        {/* Question */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 mb-6 border-2 border-white/20">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">{question.image}</div>
            <h3 className="text-2xl md:text-3xl font-bold text-white leading-relaxed">
              {question.question}
            </h3>
          </div>
        </div>

        {/* Answers */}
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
