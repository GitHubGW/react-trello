import { Droppable, DroppableProvided, DroppableStateSnapshot } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { SetterOrUpdater, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { boardTitleModalState, boardTitleState, Todo, TodosState, todosState } from "../atom";
import { handleSaveTodoInLocalStorage } from "../todo.utils";
import DraggableCard from "./DraggableCard";

interface DroppableBoardProps {
  boardId: string;
  todos: Todo[];
}

interface FormData {
  text: string;
}

const Container = styled.div`
  position: relative;
`;

const DeleteBoardButton = styled.button`
  position: absolute;
  top: 12px;
  right: 10px;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: lightgray;
  color: white;
  padding: 3px 5px;
  border-radius: 50px;
  font-size: 12px;
`;

const Board = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding: 25px 10px;
  border-radius: 5px;
  min-height: 200px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  text-align: center;
`;

const BoardId = styled.h1`
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 13px;
  color: rgba(45, 52, 54, 1);
  cursor: pointer;
`;

const BoardForm = styled.form``;

const BoardInput = styled.input`
  border: none;
  outline: none;
  padding: 16px 30px;
  padding-left: 10px;
  border-radius: 5px;
  width: calc(100% - 60px);
`;

const BoardContent = styled.div<{ isDraggingOver: boolean; draggingFromThisWith: boolean }>`
  height: calc(100% - 30px);
  border-radius: 5px;
  transition: all 0.5s;
  padding: 10px;
  margin-top: 8px;
  box-sizing: border-box;
  background-color: ${(props) => (props.isDraggingOver === true ? props.theme.boardBgColor : props.draggingFromThisWith === true ? "rgba(231, 76, 60,0.8)" : "transparent")};
`;

const DroppableBoard = ({ boardId, todos }: DroppableBoardProps) => {
  const { register, handleSubmit, setValue, getValues } = useForm<FormData>({ mode: "onChange", defaultValues: { text: "" } });
  const setTodos: SetterOrUpdater<TodosState> = useSetRecoilState(todosState);
  const setBoardTitleModal: SetterOrUpdater<boolean> = useSetRecoilState(boardTitleModalState);
  const setBoardTitle: SetterOrUpdater<string> = useSetRecoilState(boardTitleState);

  const handleEditBoard = (boardId: string): void => {
    setBoardTitle(boardId);
    setBoardTitleModal(true);
  };

  const handleDeleteBoard = (boardId: string): void => {
    setTodos((todos: TodosState) => {
      const copiedTodos: TodosState = { ...todos };
      delete copiedTodos[boardId];
      const result: TodosState = copiedTodos;
      handleSaveTodoInLocalStorage(result);
      return result;
    });
  };

  const onValid = (): void => {
    setTodos((todos: TodosState) => {
      const { text } = getValues();
      const createdTodo: Todo = { id: Date.now(), text };
      const result: TodosState = { ...todos, [boardId]: [createdTodo, ...todos[boardId]] };
      handleSaveTodoInLocalStorage(result);
      return result;
    });
    setValue("text", "");
  };

  return (
    <Container>
      <DeleteBoardButton onClick={() => handleDeleteBoard(boardId)}>✕</DeleteBoardButton>
      <Droppable droppableId={boardId}>
        {(provided: DroppableProvided, { isDraggingOver, draggingOverWith, draggingFromThisWith, isUsingPlaceholder }: DroppableStateSnapshot) => (
          <Board ref={provided.innerRef} {...provided.droppableProps}>
            <BoardId onClick={() => handleEditBoard(boardId)}>{boardId}</BoardId>
            <BoardForm onSubmit={handleSubmit(onValid)}>
              <BoardInput {...register("text", { required: "할 일을 입력하세요." })} type="text" placeholder={`할 일을 추가하세요.`} />
            </BoardForm>
            <BoardContent isDraggingOver={isDraggingOver} draggingFromThisWith={Boolean(draggingFromThisWith)}>
              {todos.map((todo: Todo, index: number) => (
                <DraggableCard key={todo.id} index={index} boardId={boardId} todoId={todo.id} todoText={todo.text} />
              ))}
              {provided.placeholder}
            </BoardContent>
          </Board>
        )}
      </Droppable>
    </Container>
  );
};

export default DroppableBoard;
