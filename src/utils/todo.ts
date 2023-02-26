import { TRELLO_TODO } from "../atom";
import { TodosState } from "../types/common";

export const saveTodoToLocalStorage = (todosState: TodosState) => {
  localStorage.setItem(TRELLO_TODO, JSON.stringify(todosState));
};
