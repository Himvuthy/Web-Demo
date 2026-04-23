import React from 'react';
import { LogOut, Power } from 'lucide-react';

const LogoutPage = ({ onLogout, isDark }) => {
  // Theme styling based on your existing dashboard colors
  const appBg = isDark ? "bg-black" : "bg-[#f8fafc]";
  const textColor = isDark ? "text-white" : "text-gray-800";
  const mutedText = isDark ? "text-gray-400" : "text-slate-500";
  const brandColor = isDark ? "text-cyan-400" : "text-indigo-600";

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${appBg} ${textColor} font-sans transition-colors duration-500`}>
      
      {/* Visual Icon */}
      <div className={`mb-8 p-6 rounded-full ${isDark ? 'bg-white/5' : 'bg-gray-100'} animate-pulse`}>
        <Power className={`w-12 h-12 ${brandColor}`} />
      </div>

      {/* Text Context */}
      <h1 className="text-3xl font-black mb-2 tracking-tight">Active Session</h1>
      <p className={`${mutedText} text-sm mb-10`}>You are currently logged into the system.</p>

      {/* THE ONLY BUTTON */}
      <button 
        onClick={() => {
          if (window.confirm("Confirm Logout?")) {
            onLogout();
          }
        }}
        className="group relative flex items-center gap-3 px-8 py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-2xl shadow-lg shadow-red-500/20 transition-all duration-300 hover:scale-105 active:scale-95"
      >
        <LogOut className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
        <span className="uppercase tracking-widest text-sm">Terminate Session</span>
      </button>

      {/* Footer Decoration */}
      <footer className="absolute bottom-8">
        <p className={`text-[10px] font-bold uppercase tracking-[0.3em] ${brandColor} opacity-50`}>
          Smart Attendance System
        </p>
      </footer>
    </div>
  );
};

export default LogoutPage;