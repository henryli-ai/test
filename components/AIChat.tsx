
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Loader2, ExternalLink, ClipboardList, SendHorizontal, Sparkles, ShieldCheck, Database, LayoutGrid } from 'lucide-react';
import { ChatMessage, SuccessCase } from '../types';
import { askAiAboutCases } from '../geminiService';

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
  cases: SuccessCase[];
  onSelectCase: (id: string) => void;
}

const AIChat: React.FC<AIChatProps> = ({ isOpen, onClose, cases, onSelectCase }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: '• 歡迎來到 TPI 智慧架構室\n• 我是您的 AI 轉型顧問\n• 請問您目前計畫將 AI 應用於哪些核心業務場景？' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [solutionFramework, setSolutionFramework] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, solutionFramework]);

  const handleSend = async (overrideMsg?: string) => {
    const userMsg = overrideMsg || inputValue.trim();
    if (!userMsg || isLoading) return;

    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    try {
      let response = await askAiAboutCases(userMsg, cases, history);
      
      // 檢測是否有 [FRAME_GEN] 標籤
      if (response?.includes('[FRAME_GEN]')) {
        const parts = response.split('[FRAME_GEN]');
        setSolutionFramework(parts[1].trim());
        response = parts[0].trim() || '• 我已為您擬定初步技術框架：';
      }

      setMessages(prev => [...prev, { role: 'assistant', content: response || '• 了解您的需求，請繼續描述' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: '• 顧問連線中斷\n• 請直接連繫專人處理' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendToConsultant = () => {
    setIsSent(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: '• 框架建議書已同步至顧問終端\n• 我們將針對此架構進行可行性評估\n• 感謝信任 TPI Mission-Critical 服務' 
      }]);
      setIsSent(false);
      setSolutionFramework(null);
    }, 2000);
  };

  const renderContent = (content: string) => {
    let text = content;
    const elements: React.ReactNode[] = [];
    const caseRegex = /\[案例: ([^\]]+)\]/g;
    let lastIndex = 0;
    let match;

    while ((match = caseRegex.exec(text)) !== null) {
      const id = match[1].trim();
      const caseItem = cases.find(c => c.id === id);
      elements.push(text.substring(lastIndex, match.index));
      elements.push(
        <button
          key={match.index}
          onClick={() => onSelectCase(id)}
          className="inline-flex items-center gap-1 px-2 py-0.5 bg-indigo-50 text-[#7c3aed] rounded border border-indigo-100 font-black text-[10px] mx-1 hover:bg-indigo-100 transition-all"
        >
          <ExternalLink className="w-2.5 h-2.5" />
          {caseItem ? '相關範本' : '查看詳情'}
        </button>
      );
      lastIndex = caseRegex.lastIndex;
    }
    elements.push(text.substring(lastIndex));

    return (
      <div className="whitespace-pre-line leading-relaxed tracking-tight">
        {elements}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[420px] bg-white shadow-2xl z-[150] flex flex-col animate-in slide-in-from-right duration-500 ease-out border-l border-gray-100">
      {/* Header */}
      <div className="p-5 bg-slate-900 text-white flex items-center justify-between shrink-0 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg border border-white/20">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-black text-sm tracking-tight flex items-center gap-2">
              TPI 架構顧問
              <span className="px-1.5 py-0.5 bg-indigo-500/20 text-indigo-300 text-[8px] rounded border border-indigo-500/30 uppercase tracking-widest">Enterprise</span>
            </h3>
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Your AI Partner</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <X className="w-5 h-5 text-slate-400" />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-6 bg-slate-50/40 no-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[90%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm ${
                msg.role === 'user' ? 'bg-slate-900' : 'bg-white border border-indigo-100'
              }`}>
                {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Sparkles className="w-4 h-4 text-[#7c3aed]" />}
              </div>
              <div className={`p-4 rounded-2xl text-[12px] font-bold shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-slate-900 text-white rounded-tr-none' 
                  : 'bg-white text-slate-700 rounded-tl-none border border-white'
              }`}>
                {renderContent(msg.content)}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-3 items-center">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center border border-indigo-50 animate-pulse">
                <Loader2 className="w-4 h-4 text-[#7c3aed] animate-spin" />
              </div>
              <div className="p-3 bg-white text-slate-300 rounded-xl rounded-tl-none border border-gray-50 text-[10px] font-black italic">
                分析企業核心指標中...
              </div>
            </div>
          </div>
        )}

        {/* 解決方案框架呈現 */}
        {solutionFramework && !isLoading && (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="bg-white border-2 border-indigo-500 rounded-[32px] overflow-hidden shadow-2xl shadow-indigo-100">
              <div className="bg-indigo-500 px-6 py-3 flex items-center justify-between">
                <span className="text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  <LayoutGrid className="w-3.5 h-3.5" />
                  初步解決方案框架
                </span>
                <Sparkles className="w-4 h-4 text-white/50" />
              </div>
              <div className="p-6 space-y-5">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-indigo-50/50 p-3 rounded-xl border border-indigo-100">
                    <p className="text-[8px] font-black text-indigo-400 uppercase mb-1">關鍵技術</p>
                    <p className="text-[11px] font-black text-slate-800 flex items-center gap-1">
                      <Database className="w-3 h-3" /> OpenAI RAG
                    </p>
                  </div>
                  <div className="bg-indigo-50/50 p-3 rounded-xl border border-indigo-100">
                    <p className="text-[8px] font-black text-indigo-400 uppercase mb-1">管理層級</p>
                    <p className="text-[11px] font-black text-slate-800 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> TPI APIM
                    </p>
                  </div>
                </div>
                <div className="bg-slate-900 p-4 rounded-2xl">
                  <p className="text-[9px] font-black text-slate-500 uppercase mb-2 tracking-widest">框架摘要</p>
                  <p className="text-[11px] text-indigo-100 font-bold leading-relaxed whitespace-pre-line italic">
                    {solutionFramework}
                  </p>
                </div>
                <button 
                  onClick={handleSendToConsultant}
                  disabled={isSent}
                  className="w-full py-4 bg-indigo-500 text-white rounded-2xl text-[11px] font-black flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all shadow-lg active:scale-95 disabled:bg-slate-300"
                >
                  {isSent ? '已提交至技術團隊' : (
                    <>
                      <SendHorizontal className="w-4 h-4" />
                      一鍵送出並申請技術驗證
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-5 border-t bg-white pb-8">
        <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
          <button onClick={() => handleSend("我想了解雲地混合佈署")} className="whitespace-nowrap px-3 py-1.5 bg-slate-50 text-slate-600 rounded-full text-[10px] font-black border border-gray-100 hover:border-indigo-200">雲地混合建議</button>
          <button onClick={() => handleSend("如何用 APIM 管理 AI Agent?")} className="whitespace-nowrap px-3 py-1.5 bg-slate-50 text-slate-600 rounded-full text-[10px] font-black border border-gray-100 hover:border-indigo-200">AI 管理平台</button>
          <button onClick={() => handleSend("大數據量體下的 RAG 優化")} className="whitespace-nowrap px-3 py-1.5 bg-slate-50 text-slate-600 rounded-full text-[10px] font-black border border-gray-100 hover:border-indigo-200">RAG 性能提升</button>
        </div>
        
        <div className="relative flex items-center">
          <input 
            type="text" 
            placeholder="描述您面臨的 Mission-Critical 挑戰..."
            className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-5 pr-12 text-[12px] focus:ring-2 focus:ring-indigo-500 transition-all outline-none font-bold"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={() => handleSend()}
            disabled={!inputValue.trim() || isLoading}
            className="absolute right-2 p-2.5 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 disabled:bg-gray-200 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-center text-[8px] text-slate-300 font-black uppercase tracking-[0.4em] mt-5">
          TPIsoftware Mission-Critical AI Partner
        </p>
      </div>
    </div>
  );
};

export default AIChat;
