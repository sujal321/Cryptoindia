import { useState, useEffect, useCallback } from 'react';
import { TrendingUp, TrendingDown, Star, RefreshCw, Search, ArrowUpDown } from 'lucide-react';

interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  sparkline_in_7d?: { price: number[] };
}

const FALLBACK_DATA: CoinData[] = [
  { id:'bitcoin', symbol:'btc', name:'Bitcoin', image:'', current_price:7245000, price_change_percentage_24h:2.35, market_cap:142000000000000, total_volume:3200000000000, high_24h:7300000, low_24h:7100000 },
  { id:'ethereum', symbol:'eth', name:'Ethereum', image:'', current_price:312000, price_change_percentage_24h:1.82, market_cap:37500000000000, total_volume:1800000000000, high_24h:315000, low_24h:305000 },
  { id:'tether', symbol:'usdt', name:'Tether', image:'', current_price:84.2, price_change_percentage_24h:0.01, market_cap:11200000000000, total_volume:5600000000000, high_24h:84.5, low_24h:83.9 },
  { id:'binancecoin', symbol:'bnb', name:'BNB', image:'', current_price:52500, price_change_percentage_24h:-0.45, market_cap:8100000000000, total_volume:180000000000, high_24h:53000, low_24h:51800 },
  { id:'solana', symbol:'sol', name:'Solana', image:'', current_price:14200, price_change_percentage_24h:4.12, market_cap:6500000000000, total_volume:320000000000, high_24h:14500, low_24h:13600 },
  { id:'ripple', symbol:'xrp', name:'XRP', image:'', current_price:195, price_change_percentage_24h:-1.23, market_cap:10100000000000, total_volume:250000000000, high_24h:200, low_24h:192 },
  { id:'cardano', symbol:'ada', name:'Cardano', image:'', current_price:62.5, price_change_percentage_24h:3.45, market_cap:2200000000000, total_volume:75000000000, high_24h:64, low_24h:60 },
  { id:'dogecoin', symbol:'doge', name:'Dogecoin', image:'', current_price:17.5, price_change_percentage_24h:-2.1, market_cap:2500000000000, total_volume:120000000000, high_24h:18.2, low_24h:17.1 },
  { id:'polkadot', symbol:'dot', name:'Polkadot', image:'', current_price:590, price_change_percentage_24h:1.5, market_cap:850000000000, total_volume:32000000000, high_24h:600, low_24h:575 },
  { id:'polygon', symbol:'matic', name:'Polygon', image:'', current_price:48, price_change_percentage_24h:5.2, market_cap:450000000000, total_volume:28000000000, high_24h:50, low_24h:45 },
];

const EMOJI_MAP: Record<string, string> = {
  bitcoin: '₿', ethereum: 'Ξ', tether: '₮', binancecoin: '◆', solana: '◎',
  ripple: '✕', cardano: '◇', dogecoin: '🐕', polkadot: '●', polygon: '⬡',
};

