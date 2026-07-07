import { z } from 'zod';

import { CARD_TEXT_MAX, CARD_TITLE_MAX } from '../_constants/card.constant';

export const cardSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(CARD_TITLE_MAX, `Max ${CARD_TITLE_MAX} characters`),
  text: z.string().min(1, 'Text is required').max(CARD_TEXT_MAX, `Max ${CARD_TEXT_MAX} characters`),
  examples: z.string().max(CARD_TEXT_MAX, `Max ${CARD_TEXT_MAX} characters`)
});
