import { z } from 'zod';

import {
  CATEGORY_DESCRIPTION_MAX,
  CATEGORY_NAME_MAX
} from '@/app/categories/_constants/category.constant';

export const categorySchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .max(CATEGORY_NAME_MAX, `Max ${CATEGORY_NAME_MAX} characters`),
  description: z.string()
    .max(CATEGORY_DESCRIPTION_MAX, `Max ${CATEGORY_DESCRIPTION_MAX} characters`)
});
