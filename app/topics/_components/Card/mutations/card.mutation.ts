import { useMutation } from '@tanstack/react-query';

import { cardsApi } from '../api';
import type { TCard, TCardMutationValues } from '../models/card.model';

const useCardMutation = (card?: TCard) => useMutation({
  mutationFn: (values: TCardMutationValues) => {
    const { title, text, examples } = values;
    const payload = { title, text, examples: examples.length > 0 ? examples : undefined };

    return card ? cardsApi.update(card.id, payload) : cardsApi.create(payload);
  }
});

export { useCardMutation };
