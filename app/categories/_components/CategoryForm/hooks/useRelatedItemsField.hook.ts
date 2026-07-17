import { useForm } from '@mantine/form';
import type { UseMutationResult } from '@tanstack/react-query';
import { useState } from 'react';

type TUseRelatedItemsField<TItem, TFormValues extends Record<string, unknown>, TMutationInput> = {
  initialItems: TItem[];
  initialSelectedIds: string[];
  formInitialValues: TFormValues;
  validate: (values: TFormValues) => Record<string, string>;
  mutation: UseMutationResult<TItem, Error, TMutationInput>;
  toMutationInput: (values: TFormValues) => TMutationInput;
  getItemId: (item: TItem) => number;
};

const useRelatedItemsField = <TItem, TFormValues extends Record<string, unknown>, TMutationInput>({
  initialItems,
  initialSelectedIds,
  formInitialValues,
  validate,
  mutation,
  toMutationInput,
  getItemId
}: TUseRelatedItemsField<TItem, TFormValues, TMutationInput>) => {
  const [items, setItems] = useState(initialItems);
  const [selectedIds, setSelectedIds] = useState(initialSelectedIds);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const form = useForm({ initialValues: formInitialValues, validate });

  const handleAdd = () => {
    const { hasErrors } = form.validate();
    if (hasErrors) return;
    mutation.mutate(toMutationInput(form.values), {
      onSuccess: (created) => {
        setItems((prev) => [...prev, created]);
        setSelectedIds((prev) => [...prev, String(getItemId(created))]);
        form.reset();
        setIsFormOpen(false);
      }
    });
  };

  return {
    items,
    selectedIds,
    setSelectedIds,
    isFormOpen,
    toggleForm: () => setIsFormOpen((prev) => !prev),
    form,
    mutation,
    handleAdd
  };
};

export { useRelatedItemsField };
