import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const FrenchColonialRights = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Колони хүн амын өгөгдөл
  const populationData = [
    { year: 1919, total: 55000000, algeria: 5000000, westAfrica: 12000000, indochina: 18000000 },
    { year: 1925, total: 60000000, algeria: 5500000, westAfrica: 13000000, indochina: 19000000 },
    { year: 1930, total: 65000000, algeria: 6000000, westAfrica: 14000000, indochina: 20000000 },
    { year: 1936, total: 69100000, algeria: 6500000, westAfrica: 15000000, indochina: 21000000 }
  ];

  // Иргэншил авсан тоо
  const citizenshipData = [
    { period: '1865-1919', algeria: 2500, westAfrica: 500, total: 3000 },
    { period: '1919-1930', algeria: 1500, westAfrica: 800, total: 2300 },
    { period: '1930-1939', algeria: 2000, westAfrica: 1200, total: 3200 }
  ];

  // Боловсролын статистик
  const educationData = [
    { region: 'Алжир', enrolled: 5, illiterate: 95 },
    { region: 'Баруун Африк', enrolled: 8, illiterate: 92 },
    { region: 'Индокитай', enrolled: 15, illiterate: 85 },
    { region: 'Франц', enrolled: 95, illiterate: 5 }
  ];

  // Албадан хөдөлмөр
  const forcedLaborData = [
    { year: 1920, workers: 850000, type: 'Зам барилга' },
    { year: 1925, workers: 1200000, type: 'Зам барилга' },
    { year: 1930, workers: 1500000, type: 'Зам барилга' },
    { year: 1935, workers: 1300000, type: 'Зам барилга' }
  ];

  // Татварын дарамт
  const taxData = [
    { category: 'Толгойн татвар', amount: 100, impact: 'Бүх эрэгтэй насанд хүрэгчид' },
    { category: 'Хөдөлмөрийн татвар', amount: 85, impact: '30-40 хоног албадан хөдөлмөр' },
    { category: 'Бусад татвар', amount: 65, impact: 'Газар тариалангийн үйлдвэрлэл' }
  ];

  // Хуулийн эрх
  const legalRightsData = [
    { status: 'Франц иргэн', rights: 100, population: 500000 },
    { status: 'Нутгийн суурьшсан', rights: 25, population: 2000000 },
    { status: 'Нутгийн захиргаа', rights: 10, population: 66600000 }
  ];

  const COLORS = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'];

  const slides = [
    {
      title: "ФРАНЦЫН КОЛОНИЙН ХҮНИЙ ЭРХ 1919-1939",
      subtitle: "Тоо баримтаар илэрхийлсэн өнгөрсөн түүх",
      content: (
        <div className="text-center space-y-8">
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-red-100 p-6 rounded-lg">
              <div className="text-5xl font-bold text-red-600">69.1М</div>
              <div className="text-lg mt-2">Нийт колони хүн ам (1936)</div>
            </div>
            <div className="bg-orange-100 p-6 rounded-lg">
              <div className="text-5xl font-bold text-orange-600">0.01%</div>
              <div className="text-lg mt-2">Иргэншил авсан нутгийн иргэд</div>
            </div>
            <div className="bg-blue-100 p-6 rounded-lg">
              <div className="text-5xl font-bold text-blue-600">85%</div>
              <div className="text-lg mt-2">Бичиг үсэггүй хүн ам</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "ХҮН АМЫН ӨСӨЛТ 1919-1936",
      subtitle: "Колони хүн амын бүтэц",
      content: (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={populationData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip formatter={(value) => value.toLocaleString()} />
            <Legend />
            <Line type="monotone" dataKey="total" stroke="#8b5cf6" strokeWidth={3} name="Нийт" />
            <Line type="monotone" dataKey="algeria" stroke="#ef4444" strokeWidth={2} name="Алжир" />
            <Line type="monotone" dataKey="westAfrica" stroke="#f59e0b" strokeWidth={2} name="Баруун Африк" />
            <Line type="monotone" dataKey="indochina" stroke="#10b981" strokeWidth={2} name="Индокитай" />
          </LineChart>
        </ResponsiveContainer>
      )
    },
    {
      title: "ИРГЭНШЛИЙН ХАНДЛАГА",
      subtitle: "1865-1939 оны хооронд франц иргэншил авсан тоо",
      content: (
        <div className="space-y-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={citizenshipData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="algeria" fill="#ef4444" name="Алжир" />
              <Bar dataKey="westAfrica" fill="#f59e0b" name="Баруун Африк" />
              <Bar dataKey="total" fill="#3b82f6" name="Нийт" />
            </BarChart>
          </ResponsiveContainer>
          <div className="bg-gray-100 p-6 rounded-lg">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-700">8,500</div>
              <div className="text-lg mt-2">1865-1939: Нийт иргэншил авсан</div>
              <div className="text-sm text-gray-600 mt-2">69,100,000 хүн амаас зөвхөн 0.012%</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "БОЛОВСРОЛЫН ЭРХ",
      subtitle: "1930-ийн оны үеийн сургуульд хамрагдалт",
      content: (
        <div className="space-y-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={educationData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis type="category" dataKey="region" />
              <Tooltip />
              <Legend />
              <Bar dataKey="enrolled" fill="#10b981" name="Сургуульд хамрагдсан %" />
              <Bar dataKey="illiterate" fill="#ef4444" name="Бичиг үсэггүй %" />
            </BarChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-red-50 p-4 rounded">
              <div className="text-3xl font-bold text-red-600">15%</div>
              <div className="text-sm">Индокитайд сургууль явсан хүүхдүүд (1939)</div>
            </div>
            <div className="bg-orange-50 p-4 rounded">
              <div className="text-3xl font-bold text-orange-600">80%</div>
              <div className="text-sm">Нийт хүн амын бичиг үсэггүй байдал</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "АЛБАДАН ХӨДӨЛМӨР",
      subtitle: "1920-1935 оны хооронд татан авагдсан ажилчид",
      content: (
        <div className="space-y-6">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={forcedLaborData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip formatter={(value) => value.toLocaleString()} />
              <Legend />
              <Line type="monotone" dataKey="workers" stroke="#dc2626" strokeWidth={3} name="Албадан ажилчид" />
            </LineChart>
          </ResponsiveContainer>
          <div className="bg-red-100 p-6 rounded-lg">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-semibold">Зам барилга (1920-ын)</span>
                <span className="font-bold">100,000+ тосогч зугтсан</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">ILO Конвенц (1930)</span>
                <span className="font-bold">Франц 7 жилийн дараа батласан</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Нийт албадан ажилчид</span>
                <span className="font-bold">1.5М+ (1930)</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "ХУУЛИЙН ЭРХИЙН ЯЛГАА",
      subtitle: "Code de l'Indigénat - Нутгийн хууль (1881-1946)",
      content: (
        <div className="space-y-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={legalRightsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="rights" fill="#3b82f6" name="Эрхийн түвшин %" />
            </BarChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded">
              <div className="text-2xl font-bold text-blue-600">Франц иргэн</div>
              <div className="text-sm mt-2">• Бүрэн эрх<br/>• Шүүх эрх<br/>• Сонгох эрх</div>
              <div className="text-xs text-gray-600 mt-2">~500,000 хүн</div>
            </div>
            <div className="bg-red-50 p-4 rounded">
              <div className="text-2xl font-bold text-red-600">Нутгийн иргэд</div>
              <div className="text-sm mt-2">• Албадан хөдөлмөр<br/>• Шүүх эрхгүй<br/>• Сонгох эрхгүй</div>
              <div className="text-xs text-gray-600 mt-2">~66.6М хүн</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "ТАТВАРЫН ДАРАМТ",
      subtitle: "Нутгийн хүн амд ногдуулсан санхүүгийн дарамт",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            {taxData.map((tax, idx) => (
              <div key={idx} className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-lg">
                <div className="text-3xl font-bold text-red-600">{tax.amount}%</div>
                <div className="text-lg font-semibold mt-2">{tax.category}</div>
                <div className="text-sm text-gray-600 mt-2">{tax.impact}</div>
              </div>
            ))}
          </div>
          <div className="bg-yellow-100 p-6 rounded-lg">
            <div className="font-bold text-xl mb-3">Хөдөлмөрийн татвар (Prestation):</div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>• 30-40 хоног албадан ажил</div>
              <div>• Зам барилга, ногоон талбай</div>
              <div>• Мөнгөөр төлж чөлөөлөгдөх боломжгүй</div>
              <div>• 1930: ILO-гаас хориглосон ч үргэлжилсэн</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "ДҮГНЭЛТ: ТОО БАРИМТ ЯРИНА",
      subtitle: "1919-1939 оны Францын колонийн бодит байдал",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-red-100 p-6 rounded-lg">
              <div className="text-4xl font-bold text-red-600 mb-3">99.99%</div>
              <div className="text-lg font-semibold">Нутгийн хүн ам</div>
              <div className="text-sm mt-2">Бүрэн эрхгүй, албадан хөдөлмөр, боловсролгүй</div>
            </div>
            <div className="bg-blue-100 p-6 rounded-lg">
              <div className="text-4xl font-bold text-blue-600 mb-3">0.01%</div>
              <div className="text-lg font-semibold">Иргэн болсон</div>
              <div className="text-sm mt-2">1865-1939: Зөвхөн 8,500 хүн</div>
            </div>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg">
            <div className="text-lg font-bold mb-4">ГҮЙЦЭТГЭХ ЗӨВЛӨМЖ:</div>
            <div className="space-y-2 text-sm">
              <div>📊 Өгөгдөл: Түүхэн баримт дээр үндэслэсэн</div>
              <div>📈 График: Тодорхой статистик дүрслэл</div>
              <div>🎯 Хэлбэр: Интерактив, сонирхолтой</div>
              <div>⏱️ Хугацаа: 7-10 минут үзүүлэх</div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xl text-gray-600">{slides[currentSlide].subtitle}</p>
          </div>

          {/* Content */}
          <div className="min-h-[500px] mb-8">
            {slides[currentSlide].content}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t-2">
            <button
              onClick={prevSlide}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              disabled={currentSlide === 0}
            >
              ← Өмнөх
            </button>
            
            <div className="flex items-center gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-3 h-3 rounded-full transition ${
                    idx === currentSlide ? 'bg-blue-600 w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              disabled={currentSlide === slides.length - 1}
            >
              Дараах →
            </button>
          </div>

          {/* Footer */}
          <div className="text-center mt-6 text-sm text-gray-500">
            Слайд {currentSlide + 1} / {slides.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrenchColonialRights;