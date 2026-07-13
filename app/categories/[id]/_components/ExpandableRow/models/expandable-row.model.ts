import type { PropsWithChildren } from 'react';

type TExpandableRowVariant = 'topic' | 'category';

type TExpandableRowProps = PropsWithChildren<{
  href: string;
  variant: TExpandableRowVariant;
  typeLabel: string;
  title: string;
  expanded: boolean;
  loading: boolean;
  onToggle: VoidFunction;
  description?: string;
}>;

export type { TExpandableRowProps, TExpandableRowVariant };
