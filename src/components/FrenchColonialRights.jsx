import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Search, Heart, Share2, Bookmark, ChevronRight, TrendingUp } from 'lucide-react';

export default function HeyMongolHomepage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All Posts');
  const [scrolled, setScrolled] = useState(false);
  const [savedPosts, setSavedPosts] = useState([]);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filters = ['All Posts', 'Culture', 'Landscape', 'Nomadic Life', 'Events', 'Food', 'Adventure'];

  const posts = [
    {
      id: 1,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDALX3sc66nD5lCQxJJK1iwjh0l_fcRUUBgQ8a28dWM_iGXIkrO0p4g0wfq0R9J3HsOT_3uSexQcGt0Vd0GxfJMIDbDiY5sK26San_x5CDSWIGNZs4hYU58gwl9h3RGHPE9_vShxgiZju2kwnaAYFSusEuDa-pZXIGUMIDDT1fK43dMraP95VbXb1bFjD4RfYCyZoIPxwmv-bOmrX-wSk3QFRnszey6JTxgCishFGmOOyxorGv1Qws2mYB7ebJdz6twIkTA3KsrzSnO',
      category: 'Nomadic Life',
      time: '2 hrs ago',
      title: 'Traditional Ger Construction',
      description: 'Witness the intricate process of assembling a traditional Mongolian Ger. A practice passed down through generations that perfectly adapts to the nomadic lifestyle.',
      author: 'Bataar',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5I44EMmvNSL-yl37U1oeGHvGO0cH2Uam3OBQYyQO2eZJ1mNyjmvXJLNrDc7aFtEv6Ca4D3o0U1aGvlPpY2opcTgnE1GYwbICz2kJcDXXdqApwkuRe3sESh1u98Xtr9mqkbvVCgeXyubksg0mTlPq33dDguWU2Sw8zLteepn6jjzwurbb-DqlLEvEspedK36cIs0wFjzy9W3TaNTe4_OpybPWHiXWaUJKppbBuuwAP855h5KbVIiGOzPdkAgHrjNlQLO0JWpJpn0O4',
      type: 'gallery',
      trending: true
    },
    {
      id: 2,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACEfGbX8pdUVhxzBv384pFzr2_XWzNCM5oR6LUzvd2fIti-rnBF6_GbtWJSV_Hii7Hdv9VyY_OmU7SMKG7f92Oj2dU3QiM0yGB9TY-AZj-ThbFBGND4qbL-eVi6gQR0shH9b_-N0gX3l3vBiVmSNDygfrNrW5J6QipPTvKNf9lgYXUSgcYz-yXjfcMFfU9XeLB1pKThiYaLC34ch9hFFXRX6mB9Ur3G-MX39HG0l1ZPZ_yBg443abKCZ295kU1izu3iTWJYWMR-h7E',
      category: 'Culture',
      time: '5 hrs ago',
      title: 'Golden Eagle Festival Highlights',
      description: 'The annual Golden Eagle Festival in Bayan-Ulgii province showcases the ancient tradition of eagle hunting. See the majestic birds in action.',
      author: 'Sarnai',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDltIpyA5uUpLPVOxUAM7Z7uRZ6BcsQmSjMxHrByB2-lpFlUXTICqsDcPcHSCVmPt3vBJEhyioNbIP5U1VDmVrzzu8TCrIbgOPIcbEZzQWgeAs5a4WNKctsCmnhJIyXLFLSWk-IeC_rbmgE7qugsGLqG8A7ys2uRnw-2Clbqvv-KHZhJoKl8cAeEfyK2NH8EGeqKUoXZcWssnKWsyyOgOiG12X5QhRom5FyvWw3nG-dxX98zIWGWZeK4MSVjwC__3WHT0VBc1ohxzAX',
      type: 'video',
      trending: true
    },
    {
      id: 3,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApfrKO1-oiB3oZoX_HgG9zsZJsnukdBfXZ9TgonmSCPzOilxo_tI-z44fq8N06nqsmmQyjVqXwVbOfr8MwPPZUceZ-V7BLovXyLnoD_Ny8ij83n0I4guhk9pbL-e-5cUsFETH_LPkxpWwuWHPom0m6JsAhtDfddDvHjTFTbcEQVMtQVMiWwOONAJ-AQp6j_P2ZW-MWp8XqcIRWnGQMXGJ4lhYC9wBm87znEBAmSTBf06hh1gnNJWqaNPUKbRdNpAQbOZB5ADaAZM6V',
      category: 'Landscape',
      time: '1 day ago',
      title: 'Singing Sands of the Gobi',
      description: 'Khongoryn Els, also known as the Singing Sands, are some of the largest and most spectacular sand dunes in Mongolia.',
      author: 'Khulan',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-hkHcpjLaMwNtovk_E260HZ0aUaVLUsdmJmgdefljVfLovVKszbPljjMhVaEhSNRFrtV2Je9rxg5jRJSQDJQvGU2vSe9ahWkCrFLwpVUgvVsR8Ao6KdhAbzLaulZgdNNVuNhEZJMQC2uYebla02IUh0RTfcDDJckTTJ7Ebqd1XEMNLDn7LuZitBK0lMpkldT9Ec6Ix2FRKpoe_naqHn_vw-CeD4XiUFdxtpsUbgcsfP3wvN08Y3-qcXNvTP3OwFSIOWUk8RJxq615',
      type: 'image'
    },
    {
      id: 4,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqLWMwmZaVGZH9YvbYtBFSQ9Gy6H3fF1nMZKmjcc6A_MdUZTX3GIF0ZJcnAwQd11V1Oxha1eokG6LXTn01SiuAggSRzKpxNz90LOeAndDGkrBqHZUN24G9wbICIZKwIfhMxmUCLSIGG2Yv4j5FmbvVocPn4rLmER4WCVzUiIq80xBQs-iW9cMFlEcOyJuqTVEGv4m8dA4Yl4hNNDLg6CR1xLR4Qigx5E41QldJIMIX-QXYzNWzy9kL72aUA2JVGDVKHk0_xoUW7i12',
      category: 'Adventure',
      time: '2 days ago',
      title: 'Horse Trekking in Terelj',
      description: 'Experience the freedom of galloping through the open plains of Gorkhi-Terelj National Park on horseback.',
      author: 'Gantulga',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsdzCcDTtSCkhnxTw-1yV9GNPGaln3iUtxymDFxkOXuhQQY5Zx9e6F2CX4Z1EglVkMNLrPEPrX7Pl8g_ASMFVn1C3X6K5qfqHILdhyQPXTaVcg1qf2ctEMfpIG2Wp69OQ8e_62K021_bDA5XTLHaXKmCOBJ2vvdDHzg1IQaZtXr79XkRhUiph3QjbWaDEERSbJzvsKyBuQCqW1xTYvfOhU_sPSPdk3ym2myLzZME2dNaaiKJTdJvIDHqNb3tOKCEWHOABntftlHpc6',
      type: 'image'
    },
    {
      id: 5,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZM2AUCfMkNXPnnfKrNiOSVDlj2CNwqMgT0wuIJ4w00ety4y_WOqoQ-ihK6IVsMvqKGJN8LKKvXy1x64X54TKej9u6k_HHERQ4uB0bipXV-a5e649Ad92pRm9AJ3gyqdTU3eGRK4TEgSbON_wBhreGFHwBliCjvyJwf3MqPoEQjokDl6OVnbFoxRTIPQqH5fh4fAJve8jBg0xtCH-6OCuhGRjfZQG0FQBP4_gpwGGR-W_Va1Y5qPv2cRefKwZSQxlPTI3Mbd5lQjdw',
      category: 'Food',
      time: '3 days ago',
      title: 'Taste of Naadam: Khuushuur',
      description: 'Deep-fried meat pastries that are an essential part of the Naadam Festival experience. Crispy, juicy, and delicious.',
      author: 'Tuya',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRG6DxxUSzIFb4U8kVVTVDeGYgUACSLNdSW8lZImmZ8hjJItANz_FTtPEhhsJaA5jcI9QmZ5_DG_CPOivcGPbxftPrzlW_TEbXW8BT--2JIn6xTSfJ6ITZuvdqwjFgSxEqn0O_s7DOQXYn74sGDCICdJuOPAt0Ynrkd7PNs8QHpQvshl0HdW85iqk1ucpl7fsytV0XvwcpTtsmmfr2JDfEcdHyH5rUwENwnjIXLC1vY8GkQCJ-_X-Vxp5uJ7GlDn4BLzaPMNh_4fB7',
      type: 'image'
    },
    {
      id: 6,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCVOkjwE9sUizwRBfquKGh7Ldp5bKqUJKAXwEcjztXvNTWiZBwbk7Mep3M_dztTxwBqtwlYrHRrZefDBQYTS0OgsXNBPtDweKDIPGCkAVzcrcAMJDurxGAJZ5O-iVXQT410ccBI2HCeaMxKPxaX5aPh-Pby-4nxaviPD6EEB2k8DtvG0doejNwZuXdbYrgVsZicq0d5V5HEzT1-aWyL-bR9maNF26XZVRXcdhYe1NyElUuK_BBZlBaCwokLuZG9EgfjMtQ5lkX8MpM',
      category: 'City Life',
      time: '4 days ago',
      title: 'Winter Nights in Ulaanbaatar',
      description: 'Exploring the vibrant nightlife and snowy streets of the capital city during the coldest months of the year.',
      author: 'Bold',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0Jt5GKyL4pN9XHJdH1Oov-ComPpXoNUy1ytWMQ7EKEz7ZpgmNEmgfKhxCqccmq7xzZdbD9tueVApn4E4Itj-vgP2G39C3LiaE-KDou6dp0IQuqfj9gcETvYsSc7Uq9KRFALx_c_JrE1KkgoVobbt761a3ifsAGOOuTxu5n8JoIi62LJR0_UggyPbP3SFF_79iQbdIdHGIa6VvHIXMxPyTpFsJ7s-d5W3Hk7k0VnqE7BKynOPg4TC-MYa7diyemFZeN8dDTGRZlPtD',
      type: 'image'
    }
  ];

  const toggleSave = (postId) => {
    setSavedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] font-['Montserrat',sans-serif] transition-colors duration-300">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/80 dark:bg-[#1E293B]/80 backdrop-blur-xl shadow-lg border-b border-[#104882]/20' 
          : 'bg-white dark:bg-[#1E293B] border-b border-gray-200/50 dark:border-gray-800/50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#104882] to-[#0a3566] flex items-center justify-center border-2 border-[#F4B400] shadow-lg shadow-[#F4B400]/20 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-[#F4B400] font-black text-xs tracking-wider transform -rotate-90">HEY</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-[#F4B400]/20 to-[#104882]/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="font-black text-2xl tracking-tight">
                <span className="text-[#F4B400]">HEY!</span>
                <span className="text-[#104882] dark:text-white ml-1">MONGOL</span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {['Home', 'Discover', 'About', 'Contact'].map((item) => (
                <a 
                  key={item}
                  href="#" 
                  className="relative text-sm font-semibold text-[#1E293B] dark:text-[#E2E8F0] hover:text-[#104882] dark:hover:text-[#F4B400] transition-colors group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F4B400] group-hover:w-full transition-all duration-300" />
                </a>
              ))}
              <button className="px-6 py-2.5 bg-[#104882] text-white rounded-full font-bold text-sm hover:bg-[#0a3566] transition-all duration-300 shadow-lg shadow-[#104882]/30 hover:shadow-[#104882]/50 hover:scale-105">
                Subscribe
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800 animate-fadeIn">
              <div className="flex flex-col gap-3">
                {['Home', 'Discover', 'About', 'Contact'].map((item) => (
                  <a 
                    key={item}
                    href="#" 
                    className="px-4 py-2 text-sm font-semibold text-[#1E293B] dark:text-[#E2E8F0] hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    {item}
                  </a>
                ))}
                <button className="mt-2 px-4 py-2.5 bg-[#104882] text-white rounded-full font-bold text-sm">
                  Subscribe
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <header 
        ref={heroRef}
        className="relative mt-20 h-[600px] overflow-hidden"
      >
        {/* Background with Parallax Effect */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center transform scale-110 transition-transform duration-[10000ms]"
            style={{
              backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuD9lm4MWGAvQkOMe8DRJxwXAfxgFZ8b9KUji3jWhIhEcXoZa-b2b7aZ4aEZJeBlkUewL6ng3PdtTos1kht-xJACzHYMaKM3nC_iWdjtZYj-ZGZ76g_T5JXqEsIh1XVWVs1PnzG9C6pXf-VgskKrDwJTX_rw7edCgo-zRm9GqkEOF_y7KYqoB-ggX_F3FpOVjiTH6OL40GQgUrpK0eZz4LEonB09cQKv_8oousSzeqN1MCBdMKUTUCIPb1uk958HkLwgTxyzchRAq1OY)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#104882]/95 via-[#104882]/80 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(244,180,0,0.1),transparent_50%)]" />
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl space-y-6 animate-fadeInUp">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F4B400]/20 backdrop-blur-sm rounded-full border border-[#F4B400]/30 text-[#F4B400] text-sm font-bold">
                <TrendingUp size={16} />
                <span>Trending Stories from Mongolia</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight">
                Discover the Spirit
                <br />
                of <span className="text-[#F4B400] relative">
                  Mongolia
                  <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 300 8" fill="none">
                    <path d="M0 4C50 8, 250 0, 300 4" stroke="#F4B400" strokeWidth="4" />
                  </svg>
                </span>
              </h1>
              
              <p className="text-xl text-blue-100 font-medium max-w-2xl">
                Explore culture, landscapes, and stories from the heart of the steppes. Curated visual stories delivered daily.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <a 
                  href="#feed" 
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-[#F4B400] text-[#104882] rounded-full font-bold text-base hover:bg-[#ffc107] transition-all duration-300 hover:scale-105 shadow-xl shadow-[#F4B400]/30"
                >
                  Start Exploring
                  <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </a>
                <a 
                  href="#" 
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white rounded-full font-bold text-base hover:bg-white hover:text-[#104882] transition-all duration-300"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F8FAFC] dark:from-[#0B1120] to-transparent" />
      </header>

      {/* Filter Bar */}
      <div className="sticky top-20 z-40 bg-white/80 dark:bg-[#1E293B]/80 backdrop-blur-xl border-y border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-[#104882] text-white shadow-lg shadow-[#104882]/30 scale-105'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Feed */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="feed">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article
              key={post.id}
              className="group bg-white dark:bg-[#1E293B] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-gray-800 animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Top Right Icons */}
                <div className="absolute top-3 right-3 flex gap-2">
                  {post.trending && (
                    <div className="px-2.5 py-1 bg-[#F4B400] text-[#104882] text-xs font-bold rounded-full flex items-center gap-1">
                      <TrendingUp size={12} />
                      Trending
                    </div>
                  )}
                  <button
                    onClick={() => toggleSave(post.id)}
                    className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                      savedPosts.includes(post.id)
                        ? 'bg-[#F4B400] text-[#104882]'
                        : 'bg-white/90 dark:bg-black/60 text-gray-600 dark:text-gray-300 hover:bg-[#F4B400] hover:text-[#104882]'
                    }`}
                  >
                    <Bookmark size={16} fill={savedPosts.includes(post.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>

                {/* Action Buttons on Hover */}
                <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <button className="flex-1 py-2 bg-white/90 backdrop-blur-sm text-[#104882] rounded-lg font-semibold text-sm hover:bg-white transition-colors">
                    Read More
                  </button>
                  <button className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors">
                    <Share2 size={18} className="text-[#104882]" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-3">
                {/* Meta */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2 py-1 bg-[#F4B400]/10 text-[#F4B400] font-bold uppercase tracking-wider rounded">
                    {post.category}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-500 dark:text-gray-400">{post.time}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#1E293B] dark:text-[#E2E8F0] leading-tight group-hover:text-[#104882] dark:group-hover:text-[#F4B400] transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
                  {post.description}
                </p>

                {/* Author */}
                <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.avatar}
                      alt={post.author}
                      className="w-10 h-10 rounded-full object-cover border-2 border-[#104882]/20"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[#1E293B] dark:text-[#E2E8F0]">
                        {post.author}
                      </p>
                      <p className="text-xs text-gray-500">Content Creator</p>
                    </div>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                      <Heart size={18} className="text-gray-400 hover:text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-16 text-center">
          <button className="group px-8 py-4 bg-transparent border-2 border-[#104882] dark:border-[#F4B400] text-[#104882] dark:text-[#F4B400] hover:bg-[#104882] hover:text-white dark:hover:bg-[#F4B400] dark:hover:text-[#104882] font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center gap-2">
            Load More Stories
            <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#104882] text-white pt-16 pb-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border-2 border-[#F4B400]">
                  <span className="text-[#F4B400] font-black text-xs transform -rotate-90">HEY</span>
                </div>
                <div className="font-black text-xl">
                  <span className="text-[#F4B400]">HEY!</span> MONGOL
                </div>
              </div>
              <p className="text-blue-200 text-sm leading-relaxed">
                Connecting the world to the beauty, history, and vibrant culture of Mongolia. Your window to the steppes.
              </p>
              <div className="flex gap-3 pt-2">
                {['facebook', 'instagram', 'twitter', 'youtube'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#F4B400] flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <span className="text-white text-xs font-bold">{social[0].toUpperCase()}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                Quick Links
                <div className="flex-1 h-px bg-[#F4B400]/30" />
              </h4>
              <ul className="space-y-2.5">
                {['About Us', 'Destinations', 'Culture Guide', 'Travel Tips', 'Contact'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-blue-100 hover:text-[#F4B400] transition-colors text-sm inline-flex items-center gap-2 group">
                      <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                Newsletter
                <div className="flex-1 h-px bg-[#F4B400]/30" />
              </h4>
              <p className="text-blue-200 text-sm mb-4">
                Subscribe for weekly updates from the land of blue sky.
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 bg-[#0a3566] border border-[#F4B400]/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-[#F4B400] transition-all"
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-[#F4B400] text-[#104882] font-bold rounded-lg hover:bg-[#ffc107] transition-all duration-300 hover:scale-105"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-blue-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-blue-300">
              <p>© 2026 Hey! Mongol. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-[#F4B400] transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-[#F4B400] transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease both;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
