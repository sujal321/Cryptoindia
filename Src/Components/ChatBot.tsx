import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

const KB: Record<string, string> = {
  'buy|kharid|purchase|kaise': `🛒 **How to Buy Crypto in India:**\n\n1️⃣ Download an Indian exchange app (WazirX, CoinDCX, CoinSwitch)\n2️⃣ Complete KYC with Aadhaar + PAN\n3️⃣ Deposit INR via UPI or bank transfer\n4️⃣ Search for the coin (BTC, ETH, etc.)\n5️⃣ Place a buy order (Market or Limit)\n\n💡 Start with ₹500-₹1000 to learn!\n\n— Sujal Quantum Labs`,

  'sell|bech|convert|withdraw': `💰 **How to Sell Crypto:**\n\n1️⃣ Open your exchange app\n2️⃣ Go to your portfolio\n3️⃣ Select the coin → tap "Sell"\n4️⃣ Choose Market or Limit order\n5️⃣ INR goes to exchange wallet\n6️⃣ Withdraw to bank (IMPS/NEFT)\n\n⚠️ Remember: 30% tax on profits + 1% TDS\n\n— Sujal Quantum Labs`,

  'tax|kar|115bbh|tds|194s': `📋 **Crypto Tax in India:**\n\n🔴 30% flat tax on profits (Section 115BBH)\n🔵 1% TDS on transactions (Section 194S)\n🟣 4% Health & Education Cess\n\n📝 Effective rate: ~31.2%\n\n❌ No loss carry-forward\n❌ No offset against other income\n❌ No deductions except cost of acquisition\n\nFile under "Schedule VDA" in ITR-2/ITR-3\n\n— Sujal Quantum Labs`,

  'exchange|platform|app|wazirx|coindcx|coinswitch|zebpay': `🏛️ **Top Indian Exchanges:**\n\n1. **CoinDCX** — 500+ coins, 0.1% fee, best for beginners\n2. **WazirX** — 400+ coins, 0.2% fee, largest user base\n3. **CoinSwitch** — 100+ coins, simple UI\n4. **ZebPay** — 200+ coins, since 2014\n5. **Giottus** — 300+ coins, low fees\n\nAll support UPI deposits & bank withdrawals 🇮🇳\n\n— Sujal Quantum Labs`,

  'wallet|safe|secure|store|hardware': `🔒 **Crypto Wallet Guide:**\n\n**Hot Wallets (Online):**\n• Trust Wallet — Mobile, easy\n• MetaMask — Browser + Mobile\n• Exchange wallet — Convenient but risky\n\n**Cold Wallets (Offline - Safest):**\n• Ledger Nano S/X — ₹5,000-₹12,000\n• Trezor — ₹7,000-₹15,000\n\n⚠️ NEVER share your seed phrase!\n\n— Sujal Quantum Labs`,

  'kyc|aadhaar|pan|verification|verify': `🪪 **KYC Requirements:**\n\n📄 Documents needed:\n• Aadhaar Card (for identity)\n• PAN Card (mandatory for tax)\n• Selfie/Photo (liveness check)\n\n⏱️ Time: 15 min to 24 hours\n\nAll Indian exchanges require KYC by law (PMLA Act). No KYC = No trading.\n\n— Sujal Quantum Labs`,

  'upi|deposit|paytm|gpay|phonepe|bank': `💳 **Deposit Methods:**\n\n✅ UPI (Google Pay, PhonePe, Paytm) — Instant\n✅ IMPS — Within minutes\n✅ NEFT — 2-4 hours\n✅ Bank Transfer — 1-2 days\n\n💡 UPI is fastest! Most exchanges have zero deposit fees.\nMinimum deposit: Usually ₹100\n\n— Sujal Quantum Labs`,

  'bitcoin|btc': `₿ **Bitcoin (BTC):**\n\n• World's first cryptocurrency (2009)\n• Created by Satoshi Nakamoto\n• Max supply: 21 million BTC\n• Halving every 4 years\n• Known as "Digital Gold"\n\n📊 Great for long-term holding (HODL)\n⚠️ Very volatile — can drop 30-50% in crashes\n\n— Sujal Quantum Labs`,

  'ethereum|eth': `Ξ **Ethereum (ETH):**\n\n• Smart contract platform\n• Created by Vitalik Buterin (2015)\n• Powers DeFi, NFTs, and dApps\n• Moved to Proof of Stake (2022)\n• No max supply cap\n\n📊 Second largest crypto by market cap\n💡 Essential for DeFi and NFT ecosystem\n\n— Sujal Quantum Labs`,

  'start|shuru|beginner|new|naya': `🚀 **Beginner's Roadmap:**\n\n1️⃣ Learn basics (what is blockchain, crypto)\n2️⃣ Download CoinDCX or WazirX\n3️⃣ Complete KYC\n4️⃣ Start with ₹500 in Bitcoin\n5️⃣ Learn chart reading basics\n6️⃣ Never invest more than 5-10% of savings\n7️⃣ HODL for long term (1+ years)\n\n📚 Key rule: Only invest what you can afford to lose!\n\n— Sujal Quantum Labs`,

  'legal|rbi|ban|sebi|regulation|law': `⚖️ **Crypto Legality in India:**\n\n✅ Crypto is LEGAL in India\n✅ Supreme Court lifted RBI ban in 2020\n✅ Taxed under Finance Act 2022\n✅ Regulated under PMLA (March 2023)\n\n📝 Current status:\n• Not legal tender (can't use for payments)\n• Treated as Virtual Digital Assets (VDA)\n• Exchanges must register with FIU-IND\n\n— Sujal Quantum Labs`,

  'risk|danger|loss|scam': `⚠️ **Crypto Risks:**\n\n🔴 Extreme price volatility (50%+ drops)\n🔴 No investor protection like stocks\n🔴 Scams & fake projects common\n🔴 Exchange hacks possible\n🔴 Regulatory uncertainty\n\n🛡️ **Stay Safe:**\n• Never invest borrowed money\n• Use only registered exchanges\n• Enable 2FA everywhere\n• Beware of "guaranteed returns"\n• Research before buying any coin\n\n— Sujal Quantum Labs`,

  'defi|staking|yield|earn': `🏦 **DeFi & Earning:**\n\n• **Staking** — Lock coins to earn 5-15% APY\n• **Lending** — Lend crypto for interest\n• **Yield Farming** — Provide liquidity\n• **Airdrops** — Free tokens for early users\n\n⚠️ DeFi risks: Smart contract bugs, rug pulls\n⚠️ All DeFi income is taxable in India!\n\n— Sujal Quantum Labs`,

  'nft|art|digital': `🎨 **NFTs in India:**\n\n• Non-Fungible Tokens — unique digital assets\n• Can be art, music, collectibles\n• Platforms: OpenSea, Rarible, WazirX NFT\n• Taxed same as crypto (30% on profits)\n\n💡 NFT market has cooled down significantly. Be cautious.\n\n— Sujal Quantum Labs`,

  'hello|hi|hey|namaste|hola': `🙏 Namaste! Welcome to CryptoIndia Assistant!\n\nI'm your AI guide by **Sujal Quantum Labs** 🔬\n\nI can help you with:\n🛒 How to buy crypto\n💰 How to sell crypto\n📋 Tax information\n🏛️ Exchange recommendations\n🔒 Wallet & security\n📈 Coin information\n\nJust ask me anything about crypto in India! 🇮🇳`,
};

