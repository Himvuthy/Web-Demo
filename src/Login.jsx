import React, { useState, useEffect } from 'react';
// Added Eye and EyeOff icons
import { User, Lock, Sun, Moon, AlertCircle, Fingerprint, Info, Mail, Send, Loader2, Eye, EyeOff } from 'lucide-react'; 

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // New state to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showAdminInfo, setShowAdminInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  const [isExiting, setIsExiting] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  // 1. SYNC THEME WITH LOCAL STORAGE
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('appTheme') === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('appTheme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1250);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShowAdminInfo(false); 
    setIsLoading(true); 

    try {
      const response = await fetch('http://127.0.0.1:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setIsLoading(false);
        setIsExiting(true); 
        setTimeout(() => {
          onLoginSuccess(data.role); 
        }, 500); 
      } else {
        setIsLoading(false);
        setError(data.message || "Invalid username or password.");
      }
    } catch (err) {
      setIsLoading(false);
      setError("Connection failed. Please ensure the backend server is running.");
    }
  };

  const cardBg = isDark ? "bg-white/5" : "bg-white/30"; 
  const textColor = isDark ? "text-white" : "text-slate-900";
  const brandingColor = isDark ? "text-white" : "text-indigo-700"; 
  const labelColor = isDark ? "text-white/40" : "text-slate-700"; 
  const iconColor = isDark ? "text-white/30" : "text-slate-600"; 
  const inputBorder = isDark ? "border-white/10" : "border-slate-400/50"; 
  const placeholderColor = isDark ? "placeholder:text-white/20" : "placeholder:text-slate-600/60"; 
  const glassBorder = isDark ? "border-white/10" : "border-white/50";

  const buttonGradient = isDark 
    ? "from-cyan-400 via-indigo-500 to-purple-500 shadow-cyan-500/20" 
    : "from-cyan-500 via-indigo-600 to-purple-600 shadow-indigo-500/40"; 

  const infoBg = isDark ? "bg-cyan-500/10 border-cyan-500/20" : "bg-indigo-500/10 border-indigo-500/20";
  const infoText = isDark ? "text-cyan-100" : "text-indigo-800";
  const infoIcon = isDark ? "text-cyan-400" : "text-indigo-600";

  const errorBg = isDark ? "bg-red-500/20 border-red-500/30" : "bg-red-100/80 border-red-300";
  const errorText = isDark ? "text-red-100" : "text-red-800";
  const errorIcon = isDark ? "text-red-200" : "text-red-600";

  return (
    <div className="min-h-screen w-full flex flex-col relative font-sans overflow-hidden bg-black">
      
      <div 
        className={`fixed inset-0 z-[999] pointer-events-none transition-opacity duration-500 ease-in-out ${isExiting ? 'opacity-100' : 'opacity-0'} ${isDark ? 'bg-black' : 'bg-[#f8fafc]'}`}
      ></div>

      <div className={`absolute inset-0 z-[200] flex flex-col items-center justify-center transition-all duration-1000 ease-in-out ${showSplash ? 'opacity-100 visible' : 'opacity-0 invisible blur-md scale-110'}`}>
        <div className={`w-20 h-20 md:w-24 md:h-24 rounded-3xl flex items-center justify-center shadow-2xl animate-pulse ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white/80 border border-white backdrop-blur-sm'}`}>
           <Fingerprint className={`w-10 h-10 md:w-12 md:h-12 ${isDark ? 'text-cyan-400' : 'text-indigo-600'}`} />
        </div>
        <h1 className={`mt-6 font-black text-2xl md:text-3xl tracking-tight transition-all duration-700 delay-300 ${showSplash ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${isDark ? 'text-white' : 'text-indigo-900'}`}>
          Smart Attendance
        </h1>
        <Loader2 className={`mt-8 animate-spin transition-opacity duration-500 delay-500 ${showSplash ? 'opacity-100' : 'opacity-0'} ${isDark ? 'text-cyan-400' : 'text-indigo-600'}`} size={24} />
      </div>

      <div className="absolute inset-0 z-0 bg-gradient-to-tr from-[#22D3EE] via-[#818CF8] to-[#A855F7] animate-liquid pointer-events-none"></div>

      <div className={`absolute inset-0 z-0 bg-black transition-opacity duration-500 ease-in-out pointer-events-none ${isDark ? 'opacity-100' : 'opacity-0'}`}></div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes liquidMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-liquid {
          background-size: 300% 300% !important;
          animation: liquidMove 20s ease-in-out infinite !important;
        }

        @keyframes btnShimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-btn {
          background-size: 300% 300% !important;
          animation: btnShimmer 8s ease-in-out infinite !important;
        }
      `}} />

      <div className={`absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-3 md:gap-4 z-[50] transition-all duration-1000 ease-out delay-700 ${showSplash ? 'opacity-0 -translate-x-10' : 'opacity-100 translate-x-0'}`}>
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center backdrop-blur-xl border shadow-xl transition-all duration-500 ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-white'}`}>
           <Fingerprint className={`w-6 h-6 md:w-7 md:h-7 transition-colors duration-500 ${isDark ? 'text-cyan-400' : 'text-indigo-600'}`} />
        </div>
        <h1 className={`${brandingColor} font-black text-lg md:text-2xl tracking-tighter transition-colors duration-500 drop-shadow-sm`}>
          Smart Attendance
        </h1>
      </div>

      <div className={`flex-1 flex items-center justify-center p-6 md:p-4 z-10 relative transition-all duration-1000 ease-out delay-500 ${showSplash ? 'opacity-0 translate-y-20 scale-95' : 'opacity-100 translate-y-0 scale-100'}`}>
        <div className={`${cardBg} backdrop-blur-[50px] rounded-[40px] md:rounded-[48px] shadow-2xl w-full max-w-[360px] md:max-w-[400px] p-8 md:p-14 border ${glassBorder} transition-all duration-500`}>
          <h2 className={`text-2xl md:text-3xl font-black text-center ${textColor} mb-4 md:mb-6 tracking-tight transition-colors duration-500`}>Login</h2>
          
          {error && (
            <div className={`mb-6 p-3 ${errorBg} backdrop-blur-md border rounded-2xl flex items-center gap-2 animate-in fade-in zoom-in duration-200`}>
              <AlertCircle size={14} className={`${errorIcon} shrink-0`} />
              <p className={`${errorText} text-[10px] md:text-[11px] font-bold leading-tight`}>{error}</p>
            </div>
          )}

          {showAdminInfo && !error && (
            <div className={`mb-6 p-4 ${infoBg} backdrop-blur-md border rounded-2xl flex flex-col gap-3 animate-in fade-in zoom-in duration-200`}>
              <div className="flex items-start gap-2">
                <Info size={14} className={`${infoIcon} shrink-0 mt-0.5`} />
                <p className={`${infoText} text-[10px] md:text-[11px] font-black leading-tight`}>
                  Please contact the administrator to resolve access issues:
                </p>
              </div>
              <div className="flex flex-col gap-2 pl-5">
                <a href="mailto:himvuthy09@gmail.com" className={`flex items-center gap-2 ${infoText} opacity-80 hover:opacity-100 transition-opacity text-[10px] md:text-[11px] font-bold`}>
                  <Mail size={12} /> himvuthy09@gmail.com
                </a>
                <a href="https://t.me/himvuthy09" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 ${infoText} opacity-80 hover:opacity-100 transition-opacity text-[10px] md:text-[11px] font-bold`}>
                  <Send size={12} /> @himvuthy09
                </a>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            <div className="space-y-1 md:space-y-2">
              <label className={`text-[9px] md:text-[10px] font-black ${labelColor} uppercase tracking-[0.2em] px-1 transition-colors duration-500`}>Username</label>
              <div className="relative group">
                <User className={`absolute left-0 bottom-3 ${iconColor} group-focus-within:text-cyan-400 transition-colors duration-500`} size={16} />
                <input 
                  type="text" 
                  placeholder="Type your username" 
                  className={`w-full bg-transparent border-b-2 ${inputBorder} py-2 md:py-3 pl-7 md:pl-8 ${textColor} text-sm md:text-base font-black antialiased outline-none focus:border-cyan-400 transition-all duration-500 ${placeholderColor} placeholder:font-normal`}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading || isExiting}
                  required 
                />
              </div>
            </div>

            <div className="space-y-1 md:space-y-2">
              <label className={`text-[9px] md:text-[10px] font-black ${labelColor} uppercase tracking-[0.2em] px-1 transition-colors duration-500`}>Password</label>
              <div className="relative group">
                <Lock className={`absolute left-0 bottom-3 ${iconColor} group-focus-within:text-purple-400 transition-colors duration-500`} size={16} />
                <input 
                  type={showPassword ? "text" : "password"} // Dynamic type
                  placeholder="Type your password" 
                  className={`w-full bg-transparent border-b-2 ${inputBorder} py-2 md:py-3 pl-7 md:pl-8 pr-8 ${textColor} text-sm md:text-base font-black antialiased outline-none focus:border-purple-400 transition-all duration-500 ${placeholderColor} placeholder:font-normal`}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading || isExiting}
                  required 
                />
                {/* Show/Hide Password Toggle Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-0 bottom-3 ${iconColor} hover:text-purple-400 transition-colors duration-300`}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end !mt-4">
              <button 
                type="button" 
                onClick={() => {
                  setError(''); 
                  setShowAdminInfo(true);
                }}
                disabled={isLoading || isExiting}
                className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-colors duration-500 disabled:opacity-50 ${isDark ? 'text-white/40 hover:text-white' : 'text-slate-600 hover:text-indigo-700'}`}
              >
                Forgot password?
              </button>
            </div>

            <button 
              type="submit" 
              disabled={isLoading || isExiting}
              className={`w-full py-4 md:py-5 flex justify-center items-center rounded-full bg-gradient-to-r ${buttonGradient} animate-btn text-white font-black shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 uppercase tracking-widest text-[10px] md:text-xs border-none outline-none ring-0 disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed`}
            >
              {isLoading ? (
                <Loader2 size={16} className="animate-spin text-white" />
              ) : (
                "Log In"
              )}
            </button>
          </form>
        </div>
      </div>

      <div className={`absolute bottom-6 right-6 md:bottom-8 md:right-8 z-[100] transition-all duration-1000 ease-out delay-700 ${showSplash ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'}`}>
        <button 
          type="button"
          onClick={() => !isLoading && !isExiting && setIsDark((prev) => !prev)}
          className={`group flex items-center gap-2 md:gap-4 p-1.5 md:p-2 pr-4 md:pr-6 rounded-full backdrop-blur-2xl border transition-all duration-500 shadow-xl active:scale-90 ${isDark ? 'bg-white/10 border-white/10 text-white' : 'bg-white/80 border-white text-slate-900'} ${isLoading || isExiting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-500 ${isDark ? 'bg-black' : 'bg-indigo-600 shadow-inner'}`}>
            {isDark ? <Moon size={16} className="text-cyan-400" /> : <Sun size={16} className="text-yellow-300" />}
          </div>
          <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] select-none transition-colors duration-500">
            {isDark ? 'Dark' : 'Light'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Login;
