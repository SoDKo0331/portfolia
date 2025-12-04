import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, AreaChart, Area } from 'recharts';
import { Globe, Users, Home, TrendingDown, AlertCircle, CheckCircle, Lock, Unlock, Sparkles, Award, Brain, Target } from 'lucide-react';

const FrenchColonialPuzzle = () => {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState({});
  const [totalScore, setTotalScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showHint, setShowHint] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [isTimerActive, setIsTimerActive] = useState(false);

  useEffect(() => {
    if (isTimerActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      checkAnswer(currentPuzzleData.id, true);
    }
  }, [timeLeft, isTimerActive]);

  const coloniesByRegion = [
    { region: 'Африк', count: 9, colonies: ['Алжир', 'Марокко', 'Тунис', 'Баруун Африк', 'Төв Африк', 'Камерун', 'Мадагаскар'], emoji: '🌍', color: 'from-amber-500 to-orange-600' },
    { region: 'Ази', count: 3, colonies: ['Индочин', 'Сири ба Ливан', 'Францын Энэтхэг'], emoji: '🌏', color: 'from-red-500 to-pink-600' },
    { region: 'Америк', count: 4, colonies: ['Гваделупе', 'Мартиник', 'Францын Гвиана', 'Сэнт-Пьер'], emoji: '🌎', color: 'from-green-500 to-emerald-600' },
    { region: 'Далайн арлууд', count: 3, colonies: ['Шинэ Каледони', 'Францын Полинези', 'Шинэ-Гебрид'], emoji: '🏝️', color: 'from-blue-500 to-cyan-600' }
  ];

  const populationData = [
    { category: 'Иргэншилтэй', value: 2.7, percent: 3.9, color: '#22c55e', emoji: '✅' },
    { category: 'Иргэншилгүй', value: 66.4, percent: 96.1, color: '#ef4444', emoji: '❌' }
  ];

  const rightsComparison = [
    { category: 'Сонгох эрх', colonized: 4, metropole: 100, gap: 96 },
    { category: 'Засаглал', colonized: 5, metropole: 100, gap: 95 },
    { category: 'Шүүхийн тэгш байдал', colonized: 10, metropole: 100, gap: 90 },
    { category: 'Эдийн засгийн эрх', colonized: 1, metropole: 100, gap: 99 },
    { category: 'Боловсролын эрх', colonized: 8, metropole: 100, gap: 92 },
    { category: 'Хөдөлгөөний эрх', colonized: 15, metropole: 100, gap: 85 }
  ];

  const livingConditionsDetailed = [
    { indicator: 'Орон байр', value: 30, needed: 100 },
    { indicator: 'Эрүүл мэнд', value: 15, needed: 100 },
    { indicator: 'Боловсрол', value: 8, needed: 100 },
    { indicator: 'Хоол хүнс', value: 45, needed: 100 },
    { indicator: 'Цэвэр ус', value: 20, needed: 100 },
    { indicator: 'Ажлын эрх', value: 1, needed: 100 }
  ];

  const timelineData = [
    { year: '1919', colonies: 19, population: 65, resistance: 12 },
    { year: '1925', colonies: 19, population: 66, resistance: 28 },
    { year: '1930', colonies: 19, population: 68, resistance: 45 },
    { year: '1936', colonies: 19, population: 69.1, resistance: 68 },
    { year: '1939', colonies: 19, population: 70, resistance: 89 }
  ];

  const COLORS = ['#22c55e', '#ef4444', '#f59e0b', '#3b82f6', '#8b5cf6', '#ec4899'];

  const puzzles = [
    {
      id: 1,
      title: '🗺️ Газар зүйн асуулт',
      question: '1936 онд Францын колониудын НИЙТ ТАЛБАЙ дэлхийн хэдэн хувийг эзэлж байсан бэ?',
      type: 'multiple-choice',
      difficulty: 'хүнд',
      timeLimit: 45,
      options: ['2.4% (Дэлхийн 1/42)', '8.1% (Дэлхийн 1/12)', '16.7% (Дэлхийн 1/6)', '33.2% (Дэлхийн 1/3)'],
      correctAnswer: '8.1% (Дэлхийн 1/12)',
      hint: '12.3 сая км² талбайтай байсан. Дэлхийн газрын нийт талбай нь 149 сая км².',
      explanation: 'Франц 12.3 сая км² талбайтай колонитой байсан. Энэ нь дэлхийн газрын талбайн 8.1%, буюу ойролцоогоор 1/12 хэсэг юм. Африкийн 9 колони, Азийн 3 колони, Америкийн 4 газар, Далайн 3 арал багтана.',
      points: 15,
      visual: (
        <div className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            {coloniesByRegion.map((region, idx) => (
              <div key={idx} className={`bg-gradient-to-br ${region.color} p-6 rounded-2xl text-white transform hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-3xl cursor-pointer`}>
                <div className="text-center">
                  <div className="text-6xl mb-3 animate-bounce">{region.emoji}</div>
                  <div className="text-xl font-bold mb-2 opacity-90">{region.region}</div>
                  <div className="text-5xl font-black mb-1">{region.count}</div>
                  <div className="text-sm opacity-80 font-semibold">колони</div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 p-8 rounded-2xl shadow-2xl">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={coloniesByRegion}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.9}/>
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0.9}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff40" />
                <XAxis dataKey="region" stroke="#fff" style={{ fontSize: '14px', fontWeight: 'bold' }} />
                <YAxis stroke="#fff" style={{ fontSize: '14px', fontWeight: 'bold' }} />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold' }} />
                <Bar dataKey="count" fill="url(#colorCount)" radius={[15, 15, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: '👥 Иргэншлийн асуулт',
      question: 'Францын колониудад иргэншилтэй болохын тулд колони хүмүүс юу хийх ёстой байсан бэ? (Assimilation бодлого)',
      type: 'multiple-choice',
      difficulty: 'хүнд',
      timeLimit: 50,
      options: [
        'Францын хэл сурах л хангалттай',
        'Францад 5 жил амьдрах',
        'Францын хэл, соёл, шашин, хууль хүлээн зөвшөөрч, өөрийн соёлоос татгалзах',
        'Францын цэргийн алба хаах'
      ],
      correctAnswer: 'Францын хэл, соёл, шашин, хууль хүлээн зөвшөөрч, өөрийн соёлоос татгалзах',
      hint: '"Mission civilisatrice" гэсэн үзэл санаа - соёлжуулах эрхэм зорилго гэж нэрлэгддэг байсан.',
      explanation: 'Assimilation (ассимиляци) бодлогын дагуу колони хүмүүс Францын хэл, соёл, шашин, хуулийг бүрэн хүлээн зөвшөөрч, өөрийн угсаатны соёл, хэл, уламжлалаас БҮРЭН татгалзах ёстой байв. Гэхдээ энэ хэцүү шаардлагыг хангасан ч зөвхөн 2.7 сая (3.9%) хүн л иргэншил авч чадсан.',
      points: 20,
      visual: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="relative overflow-hidden bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700 p-10 rounded-3xl text-white shadow-2xl transform hover:scale-105 transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
              <div className="relative text-center">
                <div className="text-7xl mb-4 animate-pulse">✅</div>
                <div className="text-6xl font-black mb-3">2.7 сая</div>
                <div className="text-2xl font-bold mb-2">Иргэншилтэй</div>
                <div className="text-4xl font-black text-green-200">3.9%</div>
              </div>
            </div>
            <div className="relative overflow-hidden bg-gradient-to-br from-red-500 via-pink-600 to-rose-700 p-10 rounded-3xl text-white shadow-2xl transform hover:scale-105 transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
              <div className="relative text-center">
                <div className="text-7xl mb-4 animate-pulse">❌</div>
                <div className="text-6xl font-black mb-3">66.4 сая</div>
                <div className="text-2xl font-bold mb-2">Иргэншилгүй</div>
                <div className="text-4xl font-black text-red-200">96.1%</div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-2xl shadow-xl">
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <defs>
                  <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.3"/>
                  </filter>
                </defs>
                <Pie
                  data={populationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, percent }) => `${category}: ${percent}%`}
                  outerRadius={140}
                  fill="#8884d8"
                  dataKey="value"
                  style={{ fontSize: '16px', fontWeight: 'bold', filter: 'url(#shadow)' }}
                  animationDuration={1000}
                >
                  {populationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={3} stroke="#fff" />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '12px', fontSize: '18px', fontWeight: 'bold' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: '⚖️ Эрхийн харьцуулалт',
      question: 'Францад амьдарч байсан ФРАНЦЫН ИРГЭН болон колони дахь КОЛОНИ ИРГЭНий сонгох эрхийн ЗӨРҮҮ хэдэн хувь байсан бэ?',
      type: 'multiple-choice',
      difficulty: 'дунд',
      timeLimit: 40,
      options: ['50-60% зөрүү', '70-80% зөрүү', '85-90% зөрүү', '96% зөрүү'],
      correctAnswer: '96% зөрүү',
      hint: 'Францад амьдарч байсан иргэд 100% сонгох эрхтэй, колони иргэд 4% эрхтэй.',
      explanation: 'Францад амьдарч байсан Францын иргэд 100% сонгох эрхтэй байсан бол, колони дахь хүмүүсийн зөвхөн 4% л сонгох эрхтэй байв. Энэ нь 96 хувийн асар том зөрүү юм. Мөн засаглалд оролцох (95% зөрүү), шүүхийн тэгш байдал (90% зөрүү), эдийн засгийн эрх (99% зөрүү) зэрэгт ч томоохон ялгаатай байсан.',
      points: 15,
      visual: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 p-8 rounded-3xl shadow-2xl">
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={rightsComparison.map(r => ({...r, Колони: r.colonized, Франц: r.metropole}))}>
                <PolarGrid stroke="#ffffff40" strokeWidth={2} />
                <PolarAngleAxis dataKey="category" stroke="#fff" style={{ fontSize: '14px', fontWeight: 'bold' }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#fff" />
                <Radar name="Колони дахь эрх" dataKey="Колони" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} strokeWidth={3} />
                <Radar name="Францын эрх" dataKey="Франц" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} strokeWidth={3} />
                <Legend wrapperStyle={{ fontSize: '16px', fontWeight: 'bold', color: '#fff' }} />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-red-500 to-red-700 p-6 rounded-2xl text-white text-center shadow-xl transform hover:scale-105 transition-all">
              <Lock className="w-16 h-16 mx-auto mb-3" />
              <div className="text-5xl font-black mb-2">96%</div>
              <div className="text-lg font-bold">Сонгох эрхийн зөрүү</div>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-700 p-6 rounded-2xl text-white text-center shadow-xl transform hover:scale-105 transition-all">
              <Lock className="w-16 h-16 mx-auto mb-3" />
              <div className="text-5xl font-black mb-2">95%</div>
              <div className="text-lg font-bold">Засаглалын зөрүү</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-700 p-6 rounded-2xl text-white text-center shadow-xl transform hover:scale-105 transition-all">
              <Lock className="w-16 h-16 mx-auto mb-3" />
              <div className="text-5xl font-black mb-2">99%</div>
              <div className="text-lg font-bold">Эдийн засгийн зөрүү</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: '💼 Хөдөлмөрийн нөхцөл',
      question: 'Колони дахь "corvée" (корве) буюу албадан хөдөлмөрийн тогтолцооны дагуу колони эрэгтэйчүүд жилд дунджаар ХЭДЭН ӨДӨР үнэ төлбөргүй хүчээр ажиллуулагддаг байсан бэ?',
      type: 'multiple-choice',
      difficulty: 'маш хүнд',
      timeLimit: 55,
      options: ['15-30 өдөр', '45-60 өдөр', '90-120 өдөр', '180+ өдөр (жилийн тал)'],
      correctAnswer: '90-120 өдөр',
      hint: '3-4 сар орчим. Энэ нь тариалангийн улирлын ихэнх хугацааг эзэлдэг байв.',
      explanation: 'Corvée (корве) буюу албадан хөдөлмөрийн тогтолцооны дагуу эрэгтэйчүүд жилд дунджаар 90-120 хоног (3-4 сар) үнэ төлбөргүй хүчээр ажиллуулагддаг байсан. Зам, гүүр, барилга байгууламж барих, тариалан эрхлэх гэх мэт ажлууд явуулдаг байв. Энэ нь өөрсдийн тариалан, ам гэр асрах цагийг ихээхэн хомсдуулдаг байв.',
      points: 25,
      visual: (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black p-10 rounded-3xl shadow-2xl text-white">
            <div className="text-center mb-8">
              <AlertCircle className="w-24 h-24 mx-auto mb-6 text-red-400 animate-pulse" />
              <div className="text-7xl font-black mb-4 text-red-400">99%</div>
              <div className="text-3xl font-bold mb-2">Цалингүй хүчээр хөдөлмөр</div>
              <div className="text-xl opacity-80">Зөвхөн 1%-с бага хүн цалинтай байсан</div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-red-600 to-orange-600 p-8 rounded-2xl shadow-xl">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={[
                { category: 'Цалинтай', value: 1 },
                { category: 'Цалингүй албадан', value: 99 }
              ]}>
                <defs>
                  <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#dc2626" stopOpacity={0.9}/>
                    <stop offset="95%" stopColor="#dc2626" stopOpacity={0.4}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff40" />
                <XAxis dataKey="category" stroke="#fff" style={{ fontSize: '16px', fontWeight: 'bold' }} />
                <YAxis stroke="#fff" style={{ fontSize: '16px', fontWeight: 'bold' }} />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '12px', fontSize: '18px', fontWeight: 'bold' }} />
                <Area type="monotone" dataKey="value" stroke="#dc2626" fill="url(#colorArea)" strokeWidth={4} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-red-100 border-4 border-red-600 p-8 rounded-2xl text-center transform hover:scale-105 transition-all">
              <div className="text-6xl mb-4">⛓️</div>
              <div className="text-5xl font-black text-red-700">99%</div>
              <div className="text-xl font-bold text-gray-800 mt-2">Албадан хөдөлмөр</div>
            </div>
            <div className="bg-green-100 border-4 border-green-600 p-8 rounded-2xl text-center transform hover:scale-105 transition-all">
              <div className="text-6xl mb-4">💰</div>
              <div className="text-5xl font-black text-green-700">&lt;1%</div>
              <div className="text-xl font-bold text-gray-800 mt-2">Цалинтай ажил</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: '🏚️ Амьдрах нөхцлийн үнэлгээ',
      question: 'Баруун Африкийн колони дахь (A.O.F.) ЯДУУ ХҮМҮҮСИЙН хувьд дараах аль нь ХАМГИЙН ӨНДӨР хүртээмжтэй байсан бэ?',
      type: 'multiple-choice',
      difficulty: 'маш хүнд',
      timeLimit: 60,
      options: [
        'Орон байр (байнгын орон сууц)',
        'Хоол хүнс (өдөр тутмын хоол)',
        'Цэвэр ус (ундны ус)',
        'Эрүүл мэндийн үйлчилгээ'
      ],
      correctAnswer: 'Хоол хүнс (өдөр тутмын хоол)',
      hint: 'Хүмүүс өөрсдөө тариалан эрхэлж, ан агнаж, түүж цуглуулж байв.',
      explanation: 'Хоол хүнс (~45% хүртээмж) нь хамгийн өндөр байсан, учир нь хүмүүс өөрсдөө тариалан эрхлэх, ан агнах, түүж цуглуулах замаар өөрсдийгөө тэжээдэг байв. Гэвч байнгын орон сууц (30%), цэвэр ус (20%), эрүүл мэндийн үйлчилгээ (15%), боловсрол (8%), ажлын эрх (1%) зэрэг бусад үндсэн хэрэгцээ маш доогуур байв. 60-70% хүн орон байргүй, 30,000 хүн өлсгөлөнд нэрвэгдсэн.',
      points: 25,
      visual: (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 rounded-3xl shadow-2xl">
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={livingConditionsDetailed}>
                <PolarGrid stroke="#ffffff60" strokeWidth={2} />
                <PolarAngleAxis dataKey="indicator" stroke="#fff" style={{ fontSize: '14px', fontWeight: 'bold' }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#fff" />
                <Radar name="Хүртээмж" dataKey="value" stroke="#fbbf24" fill="#fbbf24" fillOpacity={0.7} strokeWidth={4} />
                <Radar name="Хэрэгцээт түвшин" dataKey="needed" stroke="#22c55e" fill="#22c55e" fillOpacity={0.2} strokeWidth={2} />
                <Legend wrapperStyle={{ fontSize: '16px', fontWeight: 'bold' }} />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: '🏠', label: 'Орон байр', value: '30%', color: 'from-red-500 to-red-700' },
              { icon: '🍲', label: 'Хоол хүнс', value: '45%', color: 'from-orange-500 to-orange-700' },
              { icon: '💧', label: 'Цэвэр ус', value: '20%', color: 'from-blue-500 to-blue-700' },
              { icon: '🏥', label: 'Эрүүл мэнд', value: '15%', color: 'from-purple-500 to-purple-700' },
              { icon: '📚', label: 'Боловсрол', value: '8%', color: 'from-pink-500 to-pink-700' },
              { icon: '💼', label: 'Ажлын эрх', value: '1%', color: 'from-gray-600 to-gray-800' }
            ].map((item, idx) => (
              <div key={idx} className={`bg-gradient-to-br ${item.color} p-6 rounded-2xl text-white text-center shadow-xl transform hover:scale-110 transition-all duration-300`}>
                <div className="text-5xl mb-3">{item.icon}</div>
                <div className="text-4xl font-black mb-1">{item.value}</div>
                <div className="text-sm font-bold opacity-90">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 6,
      title: '📈 Түүхэн хөгжил',
      question: '1919-1939 оны хооронд колони ард түмний ЭСЭРГҮҮЦЛИЙН ХӨДӨЛГӨӨНИЙ тоо хэдэн дахин өссөн бэ?',
      type: 'multiple-choice',
      difficulty: 'дунд',
      timeLimit: 45,
      options: ['2-3 дахин', '4-5 дахин', '7-8 дахин', '10+ дахин'],
      correctAnswer: '7-8 дахин',
      hint: '1919 онд 12 том үйл явдал, 1939 онд 89 үйл явдал болсон.',
      explanation: '1919 онд 12 том эсэргүүцлийн үйл явдал байсан бол 1939 он гэхэд 89 болж өссөн. Энэ нь 7.4 дахин өсөлт юм. Колони ард түмнүүд эрх чөлөө, тусгаар тогтнолынхоо төлөө улам эрчимтэй тэмцэж эхэлсэн. Индочины эсэргүүцэл, Алжирын үндэсний хөдөлгөөн, Африкийн олон газар дахь бослого зэрэг үйл явдлууд өрнөж байв.',
      points: 15,
      visual: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-900 via-pink-900 to-red-900 p-8 rounded-3xl shadow-2xl">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={timelineData}>
                <defs>
                  <linearGradient id="colorResistance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.9}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.3}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff30" />
                <XAxis dataKey="year" stroke="#fff" style={{ fontSize: '16px', fontWeight: 'bold' }} />
                <YAxis stroke="#fff" style={{ fontSize: '16px', fontWeight: 'bold' }} />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '12px', fontSize: '18px', fontWeight: 'bold' }} />
                <Line type="monotone" dataKey="resistance" stroke="#f43f5e" strokeWidth={5} 
                      dot={{ fill: '#f43f5e', r: 10, strokeWidth: 3, stroke: '#fff' }} 
                      name="Эсэргүүцлийн үйл явдал"
                      activeDot={{ r: 15 }}
                      fill="url(#colorResistance)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-red-500 to-pink-600 p-8 rounded-2xl shadow-2xl text-white text-center transform hover:scale-110 hover:rotate-2 transition-all duration-300">
              <TrendingDown className="w-16 h-16 mx-auto mb-4 rotate-180" />
              <div className="text-6xl font-black mb-3">7.4×</div>
              <div className="text-xl font-bold">Өсөлт</div>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-red-600 p-8 rounded-2xl shadow-2xl text-white text-center transform hover:scale-110 hover:rotate-2 transition-all duration-300">
              <AlertCircle className="w-16 h-16 mx-auto mb-4" />
              <div className="text-6xl font-black mb-3">89</div>
              <div className="text-xl font-bold">1939 онд</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-500 to-orange-600 p-8 rounded-2xl shadow-2xl text-white text-center transform hover:scale-110 hover:rotate-2 transition-all duration-300">
              <Globe className="w-16 h-16 mx-auto mb-4" />
              <div className="text-6xl font-black mb-3">65+</div>
              <div className="text-xl font-bold">Улс оронд</div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const handleAnswer = (puzzleId, answer) => {
    setUserAnswers({ ...userAnswers, [puzzleId]: answer });
  };

  const checkAnswer = (puzzleId, timeExpired = false) => {
    const puzzle = puzzles.find(p => p.id === puzzleId);
    const isCorrect = userAnswers[puzzleId] === puzzle.correctAnswer && !timeExpired;
    
    if (isCorrect && !showResults[puzzleId]) {
      const timeBonus = timeLeft > 10 ? 5 : 0;
      setTotalScore(totalScore + puzzle.points + timeBonus);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
    
    setShowResults({ ...showResults, [puzzleId]: true });
    setIsTimerActive(false);
  };

  const useHint = (puzzleId) => {
    if (!showHint[puzzleId]) {
      setShowHint({ ...showHint, [puzzleId]: true });
      setTotalScore(Math.max(0, totalScore - 5));
    }
  };

  const resetPuzzle = () => {
    setUserAnswers({});
    setShowResults({});
    setShowHint({});
    setTotalScore(0);
    setStreak(0);
    setCurrentPuzzle(0);
    setTimeLeft(null);
    setIsTimerActive(false);
  };

  const startPuzzle = (puzzle) => {
    setTimeLeft(puzzle.timeLimit);
    setIsTimerActive(true);
  };

  useEffect(() => {
    if (!showResults[currentPuzzleData.id] && !isTimerActive) {
      startPuzzle(currentPuzzleData);
    }
  }, [currentPuzzle]);

  const currentPuzzleData = puzzles[currentPuzzle];
  const isAnswered = showResults[currentPuzzleData.id];
  const isCorrect = userAnswers[currentPuzzleData.id] === currentPuzzleData.correctAnswer;
  const maxScore = puzzles.reduce((sum, p) => sum + p.points + 5, 0);
  const progressPercent = (currentPuzzle / puzzles.length) * 100;

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'хүнд': return 'from-orange-500 to-red-600';
      case 'маш хүнд': return 'from-red-600 to-pink-700';
      case 'дунд': return 'from-yellow-500 to-orange-500';
      default: return 'from-green-500 to-emerald-600';
    }
  };

  const getDifficultyIcon = (difficulty) => {
    switch(difficulty) {
      case 'хүнд': return '🔥🔥';
      case 'маш хүнд': return '🔥🔥🔥';
      case 'дунд': return '🔥';
      default: return '⭐';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Толгой хэсэг - Сайжруулсан дизайн */}
        <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-3xl shadow-2xl p-8 mb-8 text-white transform hover:scale-[1.02] transition-all duration-300">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24 animate-pulse" style={{animationDelay: '1s'}}></div>
          
          <div className="relative text-center">
            <div className="text-7xl mb-4 animate-bounce">🇫🇷</div>
            <h1 className="text-5xl md:text-6xl font-black mb-3 drop-shadow-lg">Францын колони</h1>
            <p className="text-2xl md:text-3xl font-bold mb-6 opacity-90">Түүхийн пазл судалгаа 🧩</p>
            <p className="text-xl font-semibold mb-6 opacity-80">1919-1939 оны үе</p>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-xl border-2 border-white border-opacity-30 transform hover:scale-110 transition-all">
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8" />
                  <div>
                    <div className="text-3xl font-black">{totalScore}</div>
                    <div className="text-sm font-semibold opacity-80">Оноо / {maxScore}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white bg-opacity-20 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-xl border-2 border-white border-opacity-30 transform hover:scale-110 transition-all">
                <div className="flex items-center gap-3">
                  <Target className="w-8 h-8" />
                  <div>
                    <div className="text-3xl font-black">{streak}</div>
                    <div className="text-sm font-semibold opacity-80">Дараалсан зөв</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white bg-opacity-20 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-xl border-2 border-white border-opacity-30 transform hover:scale-110 transition-all">
                <div className="flex items-center gap-3">
                  <Brain className="w-8 h-8" />
                  <div>
                    <div className="text-3xl font-black">{currentPuzzle + 1}/{puzzles.length}</div>
                    <div className="text-sm font-semibold opacity-80">Асуулт</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-6 bg-white bg-opacity-20 rounded-full h-4 overflow-hidden backdrop-blur-sm">
              <div 
                className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-500 rounded-full shadow-lg"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Пазлын агуулга - Сайжруулсан дизайн */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl p-8 md:p-10 border-4 border-purple-500">
          {/* Header with timer and difficulty */}
          <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
            <div className={`bg-gradient-to-r ${getDifficultyColor(currentPuzzleData.difficulty)} px-6 py-3 rounded-2xl text-white font-bold text-lg shadow-xl transform hover:scale-110 transition-all`}>
              {getDifficultyIcon(currentPuzzleData.difficulty)} {currentPuzzleData.difficulty.toUpperCase()}
            </div>
            
            {!isAnswered && timeLeft !== null && (
              <div className={`px-8 py-4 rounded-2xl text-white font-black text-2xl shadow-xl animate-pulse ${
                timeLeft < 10 ? 'bg-gradient-to-r from-red-600 to-pink-600' : 'bg-gradient-to-r from-blue-600 to-purple-600'
              }`}>
                ⏱️ {timeLeft}с
              </div>
            )}
            
            <div className="text-white text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 rounded-2xl shadow-xl">
              💎 +{currentPuzzleData.points} оноо
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6 text-center drop-shadow-lg">
              {currentPuzzleData.title}
            </h2>
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-6 md:p-8 rounded-2xl border-4 border-white border-opacity-20 shadow-2xl transform hover:scale-[1.02] transition-all">
              <p className="text-xl md:text-2xl font-bold text-white text-center leading-relaxed">
                {currentPuzzleData.question}
              </p>
            </div>
          </div>

          {/* Визуал */}
          <div className="mb-8">
            {currentPuzzleData.visual}
          </div>

          {/* Hint button */}
          {!isAnswered && !showHint[currentPuzzleData.id] && (
            <div className="text-center mb-6">
              <button
                onClick={() => useHint(currentPuzzleData.id)}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-600 hover:to-orange-600 transform hover:scale-110 transition-all shadow-xl"
              >
                💡 Hint авах (-5 оноо)
              </button>
            </div>
          )}

          {/* Hint display */}
          {showHint[currentPuzzleData.id] && !isAnswered && (
            <div className="mb-6 bg-gradient-to-r from-yellow-500 to-orange-500 p-6 rounded-2xl border-4 border-yellow-300 shadow-xl animate-pulse">
              <p className="text-xl font-bold text-white text-center">
                💡 {currentPuzzleData.hint}
              </p>
            </div>
          )}

          {/* Хариултын сонголтууд - Сайжруулсан */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
            {currentPuzzleData.options.map((option, idx) => {
              const isSelected = userAnswers[currentPuzzleData.id] === option;
              const isThisCorrect = option === currentPuzzleData.correctAnswer;
              
              let buttonClass = 'bg-gradient-to-br from-slate-700 to-slate-800 text-white border-4 border-slate-600 hover:from-slate-600 hover:to-slate-700';
              let iconDisplay = null;
              
              if (isAnswered) {
                if (isThisCorrect) {
                  buttonClass = 'bg-gradient-to-br from-green-500 to-emerald-700 text-white border-4 border-green-300 shadow-2xl scale-105';
                  iconDisplay = <CheckCircle className="w-8 h-8 inline-block mr-3 animate-bounce" />;
                } else if (isSelected && !isCorrect) {
                  buttonClass = 'bg-gradient-to-br from-red-500 to-pink-700 text-white border-4 border-red-300 shadow-xl opacity-75';
                  iconDisplay = <AlertCircle className="w-8 h-8 inline-block mr-3" />;
                } else {
                  buttonClass = 'bg-gradient-to-br from-slate-700 to-slate-900 text-gray-400 border-4 border-slate-700 opacity-50';
                }
              } else if (isSelected) {
                buttonClass = 'bg-gradient-to-br from-blue-600 to-purple-700 text-white border-4 border-blue-300 shadow-xl scale-105';
                iconDisplay = <Sparkles className="w-8 h-8 inline-block mr-3 animate-spin" />;
              }

              return (
                <button
                  key={idx}
                  onClick={() => !isAnswered && handleAnswer(currentPuzzleData.id, option)}
                  disabled={isAnswered}
                  className={`${buttonClass} p-6 md:p-8 rounded-2xl text-lg md:text-xl font-bold transition-all transform hover:scale-105 disabled:cursor-not-allowed relative overflow-hidden group`}
                >
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
                  <div className="relative flex items-center justify-center">
                    {iconDisplay}
                    <span className="text-left">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Шалгах товч */}
          {!isAnswered && userAnswers[currentPuzzleData.id] && (
            <button
              onClick={() => checkAnswer(currentPuzzleData.id)}
              className="w-full bg-gradient-to-r from-green-500 via-emerald-600 to-green-700 text-white text-2xl md:text-3xl font-black py-6 md:py-8 rounded-2xl hover:from-green-600 hover:to-emerald-800 transition-all transform hover:scale-105 shadow-2xl mb-8 border-4 border-green-300 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <span className="relative">✅ Хариулт шалгах</span>
            </button>
          )}

          {/* Тайлбар - Сайжруулсан */}
          {isAnswered && (
            <div className={`p-8 md:p-10 rounded-2xl border-4 mb-8 shadow-2xl transform transition-all ${
              isCorrect 
                ? 'bg-gradient-to-br from-green-500 to-emerald-700 border-green-300 scale-105' 
                : 'bg-gradient-to-br from-red-500 to-pink-700 border-red-300'
            }`}>
              <div className="text-center mb-6">
                <div className="text-8xl mb-4 animate-bounce">{isCorrect ? '🎉' : '💡'}</div>
                <h3 className="text-3xl md:text-4xl font-black mb-4 text-white drop-shadow-lg">
                  {isCorrect ? `Маш сайн! +${currentPuzzleData.points}${timeLeft > 10 ? '+5' : ''} оноо! 🏆` : 'Дахиад оролдоорой!'}
                </h3>
                {isCorrect && streak > 1 && (
                  <div className="bg-white bg-opacity-20 inline-block px-6 py-3 rounded-xl mb-4">
                    <span className="text-2xl font-black text-white">🔥 {streak} дараалсан зөв хариулт!</span>
                  </div>
                )}
              </div>
              <div className="bg-white bg-opacity-20 p-6 rounded-xl backdrop-blur-sm">
                <p className="text-xl md:text-2xl text-white font-semibold leading-relaxed">
                  {currentPuzzleData.explanation}
                </p>
              </div>
            </div>
          )}

          {/* Навигацийн товчлууд - Сайжруулсан */}
          <div className="flex flex-wrap justify-between items-center pt-8 border-t-4 border-purple-500 gap-4">
            <button
              onClick={() => {
                setCurrentPuzzle(Math.max(0, currentPuzzle - 1));
                setIsTimerActive(false);
              }}
              disabled={currentPuzzle === 0}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-700 text-white text-xl font-black rounded-2xl disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed hover:scale-110 transition-all shadow-xl border-2 border-white border-opacity-20"
            >
              ⬅️ Өмнөх
            </button>

            {currentPuzzle === puzzles.length - 1 ? (
              <button
                onClick={resetPuzzle}
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-700 text-white text-xl font-black rounded-2xl hover:scale-110 transition-all shadow-xl border-2 border-white border-opacity-20"
              >
                🔄 Дахин эхлэх
              </button>
            ) : (
              <button
                onClick={() => {
                  setCurrentPuzzle(Math.min(puzzles.length - 1, currentPuzzle + 1));
                  setIsTimerActive(false);
                }}
                disabled={!isAnswered}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-700 text-white text-xl font-black rounded-2xl disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed hover:scale-110 transition-all shadow-xl border-2 border-white border-opacity-20"
              >
                Дараах ➡️
              </button>
            )}
          </div>
        </div>

        {/* Түүхийн сургамж - Сайжруулсан */}
        {currentPuzzle === puzzles.length - 1 && isAnswered && (
          <div className="mt-8 relative overflow-hidden bg-gradient-to-br from-yellow-500 via-orange-500 to-red-600 rounded-3xl shadow-2xl p-10 md:p-12 text-white transform hover:scale-[1.02] transition-all duration-300">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full -mr-48 -mt-48"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-white opacity-10 rounded-full -ml-36 -mb-36"></div>
            
            <div className="relative text-center">
              <div className="text-8xl mb-6 animate-bounce">📚</div>
              <h3 className="text-4xl md:text-5xl font-black mb-6 drop-shadow-lg">Түүхээс суралцая</h3>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm p-8 rounded-2xl border-4 border-white border-opacity-30 mb-8">
                <p className="text-xl md:text-2xl font-bold leading-relaxed">
                  Колончлол нь сая сая хүмүүсийн амьдрал, соёл, эрх чөлөөг хохироосон түүхэн үйл явдал юм. 1919-1939 онд Францын колони дахь ард түмэн маш хүнд нөхцөлд амьдарч, үндсэн хүний эрхээс хол байсан.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white bg-opacity-20 backdrop-blur-sm p-6 rounded-2xl border-2 border-white border-opacity-30 transform hover:scale-110 transition-all">
                  <div className="text-5xl mb-3">🕊️</div>
                  <div className="text-xl font-bold">Эрх чөлөө</div>
                  <div className="text-sm mt-2 opacity-90">Бүгд эрхтэй төрдөг</div>
                </div>
                <div className="bg-white bg-opacity-20 backdrop-blur-sm p-6 rounded-2xl border-2 border-white border-opacity-30 transform hover:scale-110 transition-all">
                  <div className="text-5xl mb-3">⚖️</div>
                  <div className="text-xl font-bold">Тэгш байдал</div>
                  <div className="text-sm mt-2 opacity-90">Хүн бүр адил үнэ цэнэтэй</div>
                </div>
                <div className="bg-white bg-opacity-20 backdrop-blur-sm p-6 rounded-2xl border-2 border-white border-opacity-30 transform hover:scale-110 transition-all">
                  <div className="text-5xl mb-3">🌍</div>
                  <div className="text-xl font-bold">Энх тайван</div>
                  <div className="text-sm mt-2 opacity-90">Хамтдаа бүтээцгээе</div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 rounded-2xl border-4 border-white border-opacity-30 shadow-2xl">
                <p className="text-2xl md:text-3xl font-black">
                  🌟 Өнөөдөр бид хүн бүрийн эрх, эрх чөлөөг хүндэтгэж, тэгш шударга дэлхийг бүтээхийн төлөө хамтран ажиллаж байна! 🌟
                </p>
              </div>
              <div className="mt-8 text-3xl font-bold">
                Таны оноо: {totalScore} / {maxScore} 🏆
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FrenchColonialPuzzle;