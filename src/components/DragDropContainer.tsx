import styled from "styled-components";
import DroppableBoard from "./DroppableBoard";
import { useRecoilState } from "recoil";
import { Todo, TodosState, todosState } from "../atom";
import { DragDropContext, DragStart, DropResult, ResponderProvided } from "react-beautiful-dnd";
import { handleSaveTodoInLocalStorage } from "../todo.utils";
import DroppableGarbage from "./DroppableGarbage";

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  gap: 20px;
`;

const Garbage = styled.div`
  position: fixed;
  bottom: 0px;
  right: 0px;
  width: 150px;
  height: 150px;
`;

const DragDropContainer = () => {
  const [todos, setTodos] = useRecoilState<TodosState>(todosState);

  const onDragStart = (initial: DragStart, provided: ResponderProvided): void => {};

  const onDragEnd = ({ draggableId, destination, source }: DropResult, provided: ResponderProvided): void => {
    console.log("draggableId", draggableId, "destination", destination, "source", source);

    if (destination?.index === undefined) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      setTodos((todos: TodosState) => {
        const copiedSource: Todo[] = [...todos[source.droppableId]];
        const movedTodoObject: Todo = copiedSource[source.index];
        copiedSource.splice(source.index, 1);
        copiedSource.splice(destination.index, 0, movedTodoObject);
        const result: TodosState = { ...todos, [destination.droppableId]: copiedSource };
        handleSaveTodoInLocalStorage(result);
        return result;
      });
    } else if (source.droppableId !== destination.droppableId) {
      if (destination.droppableId === "garbage") {
        setTodos((todos: TodosState) => {
          const copiedSource: Todo[] = [...todos[source.droppableId]];
          copiedSource.splice(source.index, 1);
          const result: TodosState = { ...todos, [source.droppableId]: copiedSource };
          handleSaveTodoInLocalStorage(result);
          return result;
        });
      } else {
        setTodos((todos: TodosState) => {
          const copiedSource: Todo[] = [...todos[source.droppableId]];
          const movedTodoObject: Todo = copiedSource[source.index];
          copiedSource.splice(source.index, 1);
          const copiedDestination: Todo[] = [...todos[destination.droppableId]];
          copiedDestination.splice(destination.index, 0, movedTodoObject);
          const result: TodosState = { ...todos, [source.droppableId]: copiedSource, [destination.droppableId]: copiedDestination };
          handleSaveTodoInLocalStorage(result);
          return result;
        });
      }
    }
  };

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <Boards>
        {Object.keys(todos).map((boardId: string) => (
          <DroppableBoard key={boardId} boardId={boardId} todos={todos[boardId]} />
        ))}
      </Boards>
      <Garbage>
        <DroppableGarbage />
      </Garbage>
    </DragDropContext>
  );
};

export default DragDropContainer;
