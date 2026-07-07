import { useMutation } from '@tanstack/react-query';

import type { TTopic } from '@/app/topics/_models/topics.model';
import { topicsApi } from '@/app/topics/api';

import type { TTopicMutationValues } from '../models/topicForm.model';

const useTopicMutation = (topic?: TTopic) => useMutation({
  mutationFn: async ({ name, description, selectedCardIds }: TTopicMutationValues) => {
    if (topic) {
      await topicsApi.updateTopic(topic.id,
        { name, description: description.length > 0 ? description : undefined });
      await topicsApi.updateCards(topic.id, { cardIds: selectedCardIds.map(Number) });

      return topic.id;
    }

    const created = await topicsApi.create({
      name,
      description: description.length > 0 ? description : undefined,
      cards: selectedCardIds.map((id) => ({ cardId: Number(id) }))
    });

    return created.id;
  }
});

export { useTopicMutation };