const QUICK_QS = [
  '🛒 How to buy?',
  '💰 How to sell?',
  '📋 Tax rules?',
  '🏛️ Best exchange?',
  '🔒 Wallet guide',
  '⚖️ Is crypto legal?',
  '🚀 Beginner tips',
  '⚠️ Risks?',
];

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: `🙏 Namaste! I'm your **CryptoIndia AI Assistant**!\n\nCreated by **Sujal Quantum Labs** ⚛️\n\nAsk me anything about crypto trading in India — buying, selling, taxes, exchanges, wallets, and more!\n\nTap a quick question below or type your own 👇` },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const getResponse = (q: string): string => {
    const lower = q.toLowerCase();
    for (const [keys, response] of Object.entries(KB)) {
      const keywords = keys.split('|');
      if (keywords.some(k => lower.includes(k))) {
        return response;
      }
    }
    return `🤔 I'm not sure about that specific topic.\n\nHere's what I can help with:\n• Buying crypto\n• Selling crypto\n• Tax rules\n• Exchanges\n• Wallets & security\n• Specific coins (BTC, ETH)\n• Legal status\n• DeFi & staking\n\nTry asking about one of these topics!\n\n— Sujal Quantum Labs 🔬`;
  };

  const handleSend = (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;

    setMessages(prev => [...prev, { role: 'user', text: msg }]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const response = getResponse(msg);
      setMessages(prev => [...prev, { role: 'bot', text: response }]);
      setTyping(false);
    }, 800 + Math.random() * 800);
  };

  const formatText = (text: string) => {
    return text.split('\n').map((line, i) => {
      const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>');
      return <p key={i} className="text-sm" dangerouslySetInnerHTML={{ __html: formatted || '&nbsp;' }} />;
    });
  };

  return (
    <div className="flex flex-col h-[calc(100dvh-140px)] animate-fade-up">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center">
          <Bot size={20} className="text-gray-900" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-white flex items-center gap-1">
            CryptoIndia AI
            <Sparkles size={14} className="text-yellow-400" />
          </h2>
          <p className="text-[10px] text-gray-400">by Sujal Quantum Labs • Always online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 pb-2 no-scrollbar">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-end gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-purple-500/30' : 'bg-emerald-500/30'}`}>
                {msg.role === 'user' ? <User size={12} className="text-purple-400" /> : <Bot size={12} className="text-emerald-400" />}
              </div>
              <div className={`px-4 py-3 ${msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'}`}>
                <div className={msg.role === 'user' ? 'text-gray-900' : 'text-gray-300'}>
                  {formatText(msg.text)}
                </div>
              </div>
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex justify-start">
            <div className="flex items-end gap-2 max-w-[85%]">
              <div className="w-6 h-6 rounded-full bg-emerald-500/30 flex items-center justify-center flex-shrink-0">
                <Bot size={12} className="text-emerald-400" />
              </div>
              <div className="chat-bubble-bot px-4 py-3 flex gap-1.5">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick Questions */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
        {QUICK_QS.map((q) => (
          <button
            key={q}
            onClick={() => handleSend(q)}
            className="glass px-3 py-1.5 rounded-full text-[11px] font-medium text-gray-300 whitespace-nowrap hover:text-white transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2 mt-1">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about crypto in India..."
          className="flex-1 bg-[var(--dark3)] border border-gray-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
        />
        <button
          onClick={() => handleSend()}
          className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center"
        >
          <Send size={18} className="text-gray-900" />
        </button>
      </div>
    </div>
  );
}
