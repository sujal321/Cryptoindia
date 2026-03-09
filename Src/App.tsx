import { useState, useEffect } from 'react';
import { Home, BarChart3, ShoppingCart, Banknote, FileText, MessageCircle, TrendingUp, Shield, Zap, BookOpen, ArrowRight, ChevronRight, Atom } from 'lucide-react';
import Dashboard from './components/Dashboard';
import BuyGuide from './components/BuyGuide';
import SellGuide from './components/SellGuide';
import TaxGuide from './components/TaxGuide';
import ChatBot from './components/ChatBot';

type Page = 'home' | 'dashboard' | 'buy' | 'sell' | 'tax' | 'chat';

const NAV_ITEMS: { id: Page; icon: typeof Home; label: string }[] = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'dashboard', icon: BarChart3, label: 'Live' },
  { id: 'buy', icon: ShoppingCart, label: 'Buy' },
  { id: 'sell', icon: Banknote, label: 'Sell' },
  { id: 'tax', icon: FileText, label: 'Tax' },
  { id: 'chat', icon: MessageCircle, label: 'AI Chat' },
];

const FEATURES = [
  { icon: '📊', title: 'Live Dashboard', desc: 'Real-time crypto prices in INR', page: 'dashboard' as Page, color: 'from-emerald-500/20 to-cyan-500/20' },
  { icon: '🛒', title: 'Buy Guide', desc: 'Step-by-step buying tutorial', page: 'buy' as Page, color: 'from-blue-500/20 to-purple-500/20' },
  { icon: '💰', title: 'Sell Guide', desc: 'Sell crypto & withdraw to bank', page: 'sell' as Page, color: 'from-orange-500/20 to-red-500/20' },
  { icon: '📋', title: 'Tax Calculator', desc: 'Calculate 30% tax + TDS instantly', page: 'tax' as Page, color: 'from-pink-500/20 to-red-500/20' },
  { icon: '🤖', title: 'AI Assistant', desc: 'Ask anything about crypto India', page: 'chat' as Page, color: 'from-purple-500/20 to-pink-500/20' },
  { icon: '🏛️', title: 'Exchange Guide', desc: 'Compare WazirX, CoinDCX & more', page: 'buy' as Page, color: 'from-cyan-500/20 to-blue-500/20' },
];

const FACTS = [
  '🇮🇳 India has 100M+ crypto holders',
  '📊 30% flat tax on crypto profits',
  '🔵 1% TDS on all transactions',
  '⚖️ Crypto is legal since SC ruling 2020',
  '🏦 UPI deposit available on all exchanges',
  '₿ Bitcoin was created in 2009',
  '💎 India ranks #1 in crypto adoption',
  '🔒 Always use 2FA for security',
];

