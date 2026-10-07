import { useState } from 'react';
import { ShieldCheck, Activity, Search } from 'lucide-react';

function App() {
  const [formData, setFormData] = useState({
    step: 1,
    type: 'PAYMENT',
    amount: '',
    oldbalanceOrg: '',
    newbalanceOrig: '',
    oldbalanceDest: '',
    newbalanceDest: '',
    isFlaggedFraud: 0
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setResult(null);
    
    // Simulate analysis delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setResult("Form ready for analysis");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl w-full mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-blue-500/10 rounded-full border border-blue-500/20 shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]">
            <ShieldCheck className="w-12 h-12 text-blue-400" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
          AI Fraud Detection
        </h1>
        <p className="text-lg text-slate-400 leading-relaxed">
          Advanced machine learning models analyze transaction behavior in real-time 
          to identify and prevent digital banking fraud.
        </p>
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-4xl relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/20 to-purple-600/20 blur-[100px] rounded-full" />
        
        {/* Form Card */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl p-6 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Step */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300">
                  Time Step
                </label>
                <input 
                  type="number" 
                  name="step" 
                  value={formData.step} 
                  onChange={handleChange}
                  min="1"
                  required
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder-slate-500"
                  placeholder="e.g. 1"
                />
              </div>

              {/* Type */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300">
                  Transaction Type
                </label>
                <select 
                  name="type" 
                  value={formData.type} 
                  onChange={handleChange}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all appearance-none"
                >
                  <option value="PAYMENT">PAYMENT</option>
                  <option value="TRANSFER">TRANSFER</option>
                  <option value="CASH_OUT">CASH_OUT</option>
                  <option value="DEBIT">DEBIT</option>
                  <option value="CASH_IN">CASH_IN</option>
                </select>
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300">
                  Transaction Amount
                </label>
                <input 
                  type="number" 
                  step="0.01"
                  name="amount" 
                  value={formData.amount} 
                  onChange={handleChange}
                  min="0"
                  required
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder-slate-500"
                  placeholder="0.00"
                />
              </div>

              {/* isFlaggedFraud */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300">
                  Flagged by Internal System?
                </label>
                <select 
                  name="isFlaggedFraud" 
                  value={formData.isFlaggedFraud} 
                  onChange={handleChange}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all appearance-none"
                >
                  <option value={0}>No (0)</option>
                  <option value={1}>Yes (1)</option>
                </select>
              </div>

              {/* Origin Balances */}
              <div className="space-y-4 md:col-span-1 bg-slate-800/30 p-5 rounded-xl border border-slate-700/30">
                <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wider">Origin Account</h3>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">Old Balance</label>
                  <input 
                    type="number" step="0.01" name="oldbalanceOrg" min="0" required
                    value={formData.oldbalanceOrg} onChange={handleChange}
                    className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder-slate-500"
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">New Balance</label>
                  <input 
                    type="number" step="0.01" name="newbalanceOrig" min="0" required
                    value={formData.newbalanceOrig} onChange={handleChange}
                    className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder-slate-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Destination Balances */}
              <div className="space-y-4 md:col-span-1 bg-slate-800/30 p-5 rounded-xl border border-slate-700/30">
                <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wider">Destination Account</h3>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">Old Balance</label>
                  <input 
                    type="number" step="0.01" name="oldbalanceDest" min="0" required
                    value={formData.oldbalanceDest} onChange={handleChange}
                    className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder-slate-500"
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">New Balance</label>
                  <input 
                    type="number" step="0.01" name="newbalanceDest" min="0" required
                    value={formData.newbalanceDest} onChange={handleChange}
                    className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder-slate-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

            </div>

            {/* Action Button & Result */}
            <div className="pt-6 flex flex-col items-center">
              <button
                type="submit"
                disabled={isAnalyzing}
                className="w-full md:w-auto px-10 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)] transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <Activity className="w-5 h-5 animate-pulse" />
                    Analyzing Transaction...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Analyze Transaction
                  </>
                )}
              </button>

              {result && (
                <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-center w-full max-w-md animate-[pulse_0.5s_ease-in-out]">
                  <Activity className="w-6 h-6 mx-auto mb-2" />
                  <p className="font-medium">{result}</p>
                </div>
              )}
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
