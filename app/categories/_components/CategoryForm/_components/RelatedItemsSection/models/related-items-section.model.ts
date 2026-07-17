import type { ReactNode } from 'react';

type TSelectOption = {
  value: string;
  label: string;
};

type TRelatedItemsSection = {
  label: string;
  options: TSelectOption[];
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
  placeholder: string;
  nothingFoundMessage: string;
  showCreateNew: boolean;
  addButtonLabel: string;
  isFormOpen: boolean;
  onToggleForm: () => void;
  isError: boolean;
  errorMessage: string;
  isPending: boolean;
  onSubmitNew: () => void;
  children: ReactNode;
};

export type { TRelatedItemsSection, TSelectOption };
