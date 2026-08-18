import type {
  TInterviewCard
} from '@/app/interview-topics/_components/InterviewCard/models/interview-card.model';

type TInterviewTopic = {
  id: number;
  title: string;
  description?: string;
  cards?: TInterviewCard[];
  createdAt: string;
  updatedAt: string;
};

export type { TInterviewTopic };
