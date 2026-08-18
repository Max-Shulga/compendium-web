import type { TInterviewTopic } from '@/app/interview-topics/_models/interview-topics.model';

import type { VIEW_MODES } from '../_constants/viewMode.constant';

type TInterviewTopicDetail = { topic: TInterviewTopic };

type TViewMode = typeof VIEW_MODES[keyof typeof VIEW_MODES];

export type { TInterviewTopicDetail, TViewMode };
