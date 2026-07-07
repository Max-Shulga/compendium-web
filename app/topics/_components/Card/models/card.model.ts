type TCard = {
  id: number;
  title: string;
  text: string;
  examples?: string;
};

type CreateCardDto = {
  title: string;
  text: string;
  examples?: string;
};

type UpdateCardDto = Partial<CreateCardDto>;

type TCardMutationValues = {
  title: string;
  text: string;
  examples: string;
};

type TCardItem = {
  card: TCard;
  onSave: (card: TCard) => void;
};

export type { TCard, CreateCardDto, UpdateCardDto, TCardMutationValues, TCardItem };
