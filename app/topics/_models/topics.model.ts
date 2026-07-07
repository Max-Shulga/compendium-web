import type { TCard } from '@/app/topics/_components/Card/models/card.model';

type TTopicCard = {
  id: number;
  topicId: number;
  cardId: number;
  order: number;
  card: TCard;
};

type TTopic = {
  id: number;
  name: string;
  description?: string;
  topicCards?: TTopicCard[];
  createdAt: string;
  updatedAt: string;
};

type CreateTopicDto = {
  name: string;
  description?: string;
  cards?: { cardId: number }[];
};

type UpdateTopicDto = {
  name?: string;
  description?: string;
};

type UpdateTopicCardsDto = {
  cardIds: number[];
};

export type { TTopic, CreateTopicDto, UpdateTopicDto, UpdateTopicCardsDto };
