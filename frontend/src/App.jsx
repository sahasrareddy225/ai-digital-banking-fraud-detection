import { ShieldCheck, Activity } from 'lucide-react';

function App() {
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
      <div className="w-full max-w-3xl relative">
        {/* Decorative background glow */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/20 to-purple-600/20 blur-[100px] rounded-full" />
        
        {/* Transaction Analysis Card Shell */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-8 min-h-[400px] flex flex-col items-center justify-center">
          <Activity className="w-10 h-10 text-slate-600 mb-4 animate-pulse" />
          <h2 className="text-xl font-medium text-slate-300 mb-2">Ready for Analysis</h2>
          <p className="text-slate-500 text-center max-w-md">
            The transaction form will be integrated here to send data securely 
            to the FastAPI inference engine.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
