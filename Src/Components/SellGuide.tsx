import { useState } from 'react';
import { ChevronDown, ChevronUp, AlertCircle, Lightbulb } from 'lucide-react';

const STEPS = [
  {
    num: 1,
    title: 'Go to Your Exchange',
    icon: '📱',
    content: `Open your exchange app (WazirX, CoinDCX, etc.) and navigate to your portfolio/wallet section. You'll see all your holdings with current prices and profit/loss.`,
    tip: 'Check the coin\'s 24h chart and volume before selling. Low volume means higher slippage.',
  },
  {
    num: 2,
    title: 'Place a Sell Order',
    icon: '📊',
    content: `Select the coin you want to sell and tap "Sell". Choose your order type:\n\n• Market Order — Sell instantly at current market price\n• Limit Order — Set a target price and sell when reached\n• Stop-Loss — Automatically sell if price drops to your set level`,
    tip: 'Use Limit Orders to sell at your desired price. For urgent sales, use Market Orders.',
  },
  {
    num: 3,
    title: 'INR Credits to Wallet',
    icon: '💵',
    content: `Once your order is executed, INR will be credited to your exchange wallet instantly. You can see the balance update in real-time. Note: 1% TDS is deducted automatically on the sale amount.`,
    tip: 'The 30% tax on profits is your responsibility to pay during ITR filing. Keep records!',
  },
  {
    num: 4,
    title: 'Withdraw to Bank Account',
    icon: '🏦',
    content: `Go to "Withdraw" → select INR → enter the amount → choose your linked bank account. Withdrawals typically take:\n\n• IMPS: 15-30 minutes\n• NEFT: 2-4 hours\n• Bank Transfer: 1-2 business days\n\nMost exchanges charge ₹5-₹15 for INR withdrawal.`,
    tip: 'Always double-check your bank account number before withdrawing. Transactions are irreversible.',
  },
];

const STRATEGIES = [
  {
    name: '🎯 Take Profit Strategy',
    desc: 'Set multiple sell targets (e.g., sell 25% at 2x, 25% at 3x, 25% at 5x). This way you lock in profits while keeping upside exposure.',
    color: 'emerald',
  },
  {
    name: '🛡️ Stop-Loss Strategy',
    desc: 'Always set a stop-loss 10-15% below your buy price. This automatically sells your coin if it drops, limiting your losses.',
    color: 'blue',
  },
  {
    name: '📐 DCA Out Strategy',
    desc: 'Dollar-Cost Average your sells. Instead of selling everything at once, sell in small portions over days or weeks to get an average exit price.',
    color: 'purple',
  },
];

export default function SellGuide() {
  const [openStep, setOpenStep] = useState<number>(1);

  return (
    <div className="animate-fade-up">
      <h2 className="text-xl font-bold mb-1">💰 How to Sell Crypto in India</h2>
      <p className="text-sm text-gray-400 mb-5">Convert your crypto back to INR safely</p>

      {/* Tax Reminder */}
      <div className="glass-card p-4 mb-5 border-l-4 border-red-500">
        <div className="flex items-start gap-3">
          <AlertCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-red-400">⚠️ Tax Reminder</p>
            <p className="text-xs text-gray-400 mt-1">
              As per Indian law (Section 115BBH), 30% tax + 4% cess applies on crypto profits. 1% TDS is deducted at source. Keep all transaction records for ITR filing.
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

      {/* Selling Strategies */}
      <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
        <Lightbulb size={18} className="text-yellow-400" />
        Smart Selling Strategies
      </h3>
      <div className="space-y-3 mb-6">
        {STRATEGIES.map((s, i) => (
          <div key={i} className="glass-card p-4">
            <p className="font-bold text-white text-sm mb-2">{s.name}</p>
            <p className="text-xs text-gray-300 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* Warning */}
      <div className="glass-card p-4 border-l-4 border-orange-500">
        <p className="text-sm font-bold text-orange-400 mb-2">🚫 Common Mistakes to Avoid</p>
        <div className="space-y-2">
          {[
            'Panic selling during market dips',
            'Not setting stop-loss orders',
            'Selling everything at once instead of DCA',
            'Forgetting to account for taxes in profits',
            'Selling based on social media hype/fear',
            'Not keeping transaction records',
          ].map((m, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
              <span className="text-orange-400">✕</span>
              <span>{m}</span>
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
