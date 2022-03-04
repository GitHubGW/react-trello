import { atom } from "recoil";

export interface TodosState {
  [key: string]: string[];
}

export const todosState = atom<TodosState>({
  key: "todosState",
  default: {
    TODO: ["study", "coding", "work"],
    DOING: ["eat", "dance", "ride"],
    DONE: ["play", "do", "drink"],
  },
});
