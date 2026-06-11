import React, { useState, useEffect } from 'react';
import { 
 Fingerprint, Bell, LayoutDashboard, Focus, BookOpen, 
 FileText, Users, Settings, LogOut, Info,
 CheckCircle, XCircle, Sun, Moon, Search, Plus, 
 PlaySquare, AlertCircle, Edit2
} from 'lucide-react';

const TeacherDashboard = ({ onLogout }) => {
 // --- UI STATES ---
 const [activeView, setActiveView] = useState(() => {
  return localStorage.getItem('teacherActiveView') || 'dashboard';
 });

 useEffect(() => {
  if (activeView) {
   localStorage.setItem('teacherActiveView', activeView);
  }
 }, [activeView]);
 
 const [isDark, setIsDark] = useState(() => {
  return localStorage.getItem('appTheme') === 'dark';
 });

 useEffect(() => {
  localStorage.setItem('appTheme', isDark ? 'dark' : 'light');
 }, [isDark]);

 // --- DYNAMIC THEME CLASSES ---
 const appBg = isDark ? "bg-black" : "bg-[#f8fafc]";
 const surfaceBg = isDark ? "bg-black" : "bg-white";
 const borderColor = isDark ? "border-white/10" : "border-[#f1f5f9]";
 const borderSubColor = isDark ? "border-white/5" : "border-gray-100";
 const textColor = isDark ? "text-white" : "text-gray-800";
 const mutedText = isDark ? "text-gray-400" : "text-slate-500";
 const subBg = isDark ? "bg-white/5" : "bg-gray-50";
 const hoverBg = isDark ? "hover:bg-white/5" : "hover:bg-gray-50";
 
 const navActiveBg = isDark ? "bg-white/10 text-cyan-400" : "bg-purple-50 border border-purple-100 text-purple-600";
 const navInactiveBg = isDark ? "text-gray-400 hover:bg-white/5 hover:text-white" : "text-slate-500 hover:bg-gray-50 hover:text-purple-600";
 const brandColor = isDark ? "text-cyan-400" : "text-purple-600";
 const buttonColor = isDark ? "bg-cyan-500 hover:bg-cyan-400 text-slate-900" : "bg-purple-500 hover:bg-purple-600 text-white";
 
 const cardStyle = `${surfaceBg} rounded-xl border ${borderColor} p-6 flex flex-col ${isDark ? 'shadow-[0_0_15px_rgba(255,255,255,0.02)]' : 'shadow-[0_2px_10px_rgba(0,0,0,0.04)]'}`;
 const inputStyle = `w-full p-2.5 text-sm border rounded-lg focus:outline-none transition-colors ${isDark ? 'bg-[#111] border-white/20 text-white focus:border-cyan-400 [&>option]:bg-black [&>option]:text-white' : 'bg-gray-50 border-gray-200 text-gray-800 focus:border-purple-500 [&>option]:bg-white [&>option]:text-gray-800'}`;

 const viewTitles = {
  dashboard: 'Teacher Dashboard',
  take_attendance: 'Attendance',
  classes: 'Classes',
  records: 'Attendance Records',
  student: 'Student Attendance'
 };

 return (
  <div className={`flex h-screen overflow-hidden ${appBg} ${textColor} font-sans transition-colors duration-500 animate-in fade-in duration-500`}>
   
   {/* SIDEBAR */}
   <aside className={`w-64 ${surfaceBg} border-r ${borderColor} flex flex-col z-20 transition-colors duration-500 shrink-0`}>
    <div className={`h-20 flex items-center px-6 border-b ${borderColor}`}>
     <div className="flex items-center gap-3">
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center border shadow-sm transition-all duration-500 ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'}`}>
        <Fingerprint className={`w-5 h-5 transition-colors duration-500 ${brandColor}`} />
      </div>
      <h1 className="text-lg font-black tracking-tight">Smart<span className={brandColor}>Attendance</span></h1>
     </div>
    </div>
    
    <nav className="flex-1 overflow-y-auto py-6 px-3 custom-scrollbar flex flex-col">
     <p className={`px-4 text-[10px] font-black ${mutedText} uppercase tracking-widest mb-3`}>Main Menu</p>
     <ul className="space-y-1 mb-8">
      <li>
       <button onClick={() => setActiveView('dashboard')} className={`w-full flex items-center px-4 py-2.5 rounded-xl font-semibold transition-colors ${activeView === 'dashboard' ? navActiveBg : navInactiveBg}`}>
        <LayoutDashboard className={`w-4 h-4 mr-3 ${activeView === 'dashboard' ? '' : 'opacity-70'}`} /> Dashboard
       </button>
      </li>
      <li>
       <button onClick={() => setActiveView('take_attendance')} className={`w-full flex items-center px-4 py-2.5 rounded-xl font-semibold transition-colors ${activeView === 'take_attendance' ? navActiveBg : navInactiveBg}`}>
        <Focus className={`w-4 h-4 mr-3 ${activeView === 'take_attendance' ? '' : 'opacity-70'}`} /> Take Attendance
       </button>
      </li>
      <li>
       <button onClick={() => setActiveView('classes')} className={`w-full flex items-center px-4 py-2.5 rounded-xl font-semibold transition-colors ${activeView === 'classes' ? navActiveBg : navInactiveBg}`}>
        <BookOpen className={`w-4 h-4 mr-3 ${activeView === 'classes' ? '' : 'opacity-70'}`} /> Classes
       </button>
      </li>
     </ul>

     <p className={`px-4 text-[10px] font-black ${mutedText} uppercase tracking-widest mb-3`}>Data and Logs</p>
     <ul className="space-y-1 flex-1">
      <li>
       <button onClick={() => setActiveView('records')} className={`w-full flex items-center px-4 py-2.5 rounded-xl font-semibold transition-colors ${activeView === 'records' ? navActiveBg : navInactiveBg}`}>
        <FileText className={`w-4 h-4 mr-3 ${activeView === 'records' ? '' : 'opacity-70'}`} /> Attendance Records
       </button>
      </li>
      <li>
       <button onClick={() => setActiveView('student')} className={`w-full flex items-center px-4 py-2.5 rounded-xl font-semibold transition-colors ${activeView === 'student' ? navActiveBg : navInactiveBg}`}>
        <Users className={`w-4 h-4 mr-3 ${activeView === 'student' ? '' : 'opacity-70'}`} /> Student Attendance
       </button>
      </li>
     </ul>

     <div className={`flex items-center justify-between px-2 pt-4 border-t border-gray-100 ${isDark ? 'border-white/10' : ''} mt-auto`}>
       <button onClick={onLogout} className={`p-2 text-red-500 hover:bg-red-50 ${isDark ? 'hover' : ''}:bg-red-500/10 rounded-lg transition-colors`}>
        <LogOut size={18} />
       </button>
       <button className={`p-2 rounded-lg transition-colors ${navInactiveBg}`}>
        <Info size={18} />
       </button>
       <button onClick={() => setIsDark(!isDark)} className={`p-2 rounded-lg transition-colors ${navInactiveBg}`}>
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
       </button>
       <button className={`p-2 rounded-lg transition-colors ${navInactiveBg}`}>
        <Settings size={18} />
       </button>
     </div>
    </nav>
   </aside>

   {/* MAIN CONTENT */}
   <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
    <header className={`h-20 ${surfaceBg} border-b ${borderColor} flex items-center justify-between px-8 z-10 transition-colors duration-500 shrink-0`}>
     <div className="flex items-center gap-4 text-sm font-medium">
      <span className={`${brandColor} font-bold text-lg`}>{viewTitles[activeView]}</span>
     </div>
     
     <div className="flex items-center gap-5">
      <button className={`${mutedText} hover:${brandColor} transition relative p-2 ml-2`}>
       <Bell size={20} />
       <span className={`absolute top-1.5 right-1.5 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-red-500 border-2 ${isDark ? 'border-black' : 'border-white'}`}></span>
      </button>
      <div className={`h-8 w-px ${borderColor} mx-2`}></div>
      <div className="flex items-center gap-3 cursor-pointer">
       <img src="https://ui-avatars.com/api/?name=Pich+Rothana&background=0D8ABC&color=fff" alt="Teacher" className={`h-9 w-9 rounded-full shadow-sm border ${borderColor}`} />
       <div className="hidden md:block text-sm">
        <p className="font-bold leading-none">Pich Rothana</p>
        <p className={`text-xs ${brandColor} mt-1 font-semibold uppercase tracking-wider`}>TEACHER</p>
       </div>
      </div>
     </div>
    </header>

    <div className={`flex-1 overflow-y-auto p-6 md:p-8 ${appBg} transition-colors duration-500`}>
     <div className="max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 1. DASHBOARD VIEW */}
      {activeView === 'dashboard' && (
       <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         <div className={`${cardStyle}`}>
          <div className="flex justify-between items-start mb-2">
           <p className={`text-[10px] ${mutedText} font-black uppercase tracking-widest`}>Total Students</p>
           <Users className={`w-4 h-4 ${mutedText}`} />
          </div>
          <p className="text-3xl font-black mt-2">-</p>
          <p className={`text-xs ${mutedText} mt-1`}>Across all classes</p>
         </div>
         <div className={`${cardStyle}`}>
          <div className="flex justify-between items-start mb-2">
           <p className={`text-[10px] ${mutedText} font-black uppercase tracking-widest`}>Present Today</p>
           <Users className={`w-4 h-4 ${mutedText}`} />
          </div>
          <p className="text-3xl font-black mt-2">-</p>
          <p className={`text-xs ${mutedText} mt-1`}>Currently logged in</p>
         </div>
         <div className={`${cardStyle}`}>
          <div className="flex justify-between items-start mb-2">
           <p className={`text-[10px] ${mutedText} font-black uppercase tracking-widest`}>Absent Today</p>
           <Users className={`w-4 h-4 ${mutedText}`} />
          </div>
          <p className="text-3xl font-black mt-2 text-red-500">-</p>
          <p className={`text-xs ${mutedText} mt-1`}>Requires review</p>
         </div>
         <div className={`${cardStyle}`}>
          <div className="flex justify-between items-start mb-2">
           <p className={`text-[10px] ${mutedText} font-black uppercase tracking-widest`}>Attendance %</p>
           <Focus className={`w-4 h-4 ${mutedText}`} />
          </div>
          <p className="text-3xl font-black mt-2 text-green-500">-</p>
          <div className={`w-full bg-gray-200 ${isDark ? 'bg-gray-700' : ''} rounded-full h-2 mt-3`}>
           <div className="bg-purple-500 h-2 rounded-full" style={{ width: '88.2%' }}></div>
          </div>
         </div>
        </div>

        <div className="mt-8">
         <div className="flex justify-between items-center mb-4 px-2">
           <h3 className="font-bold text-sm tracking-widest uppercase">Recent Activity</h3>
           <button className={`text-sm font-bold ${brandColor} hover:underline`}>view all</button>
         </div>
         <div className={`${surfaceBg} rounded-xl shadow-sm border ${borderColor} overflow-hidden`}>
           <div className={`p-4 border-b ${borderSubColor} flex items-center justify-between`}>
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full bg-purple-100 ${isDark ? 'bg-purple-900/30' : ''} flex items-center justify-center text-purple-600 ${isDark ? 'text-purple-400' : ''}`}>
               <Focus size={20} />
              </div>
              <div>
               <p className="font-bold text-sm">Attendance Session Completed</p>
               <p className={`text-xs ${mutedText}`}>MAT-101: 40/45 Students Present</p>
              </div>
            </div>
            <span className={`text-[10px] font-bold ${mutedText}`}>10:35 AM</span>
           </div>
           <div className={`p-4 border-b ${borderSubColor} flex items-center justify-between`}>
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full bg-pink-100 ${isDark ? 'bg-pink-900/30' : ''} flex items-center justify-center text-pink-600 ${isDark ? 'text-pink-400' : ''}`}>
               <Edit2 size={18} />
              </div>
              <div>
               <p className="font-bold text-sm">Manual Override Applied</p>
               <p className={`text-xs ${mutedText}`}>Mike Coxlong (ID-204) marked 'Late' by Instructor</p>
              </div>
            </div>
            <span className={`text-[10px] font-bold ${mutedText}`}>9:20 AM</span>
           </div>
           <div className={`p-4 flex items-center justify-between`}>
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full bg-red-100 ${isDark ? 'bg-red-900/30' : ''} flex items-center justify-center text-red-600 ${isDark ? 'text-red-400' : ''}`}>
               <AlertCircle size={20} />
              </div>
              <div>
               <p className="font-bold text-sm">Low Attendance Alert</p>
               <p className={`text-xs ${mutedText}`}>System flagged 2 students in PHY-202 below 75%.</p>
              </div>
            </div>
            <span className={`text-[10px] font-bold ${mutedText}`}>Yesterday</span>
           </div>
         </div>
        </div>
       </div>
      )}

      {/* 2. TAKE ATTENDANCE VIEW */}
      {activeView === 'take_attendance' && (
       <div className="space-y-6">
         <h2 className="text-xl font-bold mb-4">Take Attendance</h2>
         
         {/* Start Session Card */}
         <div className={`${cardStyle} flex-row justify-between items-center p-4 py-5`}>
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl bg-purple-100 ${isDark ? 'bg-purple-900/30' : ''} flex items-center justify-center text-purple-600 ${isDark ? 'text-purple-400' : ''}`}>
             <PlaySquare size={24} />
            </div>
            <div>
             <p className="font-bold text-base">Start Session</p>
             <p className={`text-xs ${mutedText}`}>Select class to open bio-metric scanner.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <select className={`border ${borderSubColor} bg-transparent text-sm font-semibold rounded-lg px-4 py-2.5 outline-none`}>
             <option>Math: Linear Algebra</option>
             <option>Physics 101</option>
            </select>
            <button className={`px-6 py-2.5 rounded-lg font-bold text-sm shadow-sm transition ${buttonColor}`}>
             Activate Scanner
            </button>
          </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Biometric Status */}
          <div className={`${cardStyle} h-[400px]`}>
            <h3 className={`font-bold text-sm mb-2 border-b pb-4 ${isDark ? 'border-white/10' : ''}`}>Bio-metric Status</h3>
            <div className="flex-1 flex flex-col items-center justify-center">
             <div className={`w-32 h-32 rounded-full bg-gray-50 ${isDark ? 'bg-white/5' : ''} flex items-center justify-center mb-6`}>
              <Fingerprint size={64} className={`text-slate-800 ${isDark ? 'text-white' : ''}`} />
             </div>
             <p className="font-bold text-lg">Scanner is Active</p>
             <p className={`text-xs ${mutedText} mt-1`}>Awaiting student scans for MAT-101...</p>
            </div>
          </div>

          {/* Manual Attendance */}
          <div className={`${cardStyle} h-[400px]`}>
            <div className="flex justify-between items-center mb-6">
             <div>
              <h3 className="font-bold text-sm">Manual Attendance</h3>
              <p className={`text-xs ${mutedText}`}>Override scanner or log manually.</p>
             </div>
             <div className="relative w-48">
               <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 ${mutedText}`} />
               <input type="text" placeholder="Find students..." className={`w-full bg-transparent border ${borderSubColor} rounded-md py-1.5 pl-8 pr-3 text-xs outline-none focus:border-purple-400`} />
             </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-2">
             {/* Student 1 */}
             <div className={`flex items-center justify-between p-3 rounded-xl border ${borderSubColor} ${subBg}`}>
               <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold">A</div>
                <div>
                  <p className="font-bold text-sm">Alex Chen</p>
                  <p className={`text-[10px] ${mutedText}`}>ID 104 | alexchen808</p>
                </div>
               </div>
               <div className="flex gap-1">
                <button className="w-7 h-7 rounded bg-green-100 text-green-700 font-bold text-xs hover:bg-green-200">P</button>
                <button className="w-7 h-7 rounded bg-yellow-100 text-yellow-700 font-bold text-xs hover:bg-yellow-200">L</button>
                <button className="w-7 h-7 rounded bg-red-100 text-red-700 font-bold text-xs hover:bg-red-200">A</button>
               </div>
             </div>
             {/* Student 2 */}
             <div className={`flex items-center justify-between p-3 rounded-xl border ${borderSubColor} ${subBg}`}>
               <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold">M</div>
                <div>
                  <p className="font-bold text-sm">Mike Coxlong</p>
                  <p className={`text-[10px] ${mutedText}`}>ID 234 | mikecoxlong101</p>
                </div>
               </div>
               <div className="flex gap-1">
                <button className="w-7 h-7 rounded bg-green-100 text-green-700 font-bold text-xs hover:bg-green-200">P</button>
                <button className="w-7 h-7 rounded bg-yellow-100 text-yellow-700 font-bold text-xs hover:bg-yellow-200">L</button>
                <button className="w-7 h-7 rounded bg-red-100 text-red-700 font-bold text-xs hover:bg-red-200">A</button>
               </div>
             </div>
            </div>
          </div>
         </div>
       </div>
      )}

      {/* 3. CLASSES VIEW */}
      {activeView === 'classes' && (
       <div className="space-y-6">
         <h2 className="text-lg font-bold mb-4">Manage Sessions</h2>
         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Class 1 */}
          <div className={`${cardStyle}`}>
            <div className="flex justify-between items-start mb-6">
             <div className={`w-10 h-10 rounded-xl bg-gray-100 ${isDark ? 'bg-white/10' : ''} flex items-center justify-center text-slate-700 ${isDark ? 'text-white' : ''}`}>
               <LayoutDashboard size={20} />
             </div>
             <span className={`text-[10px] font-bold ${mutedText}`}>9:00 AM</span>
            </div>
            <p className="font-bold text-base">Calculus I</p>
            <p className={`text-xs ${mutedText} mb-6`}>MAT-101: 45 Students</p>
            <div className="flex items-center gap-2 mt-auto">
             <button className={`flex-1 py-2 rounded-lg font-bold text-xs transition ${buttonColor}`}>View Roster</button>
             <button className={`p-2 rounded-lg border ${borderSubColor} ${hoverBg}`}><Settings size={16} /></button>
            </div>
          </div>
          {/* Class 2 */}
          <div className={`${cardStyle}`}>
            <div className="flex justify-between items-start mb-6">
             <div className={`w-10 h-10 rounded-xl bg-gray-100 ${isDark ? 'bg-white/10' : ''} flex items-center justify-center text-slate-700 ${isDark ? 'text-white' : ''}`}>
               <LayoutDashboard size={20} />
             </div>
             <span className={`text-[10px] font-bold ${mutedText}`}>11:00 AM</span>
            </div>
            <p className="font-bold text-base">Calculus II</p>
            <p className={`text-xs ${mutedText} mb-6`}>MAT-102: 35 Students</p>
            <div className="flex items-center gap-2 mt-auto">
             <button className={`flex-1 py-2 rounded-lg font-bold text-xs transition ${buttonColor}`}>View Roster</button>
             <button className={`p-2 rounded-lg border ${borderSubColor} ${hoverBg}`}><Settings size={16} /></button>
            </div>
          </div>
          {/* Class 3 */}
          <div className={`${cardStyle}`}>
            <div className="flex justify-between items-start mb-6">
             <div className={`w-10 h-10 rounded-xl bg-gray-100 ${isDark ? 'bg-white/10' : ''} flex items-center justify-center text-slate-700 ${isDark ? 'text-white' : ''}`}>
               <Focus size={20} />
             </div>
             <span className={`text-[10px] font-bold ${mutedText}`}>10:00 AM</span>
            </div>
            <p className="font-bold text-base">Physics</p>
            <p className={`text-xs ${mutedText} mb-6`}>MAT-103: 40 Students</p>
            <div className="flex items-center gap-2 mt-auto">
             <button className={`flex-1 py-2 rounded-lg font-bold text-xs transition ${buttonColor}`}>View Roster</button>
             <button className={`p-2 rounded-lg border ${borderSubColor} ${hoverBg}`}><Settings size={16} /></button>
            </div>
          </div>
          {/* Add Class */}
          <button className={`${cardStyle} flex items-center justify-center gap-2 border-dashed bg-gray-50/50 ${isDark ? 'bg-white/5' : ''} hover:bg-gray-50 ${isDark ? 'hover' : ''}:bg-white/10 transition-colors`}>
            <div className={`w-12 h-12 rounded-full border flex items-center justify-center border-gray-300 ${isDark ? 'border-white/20' : ''} text-gray-500 ${isDark ? 'text-gray-300' : ''}`}>
             <Plus size={24} />
            </div>
            <p className={`font-bold text-sm mt-2 text-gray-600 ${isDark ? 'text-gray-300' : ''}`}>Add New Class</p>
          </button>
         </div>
       </div>
      )}

      {/* 4. ATTENDANCE RECORDS VIEW */}
      {activeView === 'records' && (
       <div className="space-y-6">
         <div className={`${cardStyle} flex-row justify-between items-center`}>
          <div>
           <h3 className="font-bold text-lg">Attendance Records</h3>
           <p className={`text-xs ${mutedText} mt-1`}>View historical Records of classes</p>
          </div>
          <div className="flex gap-4">
            <div className="relative w-64">
             <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${mutedText}`} />
             <input type="text" placeholder="Search for Date or Classes name" className={`w-full ${isDark ? 'bg-[#111]' : 'bg-gray-100'} border-none rounded-lg py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-purple-400`} />
            </div>
            <button className={`px-5 py-2 rounded-lg font-bold text-sm border ${borderSubColor} ${subBg} ${hoverBg}`}>Export</button>
          </div>
         </div>

         <div className={`${cardStyle} !p-0`}>
          <div className={`p-6 border-b ${isDark ? 'border-white/10' : ''} flex justify-between items-center`}>
            <h3 className="font-bold text-base">Historical Records</h3>
            <div className={`flex ${isDark ? 'bg-[#111]' : 'bg-gray-100'} rounded-lg p-1`}>
             <button className={`px-4 py-1.5 text-xs font-bold rounded-md ${isDark ? 'bg-white/10' : 'bg-white'} shadow-sm`}>Daily</button>
             <button className={`px-4 py-1.5 text-xs font-bold rounded-md ${mutedText} hover:text-inherit`}>Weekly</button>
             <button className={`px-4 py-1.5 text-xs font-bold rounded-md ${mutedText} hover:text-inherit`}>Monthly</button>
            </div>
          </div>
          <div className="p-6">
            <table className="w-full text-sm text-left whitespace-nowrap">
             <thead className={`text-xs ${mutedText} font-bold bg-gray-100 ${isDark ? 'bg-white/5' : ''}`}>
               <tr>
                <th className="px-6 py-4 rounded-l-xl">Date</th>
                <th className="px-6 py-4">Class</th>
                <th className="px-6 py-4">Total Enrolled</th>
                <th className="px-6 py-4">Present</th>
                <th className="px-6 py-4 rounded-r-xl">Absent/Late</th>
               </tr>
             </thead>
             <tbody className={`divide-y ${borderSubColor}`}>
               <tr>
                <td className="px-6 py-5 font-medium">Oct 24, 2025</td>
                <td className="px-6 py-5 font-bold">MAT-101</td>
                <td className="px-6 py-5">45</td>
                <td className="px-6 py-5 text-green-500 font-bold">40</td>
                <td className="px-6 py-5 text-red-500 font-bold">5</td>
               </tr>
               <tr>
                <td className="px-6 py-5 font-medium">Oct 20, 2025</td>
                <td className="px-6 py-5 font-bold">PHY-202</td>
                <td className="px-6 py-5">38</td>
                <td className="px-6 py-5 text-green-500 font-bold">30</td>
                <td className="px-6 py-5 text-red-500 font-bold">8</td>
               </tr>
               <tr>
                <td className="px-6 py-5 font-medium">Oct 18, 2025</td>
                <td className="px-6 py-5 font-bold">MAT-101</td>
                <td className="px-6 py-5">45</td>
                <td className="px-6 py-5 text-green-500 font-bold">42</td>
                <td className="px-6 py-5 text-red-500 font-bold">3</td>
               </tr>
             </tbody>
            </table>
          </div>
         </div>
       </div>
      )}

      {/* 5. STUDENT ATTENDANCE VIEW */}
      {activeView === 'student' && (
       <div className="flex justify-center mt-10">
         <div className={`${cardStyle} w-full max-w-2xl p-10 items-center text-center`}>
          <h2 className="text-xl font-bold mb-2">Student Lookup</h2>
          <p className={`text-sm ${mutedText} mb-8`}>Search for a student to view their detailed attendance history.</p>

          <div className={`relative w-full max-w-md mb-10 flex border rounded-full overflow-hidden p-1 ${isDark ? 'bg-[#111] border-white/10' : 'bg-gray-50'}`}>
            <div className="flex-1 flex items-center pl-4">
             <Search className={`w-4 h-4 ${mutedText} mr-2`} />
             <input type="text" placeholder="Enter student name...(e.g. Alex Chen)" className={`w-full bg-transparent border-none text-sm outline-none`} />
            </div>
            <button className={`px-6 py-2.5 rounded-full font-bold text-sm transition ${buttonColor}`}>Search</button>
          </div>

          <div className={`w-full bg-gray-50 ${isDark ? 'bg-white/5' : ''} rounded-2xl p-6 flex items-center gap-8 text-left border ${borderSubColor}`}>
            <div className={`flex flex-col items-center justify-center pl-4 pr-8 border-r ${isDark ? 'border-white/10' : ''}`}>
             <div className="w-20 h-20 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-3xl mb-3">A</div>
             <p className="font-bold text-base">Alex Chen</p>
            </div>
            <div className="flex-1">
             <h3 className="font-bold text-sm mb-4 flex items-center gap-2"><LayoutDashboard size={16} /> Participation Overview</h3>
             <div className="grid grid-cols-2 gap-4 mb-4">
               <div className={`p-4 rounded-xl ${surfaceBg} border ${borderSubColor}`}>
                <p className={`text-[10px] font-bold ${mutedText} uppercase tracking-widest mb-2`}>MAT-101 ATTENDANCE</p>
                <p className="text-2xl font-black text-red-500">67%</p>
               </div>
               <div className={`p-4 rounded-xl ${surfaceBg} border ${borderSubColor}`}>
                <p className={`text-[10px] font-bold ${mutedText} uppercase tracking-widest mb-2`}>TOTAL ABSENCES</p>
                <p className="text-2xl font-black">10</p>
               </div>
             </div>
             <button className={`w-full py-3 rounded-xl font-bold text-sm transition ${buttonColor}`}>View Detailed History</button>
            </div>
          </div>
         </div>
       </div>
      )}

     </div>
    </div>
   </main>
  </div>
 );
};

export default TeacherDashboard;