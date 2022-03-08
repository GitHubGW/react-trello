import { atom } from "recoil";

export interface Todo {
  id: number;
  text: string;
}

export interface TodosState {
  [key: string]: Todo[];
}

export const TRELLO_TODO = "TRELLO_TODO";
const localStorageTodo: string = localStorage.getItem(TRELLO_TODO) || "{}";
const parsedLocalStorageTodo = JSON.parse(localStorageTodo);

export const boardsState = atom({ key: "boardsState", default: [] });
export const todosState = atom<TodosState>({ key: "todosState", default: parsedLocalStorageTodo });
export const boardTitleState = atom<string>({ key: "boardTitleState", default: "" });
export const boardModalState = atom<boolean>({ key: "boardModalState", default: false });
export const boardTitleModalState = atom<boolean>({ key: "boardTitleModalState", default: false });
export const cardModalState = atom<boolean>({ key: "cardModalState", default: false });
