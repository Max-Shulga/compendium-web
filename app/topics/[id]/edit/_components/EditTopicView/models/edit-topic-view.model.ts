import type { TCard } from '@/app/topics/_components/Card/models/card.model';
import type { TTopic } from '@/app/topics/_models/topics.model';

type TEditTopicView = { allCards: TCard[]; topic: TTopic };

export type { TEditTopicView };
