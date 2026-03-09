import { useState } from 'react';
import { ChevronDown, ChevronUp, Shield, AlertTriangle } from 'lucide-react';

const STEPS = [
  {
    num: 1,
    title: 'Choose an Indian Exchange',
    icon: '🏦',
    content: `Pick a SEBI/FIU-registered exchange that supports INR deposits. Popular options include WazirX, CoinDCX, CoinSwitch Kuber, ZebPay, and Giottus. Compare fees, supported coins, and user interface before signing up.`,
    tip: 'Start with CoinDCX or WazirX — both have beginner-friendly apps and support UPI payments.',
  },
  {
    num: 2,
    title: 'Complete KYC Verification',
    icon: '🪪',
    content: `Indian law requires all crypto exchanges to verify your identity. You'll need your Aadhaar card, PAN card, and a selfie. KYC usually takes 15 minutes to 24 hours to complete.`,
    tip: 'Keep your PAN card handy — it\'s mandatory for tax reporting under Section 115BBH.',
  },
  {
    num: 3,
    title: 'Deposit INR via UPI/Bank',
    icon: '💰',
    content: `After KYC, deposit Indian Rupees using UPI (Google Pay, PhonePe, Paytm), IMPS, NEFT, or bank transfer. Most exchanges have zero deposit fees. Minimum deposit is usually ₹100.`,
    tip: 'UPI is the fastest — deposits reflect in under 1 minute on most exchanges.',
  },
  {
    num: 4,
    title: 'Place Your First Order',
    icon: '📈',
    content: `Go to the trading section, select a coin (start with BTC or ETH), and choose:\n\n• Market Order — Buy instantly at current price\n• Limit Order — Set your desired price and wait\n\nStart small (₹500-₹1000) to learn the process.`,
    tip: 'Use Limit Orders to get better prices. Never invest more than you can afford to lose.',
  },
  {
    num: 5,
    title: 'Secure Your Crypto',
    icon: '🔒',
    content: `Enable 2-Factor Authentication (2FA) on your exchange account immediately. For large holdings, transfer to a hardware wallet (Ledger, Trezor) or a self-custody wallet like Trust Wallet or MetaMask.`,
    tip: 'Never share your seed phrase or private keys with anyone. Store them offline on paper.',
  },
];

const EXCHANGES = [
  { name: 'WazirX', fee: '0.2%', upi: true, coins: '400+', rating: 4.2, color: '#2962ff' },
  { name: 'CoinDCX', fee: '0.1%', upi: true, coins: '500+', rating: 4.5, color: '#00c853' },
  { name: 'CoinSwitch', fee: '0.5%', upi: true, coins: '100+', rating: 4.3, color: '#ff6d00' },
  { name: 'ZebPay', fee: '0.15%', upi: true, coins: '200+', rating: 4.0, color: '#00bfa5' },
  { name: 'Giottus', fee: '0.1%', upi: true, coins: '300+', rating: 4.1, color: '#6200ea' },
];

export default function BuyGuide() {
  const [openStep, setOpenStep] = useState<number>(1);

  return (
    <div className="animate-fade-up">
      <h2 className="text-xl font-bold mb-1">🛒 How to Buy Crypto in India</h2>
      <p className="text-sm text-gray-400 mb-5">Complete step-by-step guide for beginners</p>

      {/* Important Notice */}
      <div className="glass-card p-4 mb-5 border-l-4 border-yellow-500">
        <div className="flex items-start gap-3">
          <AlertTriangle size={20} className="text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-yellow-400">Important Disclaimer</p>
            <p className="text-xs text-gray-400 mt-1">
              Crypto trading involves high risk. This guide is for educational purposes by Sujal Quantum Labs. Always do your own research (DYOR). Never invest money you can't afford to lose.
            </p>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-3 mb-6">
        {STEPS.map((step) => {
          const isOpen = openStep === step.num;
          return (
            <div key={step.num} className={`glass-card overflow-hidden transition-all ${isOpen ? 'neon-border' : ''}`}>
              <button
                onClick={() => setOpenStep(isOpen ? 0 : step.num)}
                className="w-full flex items-center gap-3 p-4"
              >
                <div className="step-number">{step.num}</div>
                <div className="flex-1 text-left">
                  <p className="font-bold text-white text-sm">{step.icon} {step.title}</p>
                </div>
                {isOpen ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
              </button>
              {isOpen && (
                <div className="px-4 pb-4 animate-fade-up">
                  <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">{step.content}</p>
                  <div className="mt-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3">
                    <p className="text-xs text-emerald-400 font-semibold">💡 Pro Tip</p>
                    <p className="text-xs text-emerald-300 mt-1">{step.tip}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Exchange Comparison */}
      <h3 className="text-lg font-bold mb-3">🏛️ Indian Exchanges Comparison</h3>
      <div className="space-y-3 mb-6">
        {EXCHANGES.map((ex) => (
          <div key={ex.name} className="glass-card p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white" style={{ background: ex.color }}>
                  {ex.name[0]}
                </div>
                <span className="font-bold text-white text-sm">{ex.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-yellow-400 text-xs">★</span>
                <span className="text-xs text-gray-300">{ex.rating}</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-[var(--dark1)] rounded-lg p-2">
                <p className="text-[10px] text-gray-500">Trading Fee</p>
                <p className="text-xs font-bold text-white">{ex.fee}</p>
              </div>
              <div className="bg-[var(--dark1)] rounded-lg p-2">
                <p className="text-[10px] text-gray-500">UPI</p>
                <p className="text-xs font-bold text-emerald-400">{ex.upi ? '✅ Yes' : '❌ No'}</p>
              </div>
              <div className="bg-[var(--dark1)] rounded-lg p-2">
                <p className="text-[10px] text-gray-500">Coins</p>
                <p className="text-xs font-bold text-white">{ex.coins}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Safety Tips */}
      <div className="glass-card p-4 neon-border">
        <div className="flex items-center gap-2 mb-3">
          <Shield size={18} className="text-emerald-400" />
          <h3 className="font-bold text-white text-sm">Safety Checklist</h3>
        </div>
        <div className="space-y-2">
          {[
            'Enable 2FA on your exchange account',
            'Use a unique, strong password',
            'Never share your seed phrase',
            'Start with small amounts (₹500-₹1000)',
            'Verify the website URL before logging in',
            'Beware of "guaranteed returns" scams',
          ].map((tip, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
              <span className="text-emerald-400">✓</span>
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-6">
        <span className="brand-badge gradient-text-alt">⚛ Guide by Sujal Quantum Labs</span>
      </div>
    </div>
  );
}
