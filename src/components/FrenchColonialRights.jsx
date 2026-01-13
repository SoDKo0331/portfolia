import React, { useState, useEffect } from 'react';
import { BookOpen, Brain, FileText, Languages, Plus, Check, X, Search, Filter, ChevronRight, Star, Calendar, TrendingUp, Eye, LogOut, User, CreditCard, Lock, Mail, Shield } from 'lucide-react';

export default function JapaneseN3App() {
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [showAuthModal, setShowAuthModal] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('kanji');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');
  const [learnedItems, setLearnedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authForm, setAuthForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [newItem, setNewItem] = useState({
    category: 'kanji',
    character: '',
    reading: '',
    readingCyrillic: '', // Автомат кирилл
    meaning: '',
    example: '',
    notes: ''
  });

  // Кирилл-Латин транслит
  const transliterateToLatin = (cyrillic) => {
    const map = {
      'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
      'ж': 'j', 'з': 'z', 'и': 'i', 'й': 'i', 'к': 'k', 'л': 'l', 'м': 'm',
      'н': 'n', 'о': 'o', 'ө': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
      'у': 'u', 'ү': 'u', 'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh',
      'щ': 'shch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya',
      'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'Yo',
      'Ж': 'J', 'З': 'Z', 'И': 'I', 'Й': 'I', 'К': 'K', 'Л': 'L', 'М': 'M',
      'Н': 'N', 'О': 'O', 'Ө': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T',
      'У': 'U', 'Ү': 'U', 'Ф': 'F', 'Х': 'Kh', 'Ц': 'Ts', 'Ч': 'Ch', 'Ш': 'Sh',
      'Щ': 'Shch', 'Ъ': '', 'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya'
    };
    
    return cyrillic.split('').map(char => map[char] || char).join('');
  };

  // Автомат транслит - Кирилл оруулахад латинаар автоматаар гарна
  useEffect(() => {
    if (newItem.readingCyrillic) {
      const latin = transliterateToLatin(newItem.readingCyrillic);
      setNewItem(prev => ({ ...prev, reading: latin }));
    }
  }, [newItem.readingCyrillic]);

  // Check authentication and payment status
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setLoading(true);
      const authData = await window.storage.get('user-auth');
      if (authData && authData.value) {
        const userData = JSON.parse(authData.value);
        setUser(userData);
        setShowAuthModal(false);
        
        // Check payment status
        if (!userData.isPaid) {
          setShowPaymentModal(true);
        } else {
          loadData(userData.email);
        }
      }
    } catch (error) {
      console.log('No user logged in');
    } finally {
      setLoading(false);
    }
  };

  const loadData = async (email) => {
    try {
      const result = await window.storage.get(`n3-items-${email}`);
      if (result && result.value) {
        setLearnedItems(JSON.parse(result.value));
      }
    } catch (error) {
      console.log('No saved data yet');
      setLearnedItems([]);
    }
  };

  const saveData = async (items) => {
    if (!user) return;
    try {
      await window.storage.set(`n3-items-${user.email}`, JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save data:', error);
    }
  };

  const handleLogin = async () => {
    if (!authForm.email || !authForm.password) {
      alert('И-мэйл болон нууц үг оруулна уу!');
      return;
    }

    try {
      // Check if user exists
      const userData = await window.storage.get(`user-${authForm.email}`);
      
      if (!userData || !userData.value) {
        alert('Хэрэглэгч олдсонгүй! Бүртгүүлнэ үү.');
        return;
      }

      const storedUser = JSON.parse(userData.value);
      
      if (storedUser.password !== authForm.password) {
        alert('Нууц үг буруу байна!');
        return;
      }

      // Login successful
      const loggedInUser = {
        email: storedUser.email,
        name: storedUser.name,
        isPaid: storedUser.isPaid || false,
        registeredAt: storedUser.registeredAt
      };

      await window.storage.set('user-auth', JSON.stringify(loggedInUser));
      setUser(loggedInUser);
      setShowAuthModal(false);

      if (!loggedInUser.isPaid) {
        setShowPaymentModal(true);
      } else {
        loadData(loggedInUser.email);
      }
    } catch (error) {
      alert('Алдаа гарлаа: ' + error.message);
    }
  };

  const handleRegister = async () => {
    if (!authForm.email || !authForm.password || !authForm.name) {
      alert('Бүх талбарыг бөглөнө үү!');
      return;
    }

    if (authForm.password !== authForm.confirmPassword) {
      alert('Нууц үг таарахгүй байна!');
      return;
    }

    if (!authForm.email.includes('@')) {
      alert('И-мэйл хаяг буруу байна!');
      return;
    }

    try {
      // Check if user already exists
      const existingUser = await window.storage.get(`user-${authForm.email}`);
      if (existingUser && existingUser.value) {
        alert('Энэ и-мэйл хаягаар бүртгэлтэй байна!');
        return;
      }

      const newUser = {
        email: authForm.email,
        password: authForm.password,
        name: authForm.name,
        isPaid: false,
        registeredAt: new Date().toISOString()
      };

      await window.storage.set(`user-${authForm.email}`, JSON.stringify(newUser));
      
      alert('Амжилттай бүртгүүллээ! Одоо нэвтэрнэ үү.');
      setAuthMode('login');
      setAuthForm({ email: authForm.email, password: '', confirmPassword: '', name: '' });
    } catch (error) {
      alert('Бүртгэл амжилтгүй: ' + error.message);
    }
  };

  const handlePayment = async (method) => {
    // Social Pay simulation
    const confirmed = confirm(
      `${method === 'social' ? 'Social Pay' : method === 'qpay' ? 'QPay' : 'Монпэй'}-ээр 50,000₮ төлөх үү?\n\n(Энэ нь демо хувилбар - бодит төлбөр төлөгдөхгүй)`
    );

    if (confirmed) {
      try {
        // Update user payment status
        const updatedUser = { ...user, isPaid: true, paidAt: new Date().toISOString(), paymentMethod: method };
        
        await window.storage.set('user-auth', JSON.stringify(updatedUser));
        await window.storage.set(`user-${user.email}`, JSON.stringify({
          email: user.email,
          password: authForm.password,
          name: user.name,
          isPaid: true,
          paidAt: new Date().toISOString(),
          paymentMethod: method,
          registeredAt: user.registeredAt
        }));

        setUser(updatedUser);
        setShowPaymentModal(false);
        loadData(updatedUser.email);
        
        alert('🎉 Төлбөр амжилттай! Одоо бүх онцлогууд ашиглах боломжтой.');
      } catch (error) {
        alert('Төлбөрт алдаа гарлаа: ' + error.message);
      }
    }
  };

  const handleLogout = async () => {
    if (confirm('Гарах уу?')) {
      try {
        await window.storage.delete('user-auth');
        setUser(null);
        setLearnedItems([]);
        setShowAuthModal(true);
        setActiveTab('dashboard');
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
  };

  const addLearnedItem = () => {
    if (!newItem.character || !newItem.meaning) {
      alert('Үндсэн мэдээллийг бөглөнө үү!');
      return;
    }

    const item = {
      ...newItem,
      id: Date.now(),
      dateAdded: new Date().toISOString(),
      reviewCount: 0,
      nextReview: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      mastery: 0
    };

    const updated = [...learnedItems, item];
    setLearnedItems(updated);
    saveData(updated);
    
    setNewItem({
      category: currentCategory,
      character: '',
      reading: '',
      readingCyrillic: '',
      meaning: '',
      example: '',
      notes: ''
    });
    setShowAddModal(false);
  };

  const deleteItem = (id) => {
    const updated = learnedItems.filter(item => item.id !== id);
    setLearnedItems(updated);
    saveData(updated);
  };

  const reviewItem = (id, correct) => {
    const updated = learnedItems.map(item => {
      if (item.id === id) {
        const newReviewCount = item.reviewCount + 1;
        const masteryChange = correct ? 10 : -5;
        const newMastery = Math.max(0, Math.min(100, item.mastery + masteryChange));
        
        const intervals = [1, 3, 7, 14, 30, 60, 90];
        const intervalIndex = Math.min(newReviewCount, intervals.length - 1);
        const nextReviewDate = new Date(Date.now() + intervals[intervalIndex] * 24 * 60 * 60 * 1000);

        return {
          ...item,
          reviewCount: newReviewCount,
          mastery: newMastery,
          nextReview: nextReviewDate.toISOString(),
          lastReviewed: new Date().toISOString()
        };
      }
      return item;
    });

    setLearnedItems(updated);
    saveData(updated);
  };

  const categories = [
    { id: 'kanji', name: 'Ханз', icon: Languages, color: 'from-red-500 to-pink-500' },
    { id: 'grammar', name: 'Дүрэм', icon: BookOpen, color: 'from-blue-500 to-cyan-500' },
    { id: 'vocabulary', name: 'Үг', icon: Brain, color: 'from-green-500 to-emerald-500' },
    { id: 'reading', name: 'Уншлага', icon: FileText, color: 'from-purple-500 to-indigo-500' }
  ];

  const getCategoryItems = (categoryId) => {
    return learnedItems.filter(item => item.category === categoryId);
  };

  const getItemsDueForReview = () => {
    return learnedItems.filter(item => new Date(item.nextReview) <= new Date());
  };

  const getStats = () => {
    const total = learnedItems.length;
    const dueForReview = getItemsDueForReview().length;
    const avgMastery = total > 0 
      ? Math.round(learnedItems.reduce((sum, item) => sum + item.mastery, 0) / total)
      : 0;
    
    const thisWeek = learnedItems.filter(item => {
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return new Date(item.dateAdded) >= weekAgo;
    }).length;

    return { total, dueForReview, avgMastery, thisWeek };
  };

  const filteredItems = learnedItems.filter(item => {
    const matchesSearch = 
      item.character.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.reading.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.meaning.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = 
      filterLevel === 'all' ||
      (filterLevel === 'review' && new Date(item.nextReview) <= new Date()) ||
      (filterLevel === 'mastered' && item.mastery >= 80) ||
      (filterLevel === 'learning' && item.mastery < 80);

    const matchesCategory = activeTab === 'dashboard' || item.category === activeTab;

    return matchesSearch && matchesFilter && matchesCategory;
  });

  const stats = getStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-red-950 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🎌</div>
          <div className="text-white text-xl animate-pulse">Ачааллаж байна...</div>
        </div>
      </div>
    );
  }

  // Auth Modal
  if (showAuthModal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-red-950 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-red-900/30 max-w-md w-full shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-pink-600 p-8 text-center">
            <div className="text-5xl mb-3">🎌</div>
            <h1 className="text-3xl font-bold mb-2">日本語 N3</h1>
            <p className="text-red-100">Сурах Систем</p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-red-900/30">
            <button
              onClick={() => setAuthMode('login')}
              className={`flex-1 py-4 font-medium transition-all ${
                authMode === 'login'
                  ? 'bg-slate-800 text-white border-b-2 border-red-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Нэвтрэх
            </button>
            <button
              onClick={() => setAuthMode('register')}
              className={`flex-1 py-4 font-medium transition-all ${
                authMode === 'register'
                  ? 'bg-slate-800 text-white border-b-2 border-red-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Бүртгүүлэх
            </button>
          </div>

          {/* Form */}
          <div className="p-8 space-y-6">
            {authMode === 'register' && (
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Нэр</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={authForm.name}
                    onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                    className="w-full bg-slate-800/50 border border-red-900/30 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-red-500/50 text-white"
                    placeholder="Таны нэр"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">И-мэйл</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={authForm.email}
                  onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                  className="w-full bg-slate-800/50 border border-red-900/30 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-red-500/50 text-white"
                  placeholder="example@gmail.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Нууц үг</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={authForm.password}
                  onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                  className="w-full bg-slate-800/50 border border-red-900/30 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-red-500/50 text-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {authMode === 'register' && (
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Нууц үг баталгаажуулах</label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="password"
                    value={authForm.confirmPassword}
                    onChange={(e) => setAuthForm({ ...authForm, confirmPassword: e.target.value })}
                    className="w-full bg-slate-800/50 border border-red-900/30 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-red-500/50 text-white"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            )}

            <button
              onClick={authMode === 'login' ? handleLogin : handleRegister}
              className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 py-3 rounded-lg font-bold transition-all duration-300 shadow-lg"
            >
              {authMode === 'login' ? 'Нэвтрэх' : 'Бүртгүүлэх'}
            </button>

            {authMode === 'login' && (
              <p className="text-center text-sm text-gray-400">
                Шинэ хэрэглэгч үү?{' '}
                <button
                  onClick={() => setAuthMode('register')}
                  className="text-red-400 hover:text-red-300 font-medium"
                >
                  Бүртгүүлэх
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Payment Modal
  if (showPaymentModal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-red-950 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-red-900/30 max-w-lg w-full shadow-2xl">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">💳</div>
              <h2 className="text-3xl font-bold mb-2">Төлбөр төлөх</h2>
              <p className="text-gray-400">Бүх онцлогуудыг ашиглахын тулд төлбөр төлнө үү</p>
            </div>

            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-2 border-yellow-600/30 rounded-xl p-6 mb-6">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">50,000₮</div>
                <div className="text-gray-300">Насан турш хэрэглэх эрх</div>
              </div>
              <div className="mt-4 space-y-2 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-green-400" />
                  <span>Хязгааргүй ханз, үг нэмэх</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-green-400" />
                  <span>Автомат давталтын систем</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-green-400" />
                  <span>Ахиц явцын хяналт</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-green-400" />
                  <span>Кирилл транслит</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handlePayment('social')}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg flex items-center justify-center gap-3"
              >
                <CreditCard size={24} />
                Social Pay-ээр төлөх
              </button>

              <button
                onClick={() => handlePayment('qpay')}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg flex items-center justify-center gap-3"
              >
                <CreditCard size={24} />
                QPay-ээр төлөх
              </button>

              <button
                onClick={() => handlePayment('monpay')}
                className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg flex items-center justify-center gap-3"
              >
                <CreditCard size={24} />
                Монпэй-ээр төлөх
              </button>
            </div>

            <button
              onClick={handleLogout}
              className="w-full mt-6 text-gray-400 hover:text-white py-2 transition-colors text-sm"
            >
              Буцах
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-red-950 to-slate-900 text-white font-sans">
      {/* Header */}
      <header className="border-b border-red-900/30 backdrop-blur-sm bg-black/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="text-3xl font-bold bg-gradient-to-r from-red-400 via-pink-400 to-red-300 bg-clip-text text-transparent">
                  日本語 N3
                </div>
                <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-full opacity-60"></div>
              </div>
              <div className="hidden md:flex items-center gap-3 text-sm text-gray-400 border-l border-red-900/40 pl-4">
                <User size={16} />
                <span>{user?.name}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 px-6 py-2.5 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-red-900/50 hover:shadow-red-800/60 flex items-center gap-2"
              >
                <Plus size={20} />
                <span className="hidden sm:inline">Нэмэх</span>
              </button>
              <button
                onClick={handleLogout}
                className="text-gray-400 hover:text-white p-2 transition-colors"
                title="Гарах"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-red-900/30 bg-black/10 backdrop-blur-sm sticky top-[73px] z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-6 py-3 font-medium transition-all duration-300 border-b-2 whitespace-nowrap ${
                activeTab === 'dashboard'
                  ? 'border-red-500 text-red-400'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Хяналтын самбар
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-6 py-3 font-medium transition-all duration-300 border-b-2 flex items-center gap-2 whitespace-nowrap ${
                  activeTab === cat.id
                    ? 'border-red-500 text-red-400'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <cat.icon size={18} />
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'dashboard' ? (
          <DashboardView stats={stats} categories={categories} learnedItems={learnedItems} getCategoryItems={getCategoryItems} reviewItem={reviewItem} />
        ) : (
          <CategoryView 
            category={categories.find(c => c.id === activeTab)}
            items={filteredItems}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filterLevel={filterLevel}
            setFilterLevel={setFilterLevel}
            deleteItem={deleteItem}
            reviewItem={reviewItem}
          />
        )}
      </main>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-red-900/30 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-red-900/30 flex items-center justify-between sticky top-0 bg-slate-900/95 backdrop-blur-sm">
              <h2 className="text-2xl font-bold">Шинэ зүйл нэмэх</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Category Selection */}
              <div>
                <label className="block text-sm font-medium mb-3">Ангилал</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setNewItem({ ...newItem, category: cat.id })}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        newItem.category === cat.id
                          ? `bg-gradient-to-br ${cat.color} border-transparent shadow-lg`
                          : 'border-red-900/30 hover:border-red-700/50 bg-slate-800/50'
                      }`}
                    >
                      <cat.icon size={24} className="mx-auto mb-2" />
                      <div className="text-sm font-medium">{cat.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {newItem.category === 'kanji' ? 'Ханз' : 
                     newItem.category === 'grammar' ? 'Дүрмийн бүтэц' :
                     newItem.category === 'vocabulary' ? 'Үг' : 'Текст'} *
                  </label>
                  <input
                    type="text"
                    value={newItem.character}
                    onChange={(e) => setNewItem({ ...newItem, character: e.target.value })}
                    className="w-full bg-slate-800/50 border border-red-900/30 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500/50 text-2xl"
                    placeholder={newItem.category === 'kanji' ? '漢' : newItem.category === 'grammar' ? '～について' : '単語'}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Кирилл уншлага
                      <span className="text-xs text-gray-400 ml-2">(автоматаар латинаар хувирна)</span>
                    </label>
                    <input
                      type="text"
                      value={newItem.readingCyrillic}
                      onChange={(e) => setNewItem({ ...newItem, readingCyrillic: e.target.value })}
                      className="w-full bg-slate-800/50 border border-red-900/30 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500/50"
                      placeholder="кан (кирилл)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Латин уншлага
                      <span className="text-xs text-green-400 ml-2">(автомат)</span>
                    </label>
                    <input
                      type="text"
                      value={newItem.reading}
                      onChange={(e) => setNewItem({ ...newItem, reading: e.target.value })}
                      className="w-full bg-green-900/20 border border-green-900/30 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500/50"
                      placeholder="kan (авто)"
                      readOnly
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Утга / Тайлбар *</label>
                  <input
                    type="text"
                    value={newItem.meaning}
                    onChange={(e) => setNewItem({ ...newItem, meaning: e.target.value })}
                    className="w-full bg-slate-800/50 border border-red-900/30 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500/50"
                    placeholder="Хятад, Хан гүрэн"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Жишээ өгүүлбэр</label>
                  <textarea
                    value={newItem.example}
                    onChange={(e) => setNewItem({ ...newItem, example: e.target.value })}
                    className="w-full bg-slate-800/50 border border-red-900/30 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500/50 min-h-[80px]"
                    placeholder="漢字を勉強します。"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Тэмдэглэл</label>
                  <textarea
                    value={newItem.notes}
                    onChange={(e) => setNewItem({ ...newItem, notes: e.target.value })}
                    className="w-full bg-slate-800/50 border border-red-900/30 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500/50 min-h-[60px]"
                    placeholder="Нэмэлт мэдээлэл..."
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Цуцлах
                </button>
                <button
                  onClick={addLearnedItem}
                  disabled={!newItem.character || !newItem.meaning}
                  className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg"
                >
                  Нэмэх
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Dashboard and CategoryView components remain the same as before
function DashboardView({ stats, categories, learnedItems, getCategoryItems, reviewItem }) {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [currentReviewItem, setCurrentReviewItem] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const itemsDueForReview = learnedItems.filter(item => new Date(item.nextReview) <= new Date());

  const startReview = () => {
    if (itemsDueForReview.length > 0) {
      setCurrentReviewItem(itemsDueForReview[0]);
      setShowAnswer(false);
      setShowReviewModal(true);
    }
  };

  const handleReview = (correct) => {
    reviewItem(currentReviewItem.id, correct);
    const remainingItems = itemsDueForReview.filter(item => item.id !== currentReviewItem.id);
    
    if (remainingItems.length > 0) {
      setCurrentReviewItem(remainingItems[0]);
      setShowAnswer(false);
    } else {
      setShowReviewModal(false);
      setCurrentReviewItem(null);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-red-900/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl">
              <BookOpen size={24} />
            </div>
            <TrendingUp size={20} className="text-green-400" />
          </div>
          <div className="text-3xl font-bold mb-1">{stats.total}</div>
          <div className="text-gray-400 text-sm">Нийт сурсан</div>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-red-900/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl">
              <Calendar size={24} />
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">{stats.dueForReview}</div>
          <div className="text-gray-400 text-sm">Давтах хэрэгтэй</div>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-red-900/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl">
              <Star size={24} />
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">{stats.avgMastery}%</div>
          <div className="text-gray-400 text-sm">Дундаж түвшин</div>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-red-900/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
              <TrendingUp size={24} />
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">+{stats.thisWeek}</div>
          <div className="text-gray-400 text-sm">Энэ долоо хоног</div>
        </div>
      </div>

      {/* Review Section */}
      {stats.dueForReview > 0 && (
        <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-2 border-yellow-600/30 rounded-2xl p-8 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2 flex items-center gap-3">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <Calendar size={28} className="text-yellow-400" />
                </div>
                Давталт хийх цаг боллоо!
              </h3>
              <p className="text-gray-300">
                Танд давтах хэрэгтэй <span className="text-yellow-400 font-bold">{stats.dueForReview}</span> зүйл байна.
              </p>
            </div>
            <button
              onClick={startReview}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg shadow-yellow-900/50 hover:shadow-yellow-800/60 hover:-translate-y-1"
            >
              Эхлүүлэх
            </button>
          </div>
        </div>
      )}

      {/* Categories Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map(cat => {
          const items = getCategoryItems(cat.id);
          const avgMastery = items.length > 0 
            ? Math.round(items.reduce((sum, item) => sum + item.mastery, 0) / items.length)
            : 0;

          return (
            <div
              key={cat.id}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-red-900/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`p-4 bg-gradient-to-br ${cat.color} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                    <cat.icon size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">{cat.name}</h3>
                    <p className="text-gray-400 text-sm">{items.length} зүйл</p>
                  </div>
                </div>
                <ChevronRight className="text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-400">Ахиц</span>
                  <span className="font-bold">{avgMastery}%</span>
                </div>
                <div className="h-3 bg-slate-700/50 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${cat.color} transition-all duration-1000 rounded-full`}
                    style={{ width: `${avgMastery}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Review Modal */}
      {showReviewModal && currentReviewItem && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-red-900/30 max-w-2xl w-full shadow-2xl">
            <div className="p-6 border-b border-red-900/30">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Давталт ({itemsDueForReview.length} үлдсэн)</h2>
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-8 text-center">
              <div className="mb-6">
                <div className="text-6xl font-bold mb-4">{currentReviewItem.character}</div>
                {currentReviewItem.reading && (
                  <div className="text-2xl text-gray-400 mb-2">{currentReviewItem.reading}</div>
                )}
              </div>

              {showAnswer ? (
                <div className="space-y-4 animate-fade-in">
                  <div className="bg-slate-800/50 rounded-xl p-4">
                    <div className="text-sm text-gray-400 mb-1">Утга:</div>
                    <div className="text-xl font-medium">{currentReviewItem.meaning}</div>
                  </div>

                  {currentReviewItem.example && (
                    <div className="bg-slate-800/50 rounded-xl p-4">
                      <div className="text-sm text-gray-400 mb-1">Жишээ:</div>
                      <div className="text-lg">{currentReviewItem.example}</div>
                    </div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => handleReview(false)}
                      className="flex-1 bg-red-600 hover:bg-red-500 px-6 py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <X size={20} />
                      Буруу
                    </button>
                    <button
                      onClick={() => handleReview(true)}
                      className="flex-1 bg-green-600 hover:bg-green-500 px-6 py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Check size={20} />
                      Зөв
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowAnswer(true)}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg flex items-center gap-2 mx-auto"
                >
                  <Eye size={20} />
                  Хариулт харах
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CategoryView({ category, items, searchQuery, setSearchQuery, filterLevel, setFilterLevel, deleteItem, reviewItem }) {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className={`p-4 bg-gradient-to-br ${category.color} rounded-xl`}>
            <category.icon size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-bold">{category.name}</h2>
            <p className="text-gray-400">{items.length} зүйл</p>
          </div>
        </div>

        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Хайх..."
              className="w-full bg-slate-800/50 border border-red-900/30 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-red-500/50"
            />
          </div>

          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="bg-slate-800/50 border border-red-900/30 rounded-lg px-4 py-2.5 focus:outline-none focus:border-red-500/50"
          >
            <option value="all">Бүгд</option>
            <option value="review">Давтах</option>
            <option value="mastered">Эзэмшсэн</option>
            <option value="learning">Сурч байгаа</option>
          </select>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <div className={`inline-flex p-6 bg-gradient-to-br ${category.color} rounded-2xl mb-4`}>
            <category.icon size={48} />
          </div>
          <h3 className="text-xl font-bold mb-2">Одоогоор хоосон байна</h3>
          <p className="text-gray-400">Дээд талын "Нэмэх" товчоор шинэ зүйл нэмээрэй</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(item => (
            <div
              key={item.id}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-red-900/30 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="text-3xl font-bold mb-2">{item.character}</div>
                  {item.reading && (
                    <div className="text-lg text-gray-400 mb-1">{item.reading}</div>
                  )}
                  {item.readingCyrillic && (
                    <div className="text-sm text-green-400/70 mb-1">({item.readingCyrillic})</div>
                  )}
                  <div className="text-sm text-gray-300">{item.meaning}</div>
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm('Устгах уу?')) deleteItem(item.id);
                  }}
                  className="text-gray-500 hover:text-red-400 transition-colors p-1"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-500">Эзэмшилт</span>
                  <span className={`font-bold ${
                    item.mastery >= 80 ? 'text-green-400' :
                    item.mastery >= 50 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {item.mastery}%
                  </span>
                </div>
                <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      item.mastery >= 80 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                      item.mastery >= 50 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                      'bg-gradient-to-r from-red-500 to-pink-500'
                    }`}
                    style={{ width: `${item.mastery}%` }}
                  ></div>
                </div>
              </div>

              {expandedId === item.id && (
                <div className="space-y-3 animate-fade-in border-t border-red-900/30 pt-4">
                  {item.example && (
                    <div className="bg-slate-700/30 rounded-lg p-3">
                      <div className="text-xs text-gray-400 mb-1">Жишээ:</div>
                      <div className="text-sm">{item.example}</div>
                    </div>
                  )}
                  
                  {item.notes && (
                    <div className="bg-slate-700/30 rounded-lg p-3">
                      <div className="text-xs text-gray-400 mb-1">Тэмдэглэл:</div>
                      <div className="text-sm">{item.notes}</div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
                    <span>Давтсан: {item.reviewCount} удаа</span>
                    <span>
                      {new Date(item.nextReview) <= new Date() 
                        ? '⚡ Одоо давтах' 
                        : `📅 ${new Date(item.nextReview).toLocaleDateString('mn-MN')}`
                      }
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
