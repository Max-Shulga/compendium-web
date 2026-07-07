import { z } from 'zod';

import { TOPIC_DESCRIPTION_MAX, TOPIC_NAME_MAX } from '@/app/topics/_constants/topic.constant';


export const topicSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .max(TOPIC_NAME_MAX, `Max ${TOPIC_NAME_MAX} characters`),
  description: z.string().max(TOPIC_DESCRIPTION_MAX, `Max ${TOPIC_DESCRIPTION_MAX} characters`)
});
