import { useState } from 'react';
import { Calculator, FileText, AlertTriangle, IndianRupee } from 'lucide-react';

export default function TaxGuide() {
  const [buyPrice, setBuyPrice] = useState('');
  const [sellPrice, setSellPrice] = useState('');

  const buy = parseFloat(buyPrice) || 0;
  const sell = parseFloat(sellPrice) || 0;
  const profit = sell - buy;
  const tax30 = profit > 0 ? profit * 0.30 : 0;
  const cess = tax30 * 0.04;
  const totalTax = tax30 + cess;
  const tds = sell * 0.01;
  const netProfit = profit - totalTax;

  return (
    <div className="animate-fade-up">
      <h2 className="text-xl font-bold mb-1">📋 Crypto Tax Guide India</h2>
      <p className="text-sm text-gray-400 mb-5">Everything about crypto taxation in India (2024-25)</p>

      {/* Key Rules */}
      <div className="space-y-3 mb-6">
        {/* 30% Tax */}
        <div className="glass-card p-4 border-l-4 border-red-500">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-lg font-black text-red-400">30%</span>
            </div>
            <div>
              <p className="text-sm font-bold text-white">Section 115BBH — Flat 30% Tax</p>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Any profit from selling, trading, or transferring crypto/VDA (Virtual Digital Assets) is taxed at a flat 30% rate. This applies regardless of your income slab. No deductions are allowed except cost of acquisition.
              </p>
              <div className="mt-2 bg-red-500/10 rounded-lg p-2">
                <p className="text-[10px] text-red-300">⚠️ You CANNOT offset crypto losses against other income or even other crypto profits.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 1% TDS */}
        <div className="glass-card p-4 border-l-4 border-blue-500">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-lg font-black text-blue-400">1%</span>
            </div>
            <div>
              <p className="text-sm font-bold text-white">Section 194S — 1% TDS</p>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                1% TDS (Tax Deducted at Source) is automatically deducted by the exchange on every crypto transaction above ₹50,000/year (₹10,000 for specified persons). This is adjustable against your final tax liability.
              </p>
              <div className="mt-2 bg-blue-500/10 rounded-lg p-2">
                <p className="text-[10px] text-blue-300">ℹ️ TDS is deducted by the exchange automatically. You can claim credit when filing ITR.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 4% Cess */}
        <div className="glass-card p-4 border-l-4 border-purple-500">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-lg font-black text-purple-400">4%</span>
            </div>
            <div>
              <p className="text-sm font-bold text-white">Health & Education Cess</p>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                An additional 4% cess is levied on the 30% tax amount. So effective tax rate is approximately 31.2% on crypto profits.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tax Calculator */}
      <div className="glass-card p-5 neon-border mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Calculator size={20} className="text-emerald-400" />
          <h3 className="font-bold text-white">Tax Calculator</h3>
        </div>

        <div className="space-y-3 mb-4">
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Buy Price (₹)</label>
            <div className="relative">
              <IndianRupee size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="number"
                value={buyPrice}
                onChange={(e) => setBuyPrice(e.target.value)}
                placeholder="e.g. 50000"
                className="w-full bg-[var(--dark1)] border border-gray-700 rounded-xl pl-8 pr-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Sell Price (₹)</label>
            <div className="relative">
              <IndianRupee size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="number"
                value={sellPrice}
                onChange={(e) => setSellPrice(e.target.value)}
                placeholder="e.g. 75000"
                className="w-full bg-[var(--dark1)] border border-gray-700 rounded-xl pl-8 pr-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {buy > 0 && sell > 0 && (
          <div className="space-y-2 animate-fade-up">
            <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
              <span className="text-xs text-gray-400">Profit/Loss</span>
              <span className={`text-sm font-bold ${profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {profit >= 0 ? '+' : ''}₹{profit.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
              <span className="text-xs text-gray-400">Tax (30%)</span>
              <span className="text-sm font-bold text-red-400">₹{tax30.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
              <span className="text-xs text-gray-400">Cess (4%)</span>
              <span className="text-sm font-bold text-red-400">₹{cess.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
              <span className="text-xs text-gray-400">Total Tax</span>
              <span className="text-sm font-bold text-red-400">₹{totalTax.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
              <span className="text-xs text-gray-400">TDS (1% of sale)</span>
              <span className="text-sm font-bold text-orange-400">₹{tds.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
            </div>
            <div className="flex justify-between items-center py-3 bg-emerald-500/10 rounded-xl px-3 mt-2">
              <span className="text-sm text-emerald-400 font-semibold">Net Profit</span>
              <span className={`text-lg font-black ${netProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                ₹{netProfit.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ITR Filing */}
      <div className="glass-card p-4 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <FileText size={18} className="text-blue-400" />
          <h3 className="font-bold text-white text-sm">ITR Filing for Crypto</h3>
        </div>
        <div className="space-y-3">
          {[
            { step: '1', text: 'Download transaction history from your exchange(s)' },
            { step: '2', text: 'Calculate profit/loss for each transaction' },
            { step: '3', text: 'Report under "Schedule VDA" in ITR-2 or ITR-3' },
            { step: '4', text: 'Pay 30% tax on total profits + 4% cess' },
            { step: '5', text: 'Claim TDS credit from Form 26AS' },
            { step: '6', text: 'File before July 31st deadline' },
          ].map((s) => (
            <div key={s.step} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-blue-400">{s.step}</span>
              </div>
              <p className="text-xs text-gray-300">{s.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Key Points */}
      <div className="glass-card p-4 border-l-4 border-yellow-500">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle size={18} className="text-yellow-400" />
          <h3 className="font-bold text-white text-sm">Key Points to Remember</h3>
        </div>
        <div className="space-y-2">
          {[
            'Crypto-to-crypto swaps are also taxable events',
            'Airdrops and gifts are taxed when received',
            'Mining income is taxable as business income',
            'No loss carry-forward allowed for crypto',
            'Staking rewards are taxed as income',
            'Consult a CA for complex transactions',
          ].map((point, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
              <span className="text-yellow-400">⚡</span>
              <span>{point}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-6">
        <span className="brand-badge gradient-text-alt">⚛ Research by Sujal Quantum Labs</span>
      </div>
    </div>
  );
}
