
export type Role = 
  | 'SoftwareDevelopment' 
  | 'CustomerExperience' 
  | 'MarketingCreative' 
  | 'OperationsEfficiency' 
  | 'DataInsight' 
  | 'ProfessionalServices' 
  | 'All';

export type Industry = 
  | 'Finance' 
  | 'Healthcare' 
  | 'Retail' 
  | 'Technology' 
  | 'Manufacturing' 
  | 'PublicSector' 
  | 'All';

export interface SuccessCase {
  id: string;
  title: string;
  client: string;
  role: Role;
  industry: Industry;
  summary: string;
  detailedContent: string;
  imageUrl: string;
  tags: string[];
  date: string;
  results: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
