import { TodosState, TRELLO_TODO } from "./atom";

export const handleSaveTodoInLocalStorage = (result: TodosState): void => {
  return localStorage.setItem(TRELLO_TODO, JSON.stringify(result));
};
