import { atom } from "recoil";

export interface Todo {
  id: number;
  text: string;
}

export interface TodosState {
  [key: string]: Todo[];
}

export const todosState = atom<TodosState>({
  key: "todosState",
  default: {
    TODO: [],
    DOING: [],
    DONE: [],
  },
});

export const dragStartState = atom<boolean>({
  key: "dragStartState",
  default: false,
});
