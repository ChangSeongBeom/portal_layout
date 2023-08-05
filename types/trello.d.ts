type ToDoList = {
  id: string;
  ownerId: string;
  title: string;
  createdAt: Date;
  ToDoCards: ToDoCard[];
  owner: User2 | null;
};

type CreateToDoListDTO = {
  id: string;
  title: string;
};

type ToDoCard = {
  id: string;
  listId: string;
  order: number;
  title: string;
  description: string;
  createdAt: Date;
  parentList: ToDoList;
};

type CreateToDoCardDTO = {
  id: string;
  listId: string;
  order: number;
  title: string;
  description: string;
};

type UpdateToDoCardDTO = {
  id: string;
  listId?: string;
  order?: number;
  title?: string;
  description?: string;
};

export type {
  ToDoList,
  ToDoCard,
  CreateToDoListDTO,
  CreateToDoCardDTO,
  UpdateToDoCardDTO,
};
