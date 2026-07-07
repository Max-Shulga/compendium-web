'use client';

import { Alert, Button, Collapse, Stack, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';

import zodResolver from '@/lib/zodResolver';

import styles from './Card.module.css';
import type { TCardItem } from './models/card.model';
import { useCardMutation } from './mutations/card.mutation';
import { cardSchema } from './schemas/card.schema';

const Card = ({ card, onSave }: TCardItem) => {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm({
    initialValues: { title: card.title, text: card.text, examples: card.examples ?? '' },
    validate: zodResolver(cardSchema)
  });

  const mutation = useCardMutation(card);

  const handleToggle = () => {
    if (isEditing) {
      setIsEditing(false);

      return;
    }
    form.setValues({ title: card.title, text: card.text, examples: card.examples ?? '' });
    form.resetDirty();
    setIsEditing(true);
  };

  const handleSave = () => {
    const { hasErrors } = form.validate();
    if (hasErrors) return;
    mutation.mutate(form.values, {
      onSuccess: (updatedCard) => {
        onSave(updatedCard);
        setIsEditing(false);
      }
    });
  };

  return (
    <div className={styles.row}>
      <div className={styles.header}>
        <span className={styles.title}>{card.title}</span>
        <Button size='xs' type='button' variant='subtle' onClick={handleToggle}>
          {isEditing ? 'Cancel' : 'Edit'}
        </Button>
      </div>
      <Collapse expanded={isEditing}>
        <div className={styles.panel}>
          <Stack gap='sm'>
            {mutation.isError && (
              <Alert color='red' variant='light'>
                {mutation.error instanceof Error ? mutation.error.message : 'Failed to save card'}
              </Alert>
            )}
            <TextInput label='Card title' {...form.getInputProps('title')} />
            <Textarea autosize label='Card text' minRows={3} {...form.getInputProps('text')} />
            <Textarea autosize label='Examples' minRows={2} {...form.getInputProps('examples')} />
            <Button
              loading={mutation.isPending}
              size='sm'
              type='button'
              variant='light'
              onClick={handleSave}
            >
              Save
            </Button>
          </Stack>
        </div>
      </Collapse>
    </div>
  );
};

export default Card;
