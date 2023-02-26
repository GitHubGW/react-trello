import { useCallback } from "react";
import { Droppable, DroppableProvided, DroppableStateSnapshot } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { boardTitleModalState, boardTitleState, todosState } from "../atom";
import { Todo } from "../types/common";
import { saveTodoToLocalStorage } from "../utils/todo";
import DraggableCard from "./DraggableCard";

interface DroppableBoardProps {
  boardId: string;
  todos: Todo[];
}

interface FormData {
  text: string;
}

const DroppableBoard = ({ boardId, todos }: DroppableBoardProps) => {
  const { register, handleSubmit, setValue, getValues } = useForm<FormData>({ mode: "onChange", defaultValues: { text: "" } });
  const setTodos = useSetRecoilState(todosState);
  const setBoardTitleModal = useSetRecoilState(boardTitleModalState);
  const setBoardTitle = useSetRecoilState(boardTitleState);

  const handleEditBoard = useCallback(() => {
    setBoardTitleModal(true);
    setBoardTitle(boardId);
  }, [boardId, setBoardTitleModal, setBoardTitle]);

  const handleDeleteBoard = useCallback(() => {
    setTodos((prev) => {
      const copiedTodos = { ...prev };
      delete copiedTodos[boardId];
      const result = copiedTodos;
      saveTodoToLocalStorage(result);
      return result;
    });
  }, [boardId, setTodos]);

  const onValid = useCallback(() => {
    setTodos((prev) => {
      const { text } = getValues();
      const createdTodo = { id: Date.now(), text };
      const result = { ...prev, [boardId]: [createdTodo, ...prev[boardId]] };
      saveTodoToLocalStorage(result);
      return result;
    });
    setValue("text", "");
  }, [boardId, getValues, setTodos, setValue]);

  return (
    <Container>
      <DeleteBoardButton onClick={handleDeleteBoard}>✕</DeleteBoardButton>
      <Droppable droppableId={boardId}>
        {(provided: DroppableProvided, { isDraggingOver, draggingFromThisWith }: DroppableStateSnapshot) => (
          <Board ref={provided.innerRef} {...provided.droppableProps}>
            <BoardId onClick={handleEditBoard}>{boardId}</BoardId>
            <BoardForm onSubmit={handleSubmit(onValid)}>
              <BoardInput {...register("text", { required: "할 일을 입력하세요." })} type="text" placeholder={`할 일을 추가하세요.`} />
            </BoardForm>
            <BoardContent isDraggingOver={isDraggingOver} draggingFromThisWith={!!draggingFromThisWith}>
              {todos.map((todo, index) => (
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
  background-color: ${({ theme }) => theme.boardColor};
  padding: 25px 10px;
  border-radius: 5px;
  min-height: 200px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  text-align: center;
`;

const BoardId = styled.h1`
  text-align: center;
  font-weight: bold;
  font-size: 22px;
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
  font-size: 15px;
`;

const BoardContent = styled.div<{ isDraggingOver: boolean; draggingFromThisWith: boolean }>`
  height: calc(100% - 30px);
  border-radius: 5px;
  transition: all 0.5s;
  padding: 10px;
  margin-top: 8px;
  box-sizing: border-box;
  background-color: ${({ theme, isDraggingOver, draggingFromThisWith }) => (isDraggingOver ? theme.boardBgColor : draggingFromThisWith ? "rgba(225, 112, 85,0.5)" : "transparent")};
`;
