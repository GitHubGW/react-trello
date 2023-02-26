export interface Todo {
  id: number;
  text: string;
}

export interface TodosState {
  [key: string]: Todo[];
}
