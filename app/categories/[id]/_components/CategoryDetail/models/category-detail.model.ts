import type { ReactNode } from 'react';

import type { TCategory, TCategoryItemView } from '@/app/categories/_models/categories.model';

type TCategoryDetail = { category: TCategory };

type TItemRenderer = (item: TCategoryItemView) => ReactNode;

export type { TCategoryDetail, TItemRenderer };
