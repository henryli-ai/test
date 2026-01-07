
import React, { useState, useMemo, useEffect } from 'react';
import { INITIAL_CASES, CATEGORIES, INDUSTRIES } from './constants';
import { SuccessCase, Role, Industry } from './types';
import CaseCard from './components/CaseCard';
import AIChat from './components/AIChat';
import UploadPortal from './components/UploadPortal';
import { Search, PlusSquare, Info, X, Sparkles, Filter, Menu, Bot, ShieldCheck } from 'lucide-react';

const App: React.FC = () => {
  const [cases, setCases] = useState<SuccessCase[]>(INITIAL_CASES);
  const [selectedRole, setSelectedRole] = useState<Role>('All');
  const [selectedIndustry, setSelectedIndustry] = useState<Industry>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<SuccessCase | null>(null);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  
  const [showIdleReminder, setShowIdleReminder] = useState(false);
  const [hasShownReminder, setHasShownReminder] = useState(false);

  const filteredCases = useMemo(() => {
    return cases.filter(c => {
      const matchesRole = selectedRole === 'All' || c.role === selectedRole;
      const matchesIndustry = selectedIndustry === 'All' || c.industry === selectedIndustry;
      const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           c.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           c.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesRole && matchesIndustry && matchesSearch;
    });
  }, [cases, selectedRole, selectedIndustry, searchQuery]);

  useEffect(() => {
    if (hasShownReminder || isChatOpen) return;

    let timeoutId: number;
    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        if (!hasShownReminder && !isChatOpen) {
          setShowIdleReminder(true);
          setHasShownReminder(true);
        }
      }, 15000);
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    resetTimer();

    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      clearTimeout(timeoutId);
    };
  }, [hasShownReminder, isChatOpen]);

  const handleAddCase = (newCase: SuccessCase) => {
    setCases(prev => [newCase, ...prev]);
    setIsUploadOpen(false);
  };

  const handleOpenCase = (id: string) => {
    const found = cases.find(c => c.id === id);
    if (found) setSelectedCase(found);
  };

  return (
    <div className="min-h-screen pb-20 relative bg-gray-50 overflow-x-hidden">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 md:px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex flex-col cursor-pointer group" onClick={() => window.location.reload()}>
          <h1 className="text-xl md:text-2xl font-black tracking-tighter leading-none">
            <span className="text-indigo-600">TPI</span><span className="text-slate-900">software</span>
          </h1>
          <p className="text-[8px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1 hidden xs:block">
            Your AI partner for mission-critical Success
          </p>
        </div>
        
        <div className="flex-1 max-w-md mx-4 hidden sm:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="搜尋商機、技術或成效..." 
              className="w-full bg-gray-100 border-none rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-indigo-500 transition-all text-xs outline-none font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={() => setIsSearchVisible(!isSearchVisible)}
            className="p-2 sm:hidden text-slate-500 hover:bg-gray-100 rounded-full"
          >
            <Search className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setIsUploadOpen(true)} 
            className="flex items-center gap-1.5 px-3 md:px-5 py-2 md:py-2.5 bg-slate-900 text-white rounded-full font-black text-[10px] md:text-xs hover:bg-slate-800 transition-all active:scale-95 shadow-lg"
          >
            <PlusSquare className="w-3.5 h-3.5 md:w-4 h-4" />
            <span>發佈解決方案</span>
          </button>
        </div>
      </nav>

      {/* Mobile Search Overlay */}
      {isSearchVisible && (
        <div className="sm:hidden p-4 bg-white border-b border-gray-100 animate-in slide-in-from-top duration-300">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              autoFocus
              type="text" 
              placeholder="搜尋商機、技術或成效..." 
              className="w-full bg-gray-100 border-none rounded-xl py-3 pl-10 pr-10 text-sm outline-none font-bold"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={() => setIsSearchVisible(false)} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-3 md:px-6">
        {/* Role Categories - Story Style */}
        <div className="flex gap-4 md:gap-6 overflow-x-auto pb-6 pt-6 no-scrollbar snap-x">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedRole(cat.id as Role)}
              className="flex flex-col items-center gap-1.5 min-w-[70px] md:min-w-[84px] group snap-start"
            >
              <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full p-0.5 border-2 ${selectedRole === cat.id ? 'border-indigo-600 shadow-lg scale-105' : 'border-gray-100'} transition-all duration-300`}>
                <div className="w-full h-full rounded-full flex items-center justify-center text-xl md:text-2xl bg-white shadow-inner">
                  {cat.icon}
                </div>
              </div>
              <span className={`text-[10px] md:text-[11px] font-black tracking-tight whitespace-nowrap ${selectedRole === cat.id ? 'text-slate-900' : 'text-slate-400'}`}>
                {cat.label}
              </span>
            </button>
          ))}
        </div>

        {/* Industry Filter Section */}
        <div className="bg-white border border-gray-100 p-3 md:p-5 rounded-2xl md:rounded-[24px] mb-6 md:mb-10 shadow-sm flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
          <div className="flex items-center gap-2 px-1">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">產業矩陣</span>
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0 snap-x">
            {INDUSTRIES.map(ind => (
              <button
                key={ind.id}
                onClick={() => setSelectedIndustry(ind.id as Industry)}
                className={`px-4 md:px-5 py-2 md:py-2.5 rounded-full text-[10px] md:text-xs font-black whitespace-nowrap transition-all flex items-center gap-1.5 border snap-start ${
                  selectedIndustry === ind.id 
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' 
                    : 'bg-white border-gray-100 text-slate-500 hover:border-indigo-200'
                }`}
              >
                <span>{ind.icon}</span>
                {ind.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Layout - Mobile: 2 Columns, MD: 2, LG: 3 */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8 pb-32">
          {filteredCases.length > 0 ? (
            filteredCases.map(c => (
              <CaseCard key={c.id} item={c} onClick={() => setSelectedCase(c)} />
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
              <Info className="w-12 h-12 text-gray-100 mx-auto mb-4" />
              <h3 className="text-base font-bold text-slate-400 mb-2">尚未佈署相關解決方案</h3>
              <p className="text-xs text-slate-400 font-medium">請嘗試更換分類，或使用 AI 顧問進行初步架構諮詢</p>
            </div>
          )}
        </div>
      </main>

      {/* Floating Action Button for Chat */}
      <div className="fixed bottom-6 right-4 md:bottom-8 md:right-8 z-[100] flex flex-col items-end gap-4">
        {showIdleReminder && !isChatOpen && (
          <div className="bg-slate-900 px-6 py-5 rounded-[24px] shadow-2xl border border-white/10 max-w-[220px] relative animate-in slide-in-from-bottom-4 fade-in duration-700 hidden sm:block">
            <button onClick={() => setShowIdleReminder(false)} className="absolute -top-2 -right-2 bg-indigo-500 text-white rounded-full p-1.5 shadow-lg hover:bg-indigo-600 transition-colors">
              <X className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-center gap-2 text-indigo-400 mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[8px] font-black uppercase tracking-[0.2em]">Architecture Consultation</span>
            </div>
            <p className="text-[11px] text-white font-bold leading-relaxed">
              正在規劃 Mission-Critical 的<br/>
              <span className="text-indigo-400 font-black">AI 架構與治理嗎？</span>
            </p>
            <div className="absolute bottom-0 right-10 translate-y-1/2 rotate-45 w-4 h-4 bg-slate-900 border-r border-b border-white/10"></div>
          </div>
        )}
        <button 
          onClick={() => setIsChatOpen(true)}
          className={`w-14 h-14 md:w-20 md:h-20 rounded-2xl shadow-2xl flex items-center justify-center transform hover:scale-110 active:scale-95 transition-all duration-500 border-4 border-white bg-indigo-600 ${isChatOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
        >
          <Bot className="w-7 h-7 md:w-10 md:h-10 text-white" />
          <div className="absolute -top-1 -right-1">
            <span className="relative flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-indigo-300 border-2 border-white shadow-sm"></span>
            </span>
          </div>
        </button>
      </div>

      <AIChat 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        cases={cases}
        onSelectCase={handleOpenCase}
      />

      {isUploadOpen && <UploadPortal onClose={() => setIsUploadOpen(false)} onAdd={handleAddCase} />}

      {/* Case Details Modal - Fully Responsive */}
      {selectedCase && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-500">
          <div className="bg-white w-full h-full sm:h-auto sm:max-w-6xl sm:max-h-[90vh] sm:rounded-[40px] overflow-hidden flex flex-col md:flex-row relative shadow-2xl">
            <button onClick={() => setSelectedCase(null)} className="absolute top-4 right-4 sm:top-8 sm:right-8 z-20 p-2 sm:p-4 bg-black/20 hover:bg-black/40 rounded-full text-white backdrop-blur-md">
              <X className="w-6 h-6" />
            </button>
            <div className="w-full md:w-1/2 lg:w-3/5 bg-slate-900 flex items-center justify-center h-64 md:h-auto shrink-0">
              <img src={selectedCase.imageUrl} alt={selectedCase.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 p-6 sm:p-12 overflow-y-auto flex flex-col bg-white">
              <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-2xl border border-indigo-100 shrink-0">
                  {INDUSTRIES.find(i => i.id === selectedCase.industry)?.icon || '🏢'}
                </div>
                <div>
                  <h3 className="font-black text-xl sm:text-2xl leading-tight text-slate-900">{selectedCase.title}</h3>
                  <p className="text-sm sm:text-lg text-indigo-600 font-bold mt-1">{selectedCase.client}</p>
                </div>
              </div>
              <div className="space-y-8 flex-1">
                <section>
                  <h4 className="font-black text-slate-400 mb-4 text-[9px] uppercase tracking-[0.3em] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-500" />
                    商業價值指標
                  </h4>
                  <div className="bg-slate-900 text-white p-5 sm:p-8 rounded-3xl text-lg sm:text-xl font-black border-l-4 border-indigo-500">
                    {selectedCase.results}
                  </div>
                </section>
                <section>
                  <h4 className="font-black text-slate-400 mb-4 text-[9px] uppercase tracking-[0.3em] border-b border-gray-100 pb-2">架構與解決方案細節</h4>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-bold whitespace-pre-line">{selectedCase.detailedContent}</p>
                </section>
              </div>
              <div className="mt-10">
                <button className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-sm sm:text-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-xl">
                  索取 TPI 專業技術白皮書
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
