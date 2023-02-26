import { memo, useCallback } from "react";
import { Draggable, DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { cardModalState, cardState, todosState } from "../atom";
import { saveTodoToLocalStorage } from "../utils/todo";

interface DraggableCardProps {
  index: number;
  boardId: string;
  todoId: number;
  todoText: string;
}

const DraggableCard = ({ index, boardId, todoId, todoText }: DraggableCardProps) => {
  const setTodos = useSetRecoilState(todosState);
  const setCardModal = useSetRecoilState(cardModalState);
  const setCard = useSetRecoilState(cardState);

  const handleEditTodo = useCallback(() => {
    setCard({ [boardId]: todoId });
    setCardModal(true);
  }, [boardId, todoId, setCard, setCardModal]);

  const handleDeleteTodo = useCallback(() => {
    setTodos((prev) => {
      const copiedTodos = [...prev[boardId]];
      const filteredTodos = copiedTodos.filter((todo) => todo.id !== todoId);
      const result = { ...prev, [boardId]: filteredTodos };
      saveTodoToLocalStorage(result);
      return result;
    });
  }, [boardId, todoId, setTodos]);

  return (
    <Draggable index={index} draggableId={String(todoId)} key={todoId}>
      {(provided: DraggableProvided, { isDragging }: DraggableStateSnapshot) => (
        <CardContainer ref={provided.innerRef} isDragging={isDragging} {...provided.draggableProps} {...provided.dragHandleProps}>
          <CardText isDragging={isDragging}>{todoText}</CardText>
          <CardEditButton type="button" isDragging={isDragging} onClick={handleEditTodo}>
            ✎
          </CardEditButton>
          <CardDeleteButton type="button" isDragging={isDragging} onClick={handleDeleteTodo}>
            ✕
          </CardDeleteButton>
        </CardContainer>
      )}
    </Draggable>
  );
};

export default memo(DraggableCard);

const CardContainer = styled.div<{ isDragging: boolean }>`
  background-color: ${({ theme, isDragging }) => (isDragging ? "rgba(85, 239, 196, 0.6)" : theme.cardColor)};
  color: ${({ isDragging }) => (isDragging ? "white" : "black")};
  border: 3px solid ${({ theme, isDragging }) => (isDragging ? "rgba(85, 239, 196, 1)" : theme.cardColor)};
  border-radius: 5px;
  padding: 13px 12px;
  margin-bottom: 10px;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardText = styled.span<{ isDragging: boolean }>`
  font-size: 18px;
  color: ${({ isDragging }) => (isDragging ? "white" : "darkgray")};
  margin-right: auto;
`;

const CardEditButton = styled.button<{ isDragging: boolean }>`
  border: none;
  outline: none;
  cursor: pointer;
  background-color: ${({ isDragging }) => (isDragging ? "white" : "rgba(178, 190, 195,1.0)")};
  color: ${({ isDragging }) => (isDragging ? "rgba(178, 190, 195,1.0)" : "white")};
  padding: 4.5px 7px;
  border-radius: 3px;
  font-size: 12px;
  margin-right: 5px;
`;

const CardDeleteButton = styled.button<{ isDragging: boolean }>`
  border: none;
  outline: none;
  cursor: pointer;
  background-color: ${({ isDragging }) => (isDragging ? "white" : "rgba(178, 190, 195,1.0)")};
  color: ${({ isDragging }) => (isDragging ? "rgba(178, 190, 195,1.0)" : "white")};
  padding: 5px 7px;
  border-radius: 3px;
  font-size: 12px;
`;
