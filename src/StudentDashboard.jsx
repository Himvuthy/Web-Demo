import React, { useState, useEffect } from 'react';
import { 
  Fingerprint, Bell, LayoutDashboard, BookOpen, Calendar, 
  FileText, Settings, LogOut, Info, Sun, Moon, 
  Award, CheckCircle, XCircle, Download, Calculator, Database, Book, PieChart, Plus
} from 'lucide-react';

const StudentDashboard = ({ onLogout }) => {
  // --- UI STATES ---
  const [activeView, setActiveView] = useState(() => {
    return localStorage.getItem('studentActiveView') || 'dashboard';
  });

  useEffect(() => {
    if (activeView) {
      localStorage.setItem('studentActiveView', activeView);
    }
  }, [activeView]);
  
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('appTheme') === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('appTheme', isDark ? 'dark' : 'light');
  }, [isDark]);

  // --- DYNAMIC THEME CLASSES ---
  const appBg = isDark ? "bg-[#111]" : "bg-[#f8fafc]";
  const surfaceBg = isDark ? "bg-[#1a1a1a]" : "bg-white";
  const borderColor = isDark ? "border-white/10" : "border-[#f1f5f9]";
  const borderSubColor = isDark ? "border-white/5" : "border-gray-100";
  const textColor = isDark ? "text-white" : "text-slate-800";
  const mutedText = isDark ? "text-gray-400" : "text-slate-500";
  const subBg = isDark ? "bg-white/5" : "bg-gray-50";
  const hoverBg = isDark ? "hover:bg-white/5" : "hover:bg-gray-50";
  
  const navActiveBg = isDark ? "bg-white/10 text-[#a855f7]" : "bg-purple-50 border border-purple-100 text-[#9333ea]";
  const navInactiveBg = isDark ? "text-gray-400 hover:bg-white/5 hover:text-white" : "text-slate-500 hover:bg-gray-50 hover:text-[#9333ea]";
  const brandColor = isDark ? "text-[#c084fc]" : "text-[#9333ea]";
  const buttonColor = isDark ? "bg-[#a855f7] hover:bg-[#9333ea] text-white" : "bg-[#a855f7] hover:bg-[#9333ea] text-white";
  const bannerBg = isDark ? "bg-[#2d1b4e] border-[#4c2889]" : "bg-[#f5f3ff] border-[#ede9fe]";
  
  const cardStyle = `${surfaceBg} rounded-xl border ${borderColor} p-6 flex flex-col ${isDark ? 'shadow-[0_0_15px_rgba(255,255,255,0.02)]' : 'shadow-[0_2px_10px_rgba(0,0,0,0.04)]'}`;

  const viewTitles = {
    dashboard: 'Student Dashboard',
    courses: 'Courses',
    schedule: 'Schedule Table',
    history: 'Attendance History'
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
              <button onClick={() => setActiveView('courses')} className={`w-full flex items-center px-4 py-2.5 rounded-xl font-semibold transition-colors ${activeView === 'courses' ? navActiveBg : navInactiveBg}`}>
                <BookOpen className={`w-4 h-4 mr-3 ${activeView === 'courses' ? '' : 'opacity-70'}`} /> Courses
              </button>
            </li>
            <li>
              <button onClick={() => setActiveView('schedule')} className={`w-full flex items-center px-4 py-2.5 rounded-xl font-semibold transition-colors ${activeView === 'schedule' ? navActiveBg : navInactiveBg}`}>
                <Calendar className={`w-4 h-4 mr-3 ${activeView === 'schedule' ? '' : 'opacity-70'}`} /> Schedule
              </button>
            </li>
            <li>
              <button onClick={() => setActiveView('history')} className={`w-full flex items-center px-4 py-2.5 rounded-xl font-semibold transition-colors ${activeView === 'history' ? navActiveBg : navInactiveBg}`}>
                <FileText className={`w-4 h-4 mr-3 ${activeView === 'history' ? '' : 'opacity-70'}`} /> Attendance History
              </button>
            </li>
          </ul>

          <div className={`flex items-center justify-between px-2 pt-4 border-t ${borderSubColor} mt-auto`}>
             <button onClick={onLogout} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
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
              <span className={`absolute top-1.5 right-1.5 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-red-500 border-2 ${isDark ? 'border-[#1a1a1a]' : 'border-white'}`}></span>
            </button>
            <div className={`h-8 w-px ${borderColor} mx-2`}></div>
            <div className="flex items-center gap-3 cursor-pointer">
              <img src="https://ui-avatars.com/api/?name=Chan+Danith&background=0D8ABC&color=fff" alt="Student" className={`h-9 w-9 rounded-full shadow-sm border ${borderColor}`} />
              <div className="hidden md:block text-sm">
                <p className="font-bold leading-none">Chan Danith</p>
                <p className={`text-xs ${brandColor} mt-1 font-semibold uppercase tracking-wider`}>STUDENT</p>
              </div>
            </div>
          </div>
        </header>

        <div className={`flex-1 overflow-y-auto p-6 md:p-8 ${appBg} transition-colors duration-500`}>
          <div className="max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* 1. DASHBOARD VIEW */}
            {activeView === 'dashboard' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 {/* Left Column (Main content) */}
                 <div className="lg:col-span-2 space-y-8">
                    {/* Welcome Banner */}
                    <div className={`w-full rounded-2xl p-8 border ${bannerBg}`}>
                       <p className={`text-sm font-bold ${brandColor} mb-3`}>March 24th, 2026</p>
                       <h2 className={`text-3xl font-black ${brandColor}`}>Welcome back, Alex!</h2>
                    </div>

                    {/* Attendance Overview */}
                    <div>
                       <h3 className="font-bold text-lg mb-4">Attendance Overview</h3>
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className={`${cardStyle} items-center text-center !p-8`}>
                             <div className="w-12 h-12 rounded-full border border-yellow-200 bg-yellow-50 flex items-center justify-center text-yellow-500 mb-4 shadow-sm">
                                <Award size={24} />
                             </div>
                             <p className="text-2xl font-black">-</p>
                             <p className={`text-xs font-bold ${mutedText} mt-1`}>Days Streak</p>
                          </div>
                          <div className={`${cardStyle} items-center text-center !p-8 ${isDark ? 'border-[#9333ea]/30 bg-[#9333ea]/5' : 'border-purple-200 bg-purple-50'}`}>
                             <div className="w-12 h-12 rounded-full border border-purple-200 bg-purple-500 flex items-center justify-center text-white mb-4 shadow-sm">
                                <CheckCircle size={24} />
                             </div>
                             <p className="text-2xl font-black">-</p>
                             <p className={`text-xs font-bold ${mutedText} mt-1`}>Classes Logged</p>
                          </div>
                          <div className={`${cardStyle} items-center text-center !p-8`}>
                             <div className="w-12 h-12 rounded-full border border-red-200 bg-red-50 flex items-center justify-center text-red-500 mb-4 shadow-sm">
                                <XCircle size={24} />
                             </div>
                             <p className="text-2xl font-black">-</p>
                             <p className={`text-xs font-bold ${mutedText} mt-1`}>Absences Left</p>
                          </div>
                       </div>
                    </div>

                    {/* Enrolled Courses */}
                    <div>
                       <div className="flex justify-between items-end mb-4">
                          <h3 className="font-bold text-lg">Enrolled Courses</h3>
                          <button className={`text-sm font-bold ${brandColor} hover:underline`}>see all</button>
                       </div>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Course 1 */}
                          <div className={`${cardStyle} !p-6 flex-row justify-between items-center ${isDark ? 'border-[#9333ea]/30 bg-[#9333ea]/5' : 'border-purple-200 bg-purple-50'}`}>
                             <div>
                                <p className={`font-bold text-sm ${brandColor}`}>Linear Algebra</p>
                                <p className={`text-xs font-bold ${brandColor} mb-4 opacity-70`}>(MAT-101)</p>
                                <button className={`px-5 py-1.5 rounded-full font-bold text-xs shadow-sm ${buttonColor}`}>View</button>
                             </div>
                             <div className="w-14 h-14 rounded-xl border border-purple-200 bg-purple-100 flex items-center justify-center text-purple-600 shadow-sm">
                                <Calculator size={28} />
                             </div>
                          </div>
                          {/* Course 2 */}
                          <div className={`${cardStyle} !p-6 flex-row justify-between items-center ${isDark ? 'border-pink-500/30 bg-pink-500/5' : 'border-pink-200 bg-pink-50'}`}>
                             <div>
                                <p className={`font-bold text-sm text-pink-600`}>Database Systems</p>
                                <p className={`text-xs font-bold text-pink-600 mb-4 opacity-70`}>(CS-301)</p>
                                <button className={`px-5 py-1.5 rounded-full font-bold text-xs shadow-sm bg-pink-500 hover:bg-pink-600 text-white`}>View</button>
                             </div>
                             <div className="w-14 h-14 rounded-xl border border-pink-200 bg-pink-100 flex items-center justify-center text-pink-600 shadow-sm">
                                <Database size={28} />
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Right Column (Sidebar) */}
                 <div className="space-y-8">
                    {/* Course Instructors */}
                    <div>
                       <h3 className="font-bold text-lg mb-4">Course Instructors</h3>
                       <div className="flex gap-4">
                          <img src="https://i.pravatar.cc/150?img=11" alt="Inst" className={`w-14 h-14 rounded-full border-2 border-white shadow-md`} />
                          <img src="https://i.pravatar.cc/150?img=12" alt="Inst" className={`w-14 h-14 rounded-full border-2 border-white shadow-md`} />
                          <img src="https://i.pravatar.cc/150?img=5" alt="Inst" className={`w-14 h-14 rounded-full border-2 border-white shadow-md`} />
                       </div>
                    </div>

                    {/* Daily Notice */}
                    <div>
                       <div className="flex justify-between items-end mb-4">
                          <h3 className="font-bold text-lg">Daily Notice</h3>
                          <button className={`text-sm font-bold ${brandColor} hover:underline`}>see all</button>
                       </div>
                       <div className={`${surfaceBg} rounded-xl border ${borderColor} p-6 space-y-6 ${isDark ? 'shadow-[0_0_15px_rgba(255,255,255,0.02)]' : 'shadow-[0_2px_10px_rgba(0,0,0,0.04)]'}`}>
                          
                          <div className="border-b pb-6 border-dashed border-gray-200">
                             <h4 className="font-bold text-sm mb-2">Prelim payment due</h4>
                             <p className={`text-xs ${mutedText} mb-3 leading-relaxed`}>Please ensure your tuition fees for the upcoming semester are cleared before the...</p>
                             <button className={`text-xs font-bold ${brandColor}`}>see more</button>
                          </div>
                          
                          <div>
                             <h4 className="font-bold text-sm mb-2">Exam schedule released</h4>
                             <p className={`text-xs ${mutedText} mb-3 leading-relaxed`}>The midterm timetable is now available. Note that MAT-101 requires biometric verification 15 mins prior.</p>
                             <button className={`text-xs font-bold ${brandColor}`}>see more</button>
                          </div>

                       </div>
                    </div>
                 </div>
              </div>
            )}

            {/* 2. COURSES VIEW */}
            {activeView === 'courses' && (
              <div className="space-y-6">
                 <h2 className="text-xl font-bold mb-6">My Enrolled Courses</h2>
                 <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {/* Course 1 */}
                    <div className={`${cardStyle}`}>
                       <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-slate-700 mb-6 border border-gray-200">
                          <Calculator size={24} />
                       </div>
                       <h3 className="font-bold text-sm">Linear Algebra</h3>
                       <p className={`text-[10px] font-bold ${mutedText} mb-8 uppercase`}>MAT-101 - Dr. Lee</p>
                       <div className="mt-auto">
                          <div className="flex justify-between items-end mb-2">
                             <span className="text-xs font-bold">Attendance</span>
                             <span className="text-xs font-black">94%</span>
                          </div>
                          <div className={`w-full ${subBg} rounded-full h-2`}>
                             <div className="bg-[#a855f7] h-2 rounded-full" style={{ width: '94%' }}></div>
                          </div>
                       </div>
                    </div>
                    {/* Course 2 */}
                    <div className={`${cardStyle}`}>
                       <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-slate-700 mb-6 border border-gray-200">
                          <Database size={24} />
                       </div>
                       <h3 className="font-bold text-sm">Database Systems</h3>
                       <p className={`text-[10px] font-bold ${mutedText} mb-8 uppercase`}>CS-301 - Prof. Smith</p>
                       <div className="mt-auto">
                          <div className="flex justify-between items-end mb-2">
                             <span className="text-xs font-bold">Attendance</span>
                             <span className="text-xs font-black">84%</span>
                          </div>
                          <div className={`w-full ${subBg} rounded-full h-2`}>
                             <div className="bg-[#a855f7] h-2 rounded-full" style={{ width: '84%' }}></div>
                          </div>
                       </div>
                    </div>
                    {/* Course 3 */}
                    <div className={`${cardStyle}`}>
                       <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-slate-700 mb-6 border border-gray-200">
                          <Book size={24} />
                       </div>
                       <h3 className="font-bold text-sm">English Comp</h3>
                       <p className={`text-[10px] font-bold ${mutedText} mb-8 uppercase`}>Eng-105 - Mrs. Davis</p>
                       <div className="mt-auto">
                          <div className="flex justify-between items-end mb-2">
                             <span className="text-xs font-bold">Attendance</span>
                             <span className="text-xs font-black">67%</span>
                          </div>
                          <div className={`w-full ${subBg} rounded-full h-2`}>
                             <div className="bg-[#a855f7] h-2 rounded-full" style={{ width: '67%' }}></div>
                          </div>
                       </div>
                    </div>
                    {/* Course 4 */}
                    <div className={`${cardStyle}`}>
                       <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-slate-700 mb-6 border border-gray-200">
                          <PieChart size={24} />
                       </div>
                       <h3 className="font-bold text-sm">Physics</h3>
                       <p className={`text-[10px] font-bold ${mutedText} mb-8 uppercase`}>PS-202 - Mrs. Davis</p>
                       <div className="mt-auto">
                          <div className="flex justify-between items-end mb-2">
                             <span className="text-xs font-bold">Attendance</span>
                             <span className="text-xs font-black">82%</span>
                          </div>
                          <div className={`w-full ${subBg} rounded-full h-2`}>
                             <div className="bg-[#a855f7] h-2 rounded-full" style={{ width: '82%' }}></div>
                          </div>
                       </div>
                    </div>
                    {/* Add New Class */}
                    <button className={`${cardStyle} flex items-center justify-center gap-3 border-dashed ${subBg} ${hoverBg} transition-colors min-h-[220px]`}>
                       <div className="w-12 h-12 rounded-full border flex items-center justify-center border-gray-300 text-gray-400 bg-white shadow-sm">
                          <Plus size={24} />
                       </div>
                       <p className="font-bold text-xs text-gray-500">Add New Class</p>
                    </button>
                 </div>
              </div>
            )}

            {/* 3. SCHEDULE VIEW */}
            {activeView === 'schedule' && (
              <div className="space-y-6">
                 <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold border-b-4 border-[#3b82f6] pb-1">Weekly Schedule</h2>
                    <button className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm transition bg-blue-600 hover:bg-blue-700 text-white shadow-sm`}>
                       <Download size={16} /> Download PDF
                    </button>
                 </div>

                 <div className={`${cardStyle} !p-0 overflow-hidden`}>
                    {/* Schedule Row 1 */}
                    <div className={`flex items-start p-8 border-b ${borderSubColor}`}>
                       <div className="w-32 shrink-0">
                          <p className="font-bold text-sm">9:00 AM</p>
                          <p className={`text-[10px] font-bold ${mutedText} mt-1`}>Mon, Wed, Fri</p>
                       </div>
                       <div className="w-1.5 h-10 rounded-full bg-[#8b5cf6] mx-6"></div>
                       <div>
                          <p className="font-bold text-sm mb-1">Linear Algebra (MAT-101)</p>
                          <p className={`text-[10px] font-bold ${mutedText}`}>Block A, Room 3</p>
                       </div>
                    </div>
                    {/* Schedule Row 2 */}
                    <div className={`flex items-start p-8 border-b ${borderSubColor}`}>
                       <div className="w-32 shrink-0">
                          <p className="font-bold text-sm">11:00 AM</p>
                          <p className={`text-[10px] font-bold ${mutedText} mt-1`}>Tues, Thur</p>
                       </div>
                       <div className="w-1.5 h-10 rounded-full bg-[#fbcfe8] mx-6"></div>
                       <div>
                          <p className="font-bold text-sm mb-1">Database Systems (CS-301)</p>
                          <p className={`text-[10px] font-bold ${mutedText}`}>Tech Hub, Lab 1</p>
                       </div>
                    </div>
                    {/* Schedule Row 3 */}
                    <div className={`flex items-start p-8`}>
                       <div className="w-32 shrink-0">
                          <p className="font-bold text-sm">2:00 PM</p>
                          <p className={`text-[10px] font-bold ${mutedText} mt-1`}>Mon, Wed</p>
                       </div>
                       <div className="w-1.5 h-10 rounded-full bg-[#f97316] mx-6"></div>
                       <div>
                          <p className="font-bold text-sm mb-1">English Comp (ENG-105)</p>
                          <p className={`text-[10px] font-bold ${mutedText}`}>Humanity Building, Room 102</p>
                       </div>
                    </div>
                 </div>
              </div>
            )}

            {/* 4. ATTENDANCE HISTORY VIEW */}
            {activeView === 'history' && (
              <div className="space-y-6">
                 <h2 className="text-xl font-bold mb-6">Attendance Results & History</h2>
                 
                 <div className={`${cardStyle} !p-0 overflow-hidden`}>
                    <table className="w-full text-sm text-left whitespace-nowrap">
                       <thead className={`text-xs ${mutedText} font-bold ${subBg}`}>
                          <tr>
                            <th className="px-8 py-5">Course</th>
                            <th className="px-8 py-5">Total Classes</th>
                            <th className="px-8 py-5">Attended</th>
                            <th className="px-8 py-5">Absent</th>
                            <th className="px-8 py-5">Percentage</th>
                            <th className="px-8 py-5">Status</th>
                          </tr>
                       </thead>
                       <tbody className={`divide-y ${borderSubColor}`}>
                          <tr>
                            <td className="px-8 py-6">
                               <p className="font-bold text-sm">MAT-101</p>
                               <p className={`text-[10px] font-bold ${mutedText} mt-1`}>Linear Algebra</p>
                            </td>
                            <td className="px-8 py-6 font-bold">32</td>
                            <td className="px-8 py-6 font-bold text-green-500">30</td>
                            <td className="px-8 py-6 font-bold text-red-500">2</td>
                            <td className="px-8 py-6 font-bold text-green-500">93.7%</td>
                            <td className="px-8 py-6 font-black text-green-500 italic tracking-wider">Excellent</td>
                          </tr>
                          <tr>
                            <td className="px-8 py-6">
                               <p className="font-bold text-sm">CS-301</p>
                               <p className={`text-[10px] font-bold ${mutedText} mt-1`}>Database Systems</p>
                            </td>
                            <td className="px-8 py-6 font-bold">23</td>
                            <td className="px-8 py-6 font-bold text-green-500">23</td>
                            <td className="px-8 py-6 font-bold text-red-500">0</td>
                            <td className="px-8 py-6 font-bold text-green-500">100%</td>
                            <td className="px-8 py-6 font-black text-green-400 italic tracking-wider">Spectacular</td>
                          </tr>
                          <tr>
                            <td className="px-8 py-6">
                               <p className="font-bold text-sm">ENG-105</p>
                               <p className={`text-[10px] font-bold ${mutedText} mt-1`}>English Comp</p>
                            </td>
                            <td className="px-8 py-6 font-bold">34</td>
                            <td className="px-8 py-6 font-bold text-green-500">30</td>
                            <td className="px-8 py-6 font-bold text-red-500">4</td>
                            <td className="px-8 py-6 font-bold text-green-500">88.3%</td>
                            <td className="px-8 py-6 font-black text-green-500 italic tracking-wider">Good</td>
                          </tr>
                       </tbody>
                    </table>
                 </div>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;