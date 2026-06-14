import type { AgentSummary } from './property';

export interface MonthlyRevenue {
  month: string;
  revenue: number;
  rankInAgency: number;
}

export interface AgencyMonthlyRevenue extends MonthlyRevenue {
  agencyId: number;
  agencyName: string;
}

export interface GlobalDashboard {
  totalRevenue: number;
  salesCount: number;
  propertiesCount: number;
  conversionRate: number;
  revenueByAgency: AgencyMonthlyRevenue[];
}

export interface AgencyDashboard {
  agencyId: number;
  agencyName: string;
  totalRevenue: number;
  salesCount: number;
  propertiesCount: number;
  agentsCount: number;
  conversionRate: number;
  monthlyRevenue: MonthlyRevenue[];
}

export interface AgencySummary {
  id: number;
  name: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  propertiesCount: number;
}

export interface AgencyDetail extends AgencySummary {
  agents: AgentSummary[];
}

export type TransactionStage = 'Interest' | 'Visit' | 'Offer' | 'Compromise' | 'Deed';

export const TRANSACTION_STAGE_LABELS: Record<TransactionStage, string> = {
  Interest: 'Intérêt',
  Visit: 'Visite',
  Offer: 'Offre',
  Compromise: 'Compromis',
  Deed: 'Acte',
};

export interface TransactionListItem {
  id: number;
  propertyId: number;
  propertyTitle: string;
  propertyImageUrl: string | null;
  clientName: string;
  agentName: string | null;
  currentStage: TransactionStage;
  createdAt: string;
  updatedAt: string | null;
}

export type VisitStatus = 'Scheduled' | 'Completed' | 'Cancelled';

export interface VisitItem {
  id: number;
  propertyId: number;
  propertyTitle: string;
  clientId: number;
  clientName: string;
  agentId: number | null;
  agentName: string | null;
  scheduledAt: string;
  status: VisitStatus;
  notes: string;
}

export const VISIT_STATUS_LABELS: Record<VisitStatus, string> = {
  Scheduled: 'Planifiée',
  Completed: 'Terminée',
  Cancelled: 'Annulée',
};

export interface ConversationSummary {
  userId: number;
  userName: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
}

export interface Message {
  id: number;
  senderId: number;
  senderName: string;
  recipientId: number;
  recipientName: string;
  content: string;
  sentAt: string;
  isRead: boolean;
}
