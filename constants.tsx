
import { SuccessCase } from './types';

export const INITIAL_CASES: SuccessCase[] = [
  {
    id: '1',
    title: 'AI 全自動代碼現代化流水線',
    client: '頂尖金融集團',
    role: 'SoftwareDevelopment',
    industry: 'Finance',
    summary: '利用大語言模型加速遺留代碼重構，將 legacy 系統遷移效率提升 3 倍。',
    detailedContent: '透過生成式 AI 自動識別舊系統漏洞並建議重構路徑，確保金融系統在高安全性下完成雲端遷移。',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    tags: ['代碼生成', '雲端遷移', '安全合規'],
    date: '2024-03-15',
    results: '重構耗時降低 70%，Bug 檢出率提升 40%'
  },
  {
    id: '2',
    title: '企業級智慧知識庫與客戶助手',
    client: '全球零售龍頭',
    role: 'CustomerExperience',
    industry: 'Retail',
    summary: '整合 RAG 技術建立全天候智慧客服，實現毫秒級精準回應與個人化服務。',
    detailedContent: '分析數百萬筆產品手冊與交易紀錄，讓客服機器人具備專家級諮詢能力，大幅提升客戶滿意度。',
    imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=800',
    tags: ['RAG 技術', '個人化建議', '24/7 服務'],
    date: '2024-04-02',
    results: '客戶滿意度 (CSAT) 提升 25%，人工負荷降低 60%'
  },
  {
    id: '3',
    title: '生成式行銷創意與內容自動化',
    client: '國際精品集團',
    role: 'MarketingCreative',
    industry: 'Technology',
    summary: '跨平台廣告文案自動生成，針對不同受眾進行 A/B 測試優化。',
    detailedContent: '結合品牌語調模型，自動生成多國語言的社群內容與產品描述，實現快速市場反應。',
    imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800',
    tags: ['內容創作', '多語系支援', '轉化優化'],
    date: '2024-02-10',
    results: '內容產出速度提升 10 倍，廣告點擊率 (CTR) 增加 35%'
  },
  {
    id: '4',
    title: '智慧營運流程與決策自動化',
    client: '智慧製造先驅',
    role: 'OperationsEfficiency',
    industry: 'Manufacturing',
    summary: '優化供應鏈調度與庫存管理，利用預測性分析降低營運損耗。',
    detailedContent: '透過 AI 監測全球物流動態與庫存水位，自動生成採購建議並優化廠內物流路徑。',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
    tags: ['流程優化', '需求預測', '供應鏈安全'],
    date: '2024-05-20',
    results: '庫存週轉率提升 22%，物流成本降低 15%'
  },
  {
    id: '5',
    title: '大數據驅動的商業洞察平台',
    client: '數位醫療研究機構',
    role: 'DataInsight',
    industry: 'Healthcare',
    summary: '從海量非結構化醫學文獻中提取關鍵洞察，加速研發決策。',
    detailedContent: '利用自然語言處理技術自動摘要科研報告，幫助團隊在數分鐘內獲取跨年度的數據趨勢。',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
    tags: ['深度分析', '趨勢預測', '科研加速'],
    date: '2024-01-25',
    results: '研發分析週期從數月縮短至數週'
  },
  {
    id: '6',
    title: '政府智慧政務與市民對話系統',
    client: '城市行政中心',
    role: 'ProfessionalServices',
    industry: 'PublicSector',
    summary: '提供自動化法律諮詢與行政流程引導，縮短民眾申辦時間。',
    detailedContent: '針對公共法律條文進行預訓練，讓市民能透過對話快速理解補貼申請、稅務法規等複雜資訊。',
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800',
    tags: ['智慧政務', '法律諮詢', '公共服務'],
    date: '2024-06-01',
    results: '平均辦理效率提升 45%，諮詢滿意度達 92%'
  }
];

export const CATEGORIES = [
  { id: 'All', label: '全部解決方案', icon: '✨' },
  { id: 'SoftwareDevelopment', label: '軟體開發', icon: '🛠️' },
  { id: 'CustomerExperience', label: '客戶體驗', icon: '💬' },
  { id: 'MarketingCreative', label: '行銷創意', icon: '🎨' },
  { id: 'OperationsEfficiency', label: '營運效率', icon: '⚡' },
  { id: 'DataInsight', label: '數據洞察', icon: '📈' },
  { id: 'ProfessionalServices', label: '專業服務', icon: '💼' },
];

export const INDUSTRIES = [
  { id: 'All', label: '所有產業', icon: '🏢' },
  { id: 'Finance', label: '金融保險', icon: '🏦' },
  { id: 'Healthcare', label: '醫療保健', icon: '🏥' },
  { id: 'Retail', label: '零售消費', icon: '🛍️' },
  { id: 'Technology', label: '科技通訊', icon: '📱' },
  { id: 'Manufacturing', label: '製造工業', icon: '🏗️' },
  { id: 'PublicSector', label: '公共部門', icon: '🏛️' },
];
