import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Globe, Users, Scale, TrendingUp, Flag, Award } from 'lucide-react';

const ColonialRightsStory = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showAnimation, setShowAnimation] = useState(true);

  // Колонийн эзэмшлийн өгөгдөл
  const colonialPowers = [
    { name: 'Их Британи', area: 33.0, population: 458, flag: '🇬🇧' },
    { name: 'Франц', area: 12.3, population: 65, flag: '🇫🇷' },
    { name: 'Бельги', area: 2.4, population: 15, flag: '🇧🇪' },
    { name: 'Португал', area: 2.1, population: 13, flag: '🇵🇹' },
    { name: 'Нидерланд', area: 2.0, population: 66, flag: '🇳🇱' },
    { name: 'Япон', area: 0.3, population: 32, flag: '🇯🇵' }
  ];

  // Эрхийн радар диаграм
  const rightsRadar = [
    { право: 'Засаглал', хязгаарлалт: 95, хэрэгтэй: 100 },
    { право: 'Шүүх', хязгаарлалт: 85, хэрэгтэй: 100 },
    { право: 'Хөдөлмөр', хязгаарлалт: 80, хэрэгтэй: 100 },
    { право: 'Боловсрол', хязгаарлалт: 75, хэрэгтэй: 100 },
    { право: 'Эдийн засаг', хязгаарлалт: 70, хэрэгтэй: 100 },
    { право: 'Хувь хүн', хязгаарлалт: 65, хэрэгтэй: 100 }
  ];

  // Эсэргүүцлийн хөдөлгөөн
  const resistanceData = [
    { year: '1919', events: 12, цэг: '⚫' },
    { year: '1922', events: 18, цэг: '🔵' },
    { year: '1925', events: 24, цэг: '🟡' },
    { year: '1928', events: 31, цэг: '🟠' },
    { year: '1930', events: 45, цэг: '🔴' },
    { year: '1933', events: 52, цэг: '🔴' },
    { year: '1936', events: 68, цэг: '🔴' },
    { year: '1939', events: 89, цэг: '🔴' }
  ];

  // Хүн амын ангилал
  const populationStatus = [
    { name: 'Колончлогдсон', value: 750, percent: 32, emoji: '⛓️' },
    { name: 'Хагас колони', value: 400, percent: 17, emoji: '🔗' },
    { name: 'Мандат газар', value: 120, percent: 5, emoji: '📋' },
    { name: 'Тусгаар тогтносон', value: 1080, percent: 46, emoji: '🗽' }
  ];

  const COLORS = ['#ef4444', '#f97316', '#facc15', '#22c55e'];
  const GRADIENT_COLORS = [
    'from-red-500 to-pink-500',
    'from-orange-500 to-yellow-500',
    'from-yellow-500 to-lime-500',
    'from-green-500 to-emerald-500'
  ];

  const slides = [
    // СЛАЙД 1: Эхлэл - Дэлхийн зураг
    <div key="slide0" className="space-y-8 animate-fade-in">
      <div className="text-center mb-12">
        <div className="text-8xl mb-6 animate-bounce">🌍</div>
        <h1 className="text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          1919-1939
        </h1>
        <h2 className="text-4xl font-bold text-gray-800 mb-3">
          Колони ард түмнүүдийн эрх
        </h2>
        <p className="text-2xl text-gray-600">Дэлхийн түүхийн нэг хэсэг 📖</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-2xl shadow-xl transform hover:scale-105 transition-all">
          <div className="text-white text-center">
            <Globe className="w-16 h-16 mx-auto mb-4" />
            <div className="text-5xl font-bold mb-2">750 сая</div>
            <div className="text-xl opacity-90">Хүн ам</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-8 rounded-2xl shadow-xl transform hover:scale-105 transition-all">
          <div className="text-white text-center">
            <Scale className="w-16 h-16 mx-auto mb-4" />
            <div className="text-5xl font-bold mb-2">6</div>
            <div className="text-xl opacity-90">Их гүрэн</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-8 rounded-2xl shadow-xl transform hover:scale-105 transition-all">
          <div className="text-white text-center">
            <Flag className="w-16 h-16 mx-auto mb-4" />
            <div className="text-5xl font-bold mb-2">32%</div>
            <div className="text-xl opacity-90">Дэлхий</div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 p-8 rounded-2xl mt-8">
        <p className="text-2xl text-center font-semibold text-gray-700">
          Дэлхийн гуравны нэг хэсэг <span className="text-4xl">🌏🌍🌎</span> колони байсан!
        </p>
      </div>
    </div>,

    // СЛАЙД 2: Колонийн их гүрнүүд
    <div key="slide1" className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-5xl font-bold text-gray-800 mb-2">🏴 Колонийн их гүрнүүд</h2>
        <p className="text-2xl text-gray-600">Хэн дэлхийг эзэмшиж байсан бэ?</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {colonialPowers.map((power, idx) => (
          <div key={idx} className={`bg-gradient-to-br ${GRADIENT_COLORS[idx % 4]} p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all`}>
            <div className="text-center text-white">
              <div className="text-5xl mb-3">{power.flag}</div>
              <div className="text-xl font-bold mb-2">{power.name}</div>
              <div className="text-3xl font-black mb-1">{power.area} сая км²</div>
              <div className="text-lg opacity-90">{power.population} сая хүн</div>
            </div>
          </div>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={colonialPowers}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" style={{ fontSize: '14px', fontWeight: 'bold' }} />
          <YAxis />
          <Tooltip contentStyle={{ fontSize: '16px', fontWeight: 'bold' }} />
          <Bar dataKey="area" fill="#3b82f6" name="Талбай (сая км²)" radius={[10, 10, 0, 0]} />
          <Bar dataKey="population" fill="#ef4444" name="Хүн ам (сая)" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <div className="bg-yellow-100 border-l-8 border-yellow-500 p-6 rounded-lg">
        <p className="text-2xl font-bold text-yellow-800 text-center">
          🔥 Их Британи хамгийн том - Дэлхийн 1/4 хэсгийг эзэмшиж байсан!
        </p>
      </div>
    </div>,

    // СЛАЙД 3: Эрхийн хязгаарлалт - Радар
    <div key="slide2" className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-5xl font-bold text-gray-800 mb-2">⚖️ Эрхүүд хязгаарлагдсан</h2>
        <p className="text-2xl text-gray-600">Колони хүмүүс юунд эрхгүй байсан бэ?</p>
      </div>

      <div className="flex justify-center">
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={rightsRadar}>
            <PolarGrid stroke="#cbd5e1" />
            <PolarAngleAxis dataKey="право" style={{ fontSize: '16px', fontWeight: 'bold' }} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} />
            <Radar name="Хязгаарлалт" dataKey="хязгаарлалт" stroke="#dc2626" fill="#dc2626" fillOpacity={0.6} strokeWidth={3} />
            <Radar name="Хэрэгтэй эрх" dataKey="хэрэгтэй" stroke="#22c55e" fill="#22c55e" fillOpacity={0.2} strokeWidth={2} />
            <Legend wrapperStyle={{ fontSize: '18px', fontWeight: 'bold' }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-red-50 border-4 border-red-300 p-6 rounded-xl">
          <div className="text-center">
            <div className="text-6xl mb-3">🚫</div>
            <div className="text-3xl font-bold text-red-600 mb-2">95%</div>
            <div className="text-lg text-gray-700">Засаглалд оролцох эрхгүй</div>
          </div>
        </div>
        <div className="bg-orange-50 border-4 border-orange-300 p-6 rounded-xl">
          <div className="text-center">
            <div className="text-6xl mb-3">⚖️</div>
            <div className="text-3xl font-bold text-orange-600 mb-2">85%</div>
            <div className="text-lg text-gray-700">Тэгш шүүхийн эрхгүй</div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6 rounded-xl text-white text-center">
        <p className="text-2xl font-bold">
          💔 Өөрсдийн эх оронд өөрсдөө шийдвэр гаргах эрхгүй байсан!
        </p>
      </div>
    </div>,

    // СЛАЙД 4: Хүн амын хуваарилалт
    <div key="slide3" className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-5xl font-bold text-gray-800 mb-2">👥 Дэлхийн хүмүүс</h2>
        <p className="text-2xl text-gray-600">Нийт 2.35 тэрбум хүн ам</p>
      </div>

      <div className="flex justify-center">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={populationStatus}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${percent}%`}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
              style={{ fontSize: '16px', fontWeight: 'bold' }}
            >
              {populationStatus.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ fontSize: '16px', fontWeight: 'bold' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {populationStatus.map((item, idx) => (
          <div key={idx} className={`p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all border-4`} 
               style={{backgroundColor: `${COLORS[idx]}20`, borderColor: COLORS[idx]}}>
            <div className="text-center">
              <div className="text-5xl mb-3">{item.emoji}</div>
              <div className="text-3xl font-bold mb-1" style={{color: COLORS[idx]}}>{item.value}м</div>
              <div className="text-sm font-semibold text-gray-700">{item.name}</div>
              <div className="text-2xl font-bold mt-2" style={{color: COLORS[idx]}}>{item.percent}%</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-xl border-4 border-blue-300">
        <p className="text-2xl font-bold text-center text-gray-800">
          🌟 Дэлхийн хүмүүсийн дөнгөж 46% л чөлөөтэй байсан!
        </p>
      </div>
    </div>,

    // СЛАЙД 5: Эсэргүүцэл өсөж байна!
    <div key="slide4" className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-5xl font-bold text-gray-800 mb-2">✊ Эсэргүүцэл өсөж байна!</h2>
        <p className="text-2xl text-gray-600">Хүмүүс эрхийнхээ төлөө тэмцэж эхэллээ</p>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={resistanceData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" style={{ fontSize: '16px', fontWeight: 'bold' }} />
          <YAxis style={{ fontSize: '16px', fontWeight: 'bold' }} />
          <Tooltip contentStyle={{ fontSize: '18px', fontWeight: 'bold' }} />
          <Line type="monotone" dataKey="events" stroke="#dc2626" strokeWidth={5} 
                dot={{ fill: '#dc2626', r: 8 }} name="Эсэргүүцлийн үйл явдал" />
        </LineChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-red-500 to-pink-500 p-6 rounded-xl shadow-xl text-white text-center transform hover:scale-105 transition-all">
          <TrendingUp className="w-12 h-12 mx-auto mb-3" />
          <div className="text-5xl font-black mb-2">640%</div>
          <div className="text-lg font-semibold">Өсөлт 20 жилд!</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-red-500 p-6 rounded-xl shadow-xl text-white text-center transform hover:scale-105 transition-all">
          <Flag className="w-12 h-12 mx-auto mb-3" />
          <div className="text-5xl font-black mb-2">89</div>
          <div className="text-lg font-semibold">Үйл явдал 1939</div>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-orange-500 p-6 rounded-xl shadow-xl text-white text-center transform hover:scale-105 transition-all">
          <Globe className="w-12 h-12 mx-auto mb-3" />
          <div className="text-5xl font-black mb-2">65+</div>
          <div className="text-lg font-semibold">Улс оронд</div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-100 to-pink-100 border-l-8 border-purple-500 p-6 rounded-lg">
        <p className="text-2xl font-bold text-purple-800 text-center">
          🔥 Хүмүүс эрхийнхээ төлөө илүү хүчтэй тэмцэж эхэллээ!
        </p>
      </div>
    </div>,

    // СЛАЙД 6: Дүгнэлт - Хүчирхэг
    <div key="slide5" className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <div className="text-7xl mb-4">🌈</div>
        <h2 className="text-5xl font-bold text-gray-800 mb-2">Юу сурсан бэ?</h2>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-red-500 to-pink-500 p-8 rounded-2xl shadow-2xl text-white">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">😢</div>
            <h3 className="text-3xl font-bold mb-4">Хэцүү үе байсан</h3>
          </div>
          <div className="space-y-4 text-lg font-semibold">
            <div className="flex items-center gap-3 bg-white bg-opacity-20 p-4 rounded-lg">
              <div className="text-4xl">95%</div>
              <div>Засаглалын эрхгүй</div>
            </div>
            <div className="flex items-center gap-3 bg-white bg-opacity-20 p-4 rounded-lg">
              <div className="text-4xl">750м</div>
              <div>Хүн колончлогдсон</div>
            </div>
            <div className="flex items-center gap-3 bg-white bg-opacity-20 p-4 rounded-lg">
              <div className="text-4xl">32%</div>
              <div>Дэлхий эзэмшигдсэн</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-8 rounded-2xl shadow-2xl text-white">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">💪</div>
            <h3 className="text-3xl font-bold mb-4">Гэхдээ найдвар байсан!</h3>
          </div>
          <div className="space-y-4 text-lg font-semibold">
            <div className="flex items-center gap-3 bg-white bg-opacity-20 p-4 rounded-lg">
              <div className="text-4xl">640%</div>
              <div>Эсэргүүцэл өссөн</div>
            </div>
            <div className="flex items-center gap-3 bg-white bg-opacity-20 p-4 rounded-lg">
              <div className="text-4xl">89</div>
              <div>Том үйл явдал</div>
            </div>
            <div className="flex items-center gap-3 bg-white bg-opacity-20 p-4 rounded-lg">
              <div className="text-4xl">✊</div>
              <div>Хүмүүс тэмцсэн</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-10 rounded-2xl shadow-2xl text-white mt-8">
        <div className="text-center">
          <Award className="w-20 h-20 mx-auto mb-6" />
          <h3 className="text-4xl font-black mb-6">Түүхийн сургамж 📚</h3>
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-5xl font-black mb-2">1945</div>
              <div className="text-lg font-semibold">Дайн дууссан</div>
              <div className="text-sm opacity-90">Колони эцэс эхэллээ</div>
            </div>
            <div>
              <div className="text-5xl font-black mb-2">1960</div>
              <div className="text-lg font-semibold">"Африкийн жил"</div>
              <div className="text-sm opacity-90">17 улс тусгаар тогтнов</div>
            </div>
            <div>
              <div className="text-5xl font-black mb-2">100+</div>
              <div className="text-lg font-semibold">Шинэ улс</div>
              <div className="text-sm opacity-90">Чөлөөлөгдсөн</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-100 border-8 border-yellow-400 p-8 rounded-2xl">
        <p className="text-3xl font-black text-center text-yellow-800">
          🌟 Эрх чөлөө бол бүгдийн хамгийн чухал зүйл! 🌟
        </p>
      </div>
    </div>
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-10 border-4 border-purple-200">
          {slides[currentSlide]}
          
          <div className="flex justify-between items-center mt-10 pt-8 border-t-4 border-purple-200">
            <button
              onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
              disabled={currentSlide === 0}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xl font-bold rounded-xl disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed hover:scale-105 transition-all shadow-lg"
            >
              ⬅️ Өмнөх
            </button>
            
            <div className="flex gap-3">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`transition-all rounded-full ${
                    idx === currentSlide 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-5' 
                      : 'bg-gray-300 w-5 h-5 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
              disabled={currentSlide === slides.length - 1}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl font-bold rounded-xl disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed hover:scale-105 transition-all shadow-lg"
            >
              Дараах ➡️
            </button>
          </div>
          
          <div className="text-center mt-6">
            <span className="text-2xl font-bold text-purple-600 bg-purple-100 px-6 py-3 rounded-full">
              Слайд {currentSlide + 1} / {slides.length} 📄
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ColonialRightsStory;