function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="animate-fade-up">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl mb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/30 via-cyan-600/20 to-purple-600/30 animate-gradient"></div>
        <div className="absolute inset-0 bg-[var(--dark1)]/60"></div>
        <div className="relative px-5 py-8 text-center">
          {/* Brand Badge */}
          <div className="inline-flex items-center gap-1.5 brand-badge mb-4">
            <Atom size={12} className="text-purple-400" />
            <span className="gradient-text-alt">Sujal Quantum Labs</span>
          </div>

          <h1 className="text-3xl font-black mb-2">
            <span className="gradient-text font-orbitron">Crypto</span>
            <span className="text-white font-orbitron">India</span>
          </h1>
          <p className="text-sm text-gray-300 mb-1">
            Your Complete Guide to Crypto Trading in India 🇮🇳
          </p>
          <p className="text-xs text-gray-500 mb-5">
            Buy • Sell • Learn • Track — All in One Place
          </p>

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setPage('dashboard')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-gray-900 font-bold text-sm flex items-center gap-2"
            >
              <BarChart3 size={16} /> Live Prices
            </button>
            <button
              onClick={() => setPage('buy')}
              className="px-5 py-2.5 rounded-xl glass neon-border text-emerald-400 font-bold text-sm flex items-center gap-2"
            >
              Start Trading <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Scrolling Ticker */}
      <div className="ticker-wrap rounded-xl glass py-2 mb-6">
        <div className="ticker-content">
          {[...FACTS, ...FACTS].map((fact, i) => (
            <span key={i} className="inline-block px-6 text-xs text-gray-300 whitespace-nowrap">
              {fact}
            </span>
          ))}
        </div>
      </div>

      {/* Feature Cards */}
      <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
        <Zap size={18} className="text-yellow-400" />
        Explore Features
      </h2>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {FEATURES.map((f, i) => (
          <button
            key={i}
            onClick={() => setPage(f.page)}
            className="glass-card p-4 text-left transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center text-lg mb-2`}>
              {f.icon}
            </div>
            <p className="text-sm font-bold text-white mb-0.5">{f.title}</p>
            <p className="text-[10px] text-gray-400">{f.desc}</p>
            <ChevronRight size={14} className="text-gray-600 mt-1" />
          </button>
        ))}
      </div>

      {/* Why Crypto */}
      <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
        <TrendingUp size={18} className="text-emerald-400" />
        Why Trade Crypto?
      </h2>
      <div className="space-y-3 mb-6">
        {[
          { icon: '🌍', title: '24/7 Market', desc: 'Trade anytime — crypto markets never close, unlike stock markets' },
          { icon: '💸', title: 'Start Small', desc: 'Begin with as little as ₹100 — no minimum investment required' },
          { icon: '🚀', title: 'High Growth', desc: 'Bitcoin grew from ₹1 to ₹72 lakhs — massive potential returns' },
          { icon: '🔗', title: 'Decentralized', desc: 'No bank or government controls — truly peer-to-peer finance' },
        ].map((item, i) => (
          <div key={i} className="glass-card p-4 flex items-start gap-3">
            <div className="text-2xl">{item.icon}</div>
            <div>
              <p className="text-sm font-bold text-white">{item.title}</p>
              <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Start */}
      <div className="glass-card p-5 neon-border mb-6">
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <BookOpen size={16} className="text-emerald-400" />
          Quick Start Guide
        </h3>
        <div className="space-y-3">
          {[
            { step: '1', text: 'Download CoinDCX or WazirX app', time: '2 min' },
            { step: '2', text: 'Complete KYC (Aadhaar + PAN)', time: '15 min' },
            { step: '3', text: 'Deposit ₹500 via UPI', time: '1 min' },
            { step: '4', text: 'Buy your first Bitcoin!', time: '30 sec' },
          ].map((s) => (
            <div key={s.step} className="flex items-center gap-3">
              <div className="step-number w-8 h-8 text-sm">{s.step}</div>
              <div className="flex-1">
                <p className="text-xs text-gray-200 font-medium">{s.text}</p>
              </div>
              <span className="text-[10px] text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">{s.time}</span>
            </div>
          ))}
        </div>
        <button
          onClick={() => setPage('buy')}
          className="w-full mt-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-gray-900 font-bold text-sm"
        >
          📖 Read Full Guide
        </button>
      </div>

      {/* Safety Section */}
      <div className="glass-card p-4 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Shield size={18} className="text-blue-400" />
          <h3 className="text-sm font-bold text-white">Safety First</h3>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            '🔐 Enable 2FA',
            '🚫 No seed sharing',
            '📉 Invest wisely',
            '🔍 DYOR always',
            '💼 Use hardware wallet',
            '⚠️ Beware scams',
          ].map((tip, i) => (
            <div key={i} className="bg-[var(--dark1)] rounded-lg p-2.5 text-xs text-gray-300 text-center">
              {tip}
            </div>
          ))}
        </div>
      </div>

      {/* Ask AI */}
      <button
        onClick={() => setPage('chat')}
        className="w-full glass-card p-4 flex items-center gap-3 mb-6 hover:scale-[1.01] transition-all"
      >
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center animate-float">
          <span className="text-xl">🤖</span>
        </div>
        <div className="flex-1 text-left">
          <p className="text-sm font-bold text-white">Got Questions?</p>
          <p className="text-xs text-gray-400">Ask our AI assistant anything about crypto!</p>
        </div>
        <ChevronRight size={18} className="text-gray-500" />
      </button>

      {/* Footer */}
      <footer className="text-center pb-6">
        <div className="glass-card p-5 rounded-2xl">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Atom size={20} className="text-purple-400" />
            <span className="font-orbitron text-sm font-bold gradient-text-alt">Sujal Quantum Labs</span>
          </div>
          <p className="text-[10px] text-gray-500 mb-2">Created with ❤️ by Sujal Quantum Labs</p>
          <div className="flex items-center justify-center gap-2 text-[10px] text-gray-600">
            <span>© 2024 Sujal Quantum Labs</span>
            <span>•</span>
            <span>All Rights Reserved</span>
          </div>
          <p className="text-[9px] text-gray-600 mt-2">
            Disclaimer: This is for educational purposes only. Not financial advice. Crypto trading involves risk.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const pageTitle: Record<Page, string> = {
    home: '🇮🇳 CryptoIndia',
    dashboard: '📊 Live Dashboard',
    buy: '🛒 Buy Guide',
    sell: '💰 Sell Guide',
    tax: '📋 Tax Guide',
    chat: '🤖 AI Chat',
  };

  return (
    <div className="min-h-[100dvh] bg-[var(--dark1)] max-w-lg mx-auto relative">
      {/* Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-xl shadow-black/20' : 'bg-transparent'}`}>
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <h1 className="text-sm font-bold text-white">{pageTitle[page]}</h1>
            <div className="flex items-center gap-1 mt-0.5">
              <Atom size={10} className="text-purple-400" />
              <span className="text-[9px] text-gray-500 font-medium">by Sujal Quantum Labs</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-[10px] text-emerald-400 font-medium">Live</span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 pb-24 pt-2">
        {page === 'home' && <HomePage setPage={setPage} />}
        {page === 'dashboard' && <Dashboard />}
        {page === 'buy' && <BuyGuide />}
        {page === 'sell' && <SellGuide />}
        {page === 'tax' && <TaxGuide />}
        {page === 'chat' && <ChatBot />}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg z-50 glass border-t border-gray-800/50">
        <div className="flex items-center justify-around px-2 py-1.5">
          {NAV_ITEMS.map(({ id, icon: Icon, label }) => {
            const isActive = page === id;
            return (
              <button
                key={id}
                onClick={() => setPage(id)}
                className={`relative flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition-all ${isActive ? 'nav-item-active' : 'text-gray-500'}`}
              >
                {isActive && <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-emerald-400 rounded-full"></div>}
                <Icon size={isActive ? 22 : 20} strokeWidth={isActive ? 2.5 : 1.5} />
                <span className={`text-[9px] font-medium ${isActive ? 'text-emerald-400' : 'text-gray-500'}`}>{label}</span>
              </button>
            );
          })}
        </div>
        {/* Safe area padding for notch phones */}
        <div className="h-[env(safe-area-inset-bottom)]"></div>
      </nav>
    </div>
  );
}
