'use client';

import { Alert, Button, Collapse, MultiSelect, Stack, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Card from '@/app/topics/_components/Card/Card';
import type { TCard } from '@/app/topics/_components/Card/models/card.model';
import { useCardMutation } from '@/app/topics/_components/Card/mutations/card.mutation';
import { cardSchema } from '@/app/topics/_components/Card/schemas/card.schema';
import { ROUTES } from '@/core/constants/routes.constant';
import zodResolver from '@/lib/zodResolver';

import type { TTopicForm } from './models/topicForm.model';
import { useTopicMutation } from './mutations/topic.mutation';
import { topicSchema } from './schemas/topic.schema';
import styles from './TopicForm.module.css';

const TopicFormFields = ({ allCards: initialCards, topic }: TTopicForm) => {
  const router = useRouter();

  const [allCards, setAllCards] = useState(initialCards);

  const [selectedCardIds, setSelectedCardIds] = useState<string[]>(
    topic?.topicCards
      ?.slice()
      .sort((firstCard, secondCard) => firstCard.order - secondCard.order)
      .map((topicCard) => String(topicCard.cardId)) ?? []
  );

  const [showNewCard, setShowNewCard] = useState(false);

  const form = useForm({
    initialValues: {
      name: topic?.name ?? '',
      description: topic?.description ?? ''
    },
    validate: zodResolver(topicSchema)
  });

  const newCardForm = useForm({
    initialValues: { title: '', text: '', examples: '' },
    validate: zodResolver(cardSchema)
  });

  const createCardMutation = useCardMutation();

  const handleAddCard = () => {
    const { hasErrors } = newCardForm.validate();
    if (hasErrors) return;
    createCardMutation.mutate(newCardForm.values, {
      onSuccess: (card) => {
        setAllCards((prev) => [...prev, card]);
        setSelectedCardIds((prev) => [...prev, String(card.id)]);
        newCardForm.reset();
        setShowNewCard(false);
      }
    });
  };

  const handleSaveCard = (updatedCard: TCard) => {
    setAllCards((prev) => prev.map((existingCard) =>
      (existingCard.id === updatedCard.id ? updatedCard : existingCard)));
  };

  const selectedCards = selectedCardIds
    .map((id) => allCards.find((card) => card.id === Number(id)))
    .filter((card): card is TCard => card !== undefined);

  const saveTopicMutation = useTopicMutation(topic);

  const handleSubmit = form.onSubmit(({ name, description }) =>
    saveTopicMutation.mutate({ name, description, selectedCardIds }, {
      onSuccess: (id) => router.push(ROUTES.topics.detail(id))
    }));

  const cardOptions = allCards.map((card) => ({ value: String(card.id), label: card.title }));
  const cancelHref = topic ? ROUTES.topics.detail(topic.id) : ROUTES.topics.list;

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap='lg'>
        {saveTopicMutation.isError && (
          <Alert color='red' variant='light'>
            {saveTopicMutation.error instanceof Error
              ? saveTopicMutation.error.message
              : 'Something went wrong'}
          </Alert>
        )}
        <div className={styles.section}>
          <span className={styles.sectionLabel}>Topic</span>
          <Stack gap='md'>
            <TextInput label='Name' {...form.getInputProps('name')} />
            <Textarea
              autosize
              label='Description'
              minRows={2}
              {...form.getInputProps('description')}
            />
          </Stack>
        </div>
        <div className={styles.section}>
          <span className={styles.sectionLabel}>Cards</span>
          <Stack gap='sm'>
            <MultiSelect
              searchable
              data={cardOptions}
              nothingFoundMessage='No cards found'
              placeholder='Select cards to include'
              value={selectedCardIds}
              onChange={setSelectedCardIds}
            />
            {selectedCards.length > 0 && (
              <div className={styles.selectedCards}>
                {selectedCards.map((card) => (
                  <Card card={card} key={card.id} onSave={handleSaveCard} />
                ))}
              </div>
            )}
            {topic && (
              <>
                <Button
                  size='xs'
                  style={{ alignSelf: 'flex-start' }}
                  type='button'
                  variant='subtle'
                  onClick={() => setShowNewCard((prev) => !prev)}
                >
                  {showNewCard ? 'Cancel' : '+ New card'}
                </Button>
                <Collapse expanded={showNewCard}>
                  <div className={styles.newCardPanel}>
                    <Stack gap='sm'>
                      {createCardMutation.isError && (
                        <Alert color='red' variant='light'>
                          {createCardMutation.error instanceof Error
                            ? createCardMutation.error.message
                            : 'Failed to create card'}
                        </Alert>
                      )}
                      <TextInput label='Card title' {...newCardForm.getInputProps('title')} />
                      <Textarea
                        autosize
                        label='Card text'
                        minRows={3}
                        {...newCardForm.getInputProps('text')}
                      />
                      <Textarea
                        autosize
                        label='Examples'
                        minRows={2}
                        {...newCardForm.getInputProps('examples')}
                      />
                      <Button
                        loading={createCardMutation.isPending}
                        size='sm'
                        type='button'
                        variant='light'
                        onClick={handleAddCard}
                      >
                        Create and add
                      </Button>
                    </Stack>
                  </div>
                </Collapse>
              </>
            )}
          </Stack>
        </div>
        <div className={styles.actions}>
          <Button
            color='gray'
            type='button'
            variant='subtle'
            onClick={() => router.push(cancelHref)}
          >
            Cancel
          </Button>
          <Button loading={saveTopicMutation.isPending} type='submit'>
            {topic ? 'Save changes' : 'Create topic'}
          </Button>
        </div>
      </Stack>
    </form>
  );
};

export default TopicFormFields;