export default function Dashboard() {
  const [coins, setCoins] = useState<CoinData[]>(FALLBACK_DATA);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [filter, setFilter] = useState<'all'|'fav'|'gain'|'lose'>('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [expanded, setExpanded] = useState<string|null>(null);

  const fetchCoins = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=12&page=1&sparkline=true&price_change_percentage=24h');
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) setCoins(data);
      }
    } catch {
      // use fallback
    }
    setLoading(false);
    setLastUpdate(new Date());
  }, []);

  useEffect(() => {
    fetchCoins();
    const interval = setInterval(fetchCoins, 90000);
    return () => clearInterval(interval);
  }, [fetchCoins]);

  const toggleFav = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const formatINR = (n: number) => {
    if (n >= 10000000) return '₹' + (n/10000000).toFixed(2) + ' Cr';
    if (n >= 100000) return '₹' + (n/100000).toFixed(2) + ' L';
    if (n >= 1000) return '₹' + n.toLocaleString('en-IN', { maximumFractionDigits: 2 });
    return '₹' + n.toFixed(2);
  };

  const filtered = coins.filter(c => {
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.symbol.toLowerCase().includes(search.toLowerCase())) return false;
    if (filter === 'fav') return favorites.includes(c.id);
    if (filter === 'gain') return c.price_change_percentage_24h > 0;
    if (filter === 'lose') return c.price_change_percentage_24h < 0;
    return true;
  });

  const MiniChart = ({ data, positive }: { data?: number[]; positive: boolean }) => {
    if (!data || data.length === 0) return null;
    const sample = data.filter((_, i) => i % 4 === 0);
    const min = Math.min(...sample);
    const max = Math.max(...sample);
    const range = max - min || 1;
    const h = 40;
    const w = 100;
    const points = sample.map((v, i) => `${(i / (sample.length - 1)) * w},${h - ((v - min) / range) * h}`).join(' ');
    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-10">
        <polyline fill="none" stroke={positive ? '#00ff88' : '#ef4444'} strokeWidth="1.5" points={points} />
      </svg>
    );
  };

  return (
    <div className="animate-fade-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold">📊 Live Dashboard</h2>
          <p className="text-xs text-gray-400 mt-1">
            Updated: {lastUpdate.toLocaleTimeString('en-IN')}
          </p>
        </div>
        <button onClick={fetchCoins} disabled={loading} className="p-2 rounded-full glass neon-border">
          <RefreshCw size={18} className={`text-emerald-400 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Ticker */}
      <div className="ticker-wrap rounded-xl glass mb-4 py-2">
        <div className="ticker-content">
          {[...coins, ...coins].map((c, i) => (
            <span key={i} className="inline-flex items-center gap-2 px-4 text-sm">
              <span className="font-bold text-white">{c.symbol.toUpperCase()}</span>
              <span className="text-gray-300">{formatINR(c.current_price)}</span>
              <span className={c.price_change_percentage_24h >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                {c.price_change_percentage_24h >= 0 ? '▲' : '▼'} {Math.abs(c.price_change_percentage_24h).toFixed(2)}%
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-3">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search coins..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[var(--dark3)] border border-gray-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
        {([['all','All'], ['fav','⭐ Favorites'], ['gain','📈 Gainers'], ['lose','📉 Losers']] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${filter === key ? 'tab-active' : 'glass text-gray-300'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Coin List */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            <ArrowUpDown size={32} className="mx-auto mb-2 opacity-50" />
            <p>No coins found</p>
          </div>
        )}
        {filtered.map((coin, idx) => {
          const positive = coin.price_change_percentage_24h >= 0;
          const isExpanded = expanded === coin.id;
          return (
            <div key={coin.id} className="glass-card p-4 cursor-pointer transition-all hover:scale-[1.01]" style={{ animationDelay: `${idx * 50}ms` }}
              onClick={() => setExpanded(isExpanded ? null : coin.id)}
            >
              <div className="flex items-center gap-3">
                {/* Icon */}
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
                  style={{ background: `linear-gradient(135deg, ${positive ? '#00ff88' : '#ef4444'}33, ${positive ? '#00d4ff' : '#ff6b6b'}33)` }}>
                  {coin.image ? <img src={coin.image} alt={coin.name} className="w-7 h-7 rounded-full" /> : EMOJI_MAP[coin.id] || '●'}
                </div>

                {/* Name */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{coin.name}</span>
                    <span className="text-[10px] text-gray-500 uppercase">{coin.symbol}</span>
                  </div>
                  <div className="w-20 mt-1">
                    <MiniChart data={coin.sparkline_in_7d?.price} positive={positive} />
                  </div>
                </div>

                {/* Price */}
                <div className="text-right">
                  <p className="font-bold text-white text-sm">{formatINR(coin.current_price)}</p>
                  <div className={`flex items-center justify-end gap-1 text-xs mt-0.5 ${positive ? 'text-emerald-400' : 'text-red-400'}`}>
                    {positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    <span>{positive ? '+' : ''}{coin.price_change_percentage_24h.toFixed(2)}%</span>
                  </div>
                </div>

                {/* Favorite */}
                <button onClick={(e) => { e.stopPropagation(); toggleFav(coin.id); }} className="ml-1">
                  <Star size={18} className={favorites.includes(coin.id) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'} />
                </button>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="mt-4 pt-3 border-t border-gray-700/50 animate-fade-up grid grid-cols-2 gap-3">
                  <div className="bg-[var(--dark1)] rounded-xl p-3">
                    <p className="text-[10px] text-gray-500 uppercase">24h High</p>
                    <p className="text-sm font-bold text-emerald-400">{formatINR(coin.high_24h)}</p>
                  </div>
                  <div className="bg-[var(--dark1)] rounded-xl p-3">
                    <p className="text-[10px] text-gray-500 uppercase">24h Low</p>
                    <p className="text-sm font-bold text-red-400">{formatINR(coin.low_24h)}</p>
                  </div>
                  <div className="bg-[var(--dark1)] rounded-xl p-3">
                    <p className="text-[10px] text-gray-500 uppercase">Market Cap</p>
                    <p className="text-sm font-bold text-white">{formatINR(coin.market_cap)}</p>
                  </div>
                  <div className="bg-[var(--dark1)] rounded-xl p-3">
                    <p className="text-[10px] text-gray-500 uppercase">24h Volume</p>
                    <p className="text-sm font-bold text-white">{formatINR(coin.total_volume)}</p>
                  </div>
                  {coin.sparkline_in_7d && coin.sparkline_in_7d.price.length > 0 && (
                    <div className="col-span-2 bg-[var(--dark1)] rounded-xl p-3">
                      <p className="text-[10px] text-gray-500 uppercase mb-1">7 Day Chart</p>
                      <MiniChart data={coin.sparkline_in_7d.price} positive={positive} />
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Sujal Quantum Labs Badge */}
      <div className="text-center mt-6 mb-2">
        <span className="brand-badge gradient-text-alt">⚛ Powered by Sujal Quantum Labs</span>
      </div>
    </div>
  );
}
