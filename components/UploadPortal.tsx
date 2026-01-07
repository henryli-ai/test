
import React, { useState, useRef } from 'react';
import { X, Upload, FileText, CheckCircle, Loader2 } from 'lucide-react';
import { SuccessCase, Role, Industry } from '../types';

interface UploadPortalProps {
  onClose: () => void;
  onAdd: (c: SuccessCase) => void;
}

const UploadPortal: React.FC<UploadPortalProps> = ({ onClose, onAdd }) => {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    role: 'SoftwareDevelopment' as Role,
    industry: 'Technology' as Industry,
    summary: '',
    results: ''
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file || !formData.title) return;
    
    setIsUploading(true);
    setTimeout(() => {
      const newCase: SuccessCase = {
        id: Math.random().toString(36).substr(2, 9),
        title: formData.title,
        client: formData.client || '企業合作夥伴',
        role: formData.role,
        industry: formData.industry,
        summary: formData.summary || 'AI 自動提取的案例摘要：針對企業關鍵場景實現數位化賦能。',
        detailedContent: `本案例由 ${file.name} 解析。專案核心在於 ${formData.role} 領域的轉型，確保解決解決方案具備穩定性。`,
        imageUrl: `https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=800`,
        tags: [formData.role, 'AI Transformation'],
        date: new Date().toLocaleDateString(),
        results: formData.results || '顯著提升營運指標'
      };
      setIsUploading(false);
      setStep(3);
      setTimeout(() => onAdd(newCase), 1500);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full h-[90vh] sm:h-auto sm:max-w-xl rounded-t-[32px] sm:rounded-[32px] overflow-hidden shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-6 sm:p-8 border-b border-gray-100">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900">發佈企業成功案例</h2>
            <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-bold">支援 PPT, PDF, DOCX</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-slate-400">
            <X className="w-5 h-5 sm:w-6 h-6" />
          </button>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto">
          {step === 1 && (
            <div className="space-y-6">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-200 rounded-[24px] p-8 sm:p-12 flex flex-col items-center justify-center hover:border-purple-400 hover:bg-purple-50 transition-all cursor-pointer group"
              >
                <input 
                  type="file" 
                  className="hidden" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                />
                <div className="w-16 h-16 sm:w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6 sm:w-8 h-8 text-[#7c3aed]" />
                </div>
                {file ? (
                  <div className="text-center">
                    <p className="font-bold text-slate-900 text-sm">{file.name}</p>
                    <p className="text-[10px] text-purple-600 font-black uppercase mt-1">點擊更換文件</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="font-black text-slate-900 text-base sm:text-lg">上傳專案報告</p>
                    <p className="text-[10px] sm:text-[11px] text-slate-400 mt-2 font-bold">AI 將自動進行企業標準分類</p>
                  </div>
                )}
              </div>

              <button 
                onClick={() => setStep(2)}
                disabled={!file}
                className="w-full py-4 sm:py-5 bg-slate-900 text-white rounded-2xl font-black shadow-xl hover:bg-slate-800 disabled:opacity-50"
              >
                繼續配置分類
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 sm:space-y-5">
              <div className="space-y-4">
                <div>
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">案例標題 *</label>
                  <input 
                    type="text" 
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 sm:p-4 text-sm outline-none font-bold"
                    placeholder="專案名稱"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">解決方案</label>
                    <select 
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 sm:p-4 text-xs font-bold outline-none"
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value as Role})}
                    >
                      <option value="SoftwareDevelopment">軟體開發</option>
                      <option value="CustomerExperience">客戶體驗</option>
                      <option value="MarketingCreative">行銷創意</option>
                      <option value="OperationsEfficiency">營運效率</option>
                      <option value="DataInsight">數據洞察</option>
                      <option value="ProfessionalServices">專業服務</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">產業</label>
                    <select 
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 sm:p-4 text-xs font-bold outline-none"
                      value={formData.industry}
                      onChange={(e) => setFormData({...formData, industry: e.target.value as Industry})}
                    >
                      <option value="Finance">金融保險</option>
                      <option value="Healthcare">醫療保健</option>
                      <option value="Retail">零售消費</option>
                      <option value="Technology">科技通訊</option>
                      <option value="Manufacturing">製造工業</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={handleUpload}
                disabled={isUploading || !formData.title}
                className="w-full py-4 bg-[#7c3aed] text-white rounded-2xl font-black shadow-xl flex items-center justify-center gap-2"
              >
                {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : '正式發佈'}
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="py-10 text-center">
              <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-5 border border-green-100">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-black text-slate-900">發佈成功</h3>
              <p className="text-slate-500 mt-2 text-sm px-6 font-bold leading-relaxed">
                您的成功案例已依據企業標準同步歸檔。
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPortal;
