import type { TCard } from '@/app/topics/_components/Card/models/card.model';
import type { TTopic } from '@/app/topics/_models/topics.model';

type TTopicForm = { allCards: TCard[]; topic?: TTopic };

type TTopicMutationValues = {
  name: string;
  description: string;
  selectedCardIds: string[];
};

export type { TTopicForm, TTopicMutationValues };
