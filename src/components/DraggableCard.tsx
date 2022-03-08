import { memo } from "react";
import { Draggable, DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import { SetterOrUpdater, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Todo, TodosState, todosState } from "../atom";

interface DraggableCardProps {
  index: number;
  boardId: string;
  todoId: number;
  todoText: string;
}

const Card = styled.div<{ isDragging: boolean }>`
  background-color: ${(props) => (props.isDragging === true ? "rgba(116, 185, 255,0.8)" : props.theme.cardColor)};
  color: ${(props) => (props.isDragging === true ? "white" : "black")};
  border-radius: 5px;
  padding: 15px 12px;
  margin-bottom: 10px;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardText = styled.span``;

const DeleteButton = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  background-color: #34495e;
  color: white;
  padding: 8px 10px;
  border-radius: 3px;
  font-size: 14px;
`;

const DraggableCard = ({ index, boardId, todoId, todoText }: DraggableCardProps) => {
  const setTodos: SetterOrUpdater<TodosState> = useSetRecoilState(todosState);

  const handleDeleteTodo = (todoId: number): void => {
    setTodos((todos: TodosState) => {
      const copiedTodos: Todo[] = [...todos[boardId]];
      const filteredTodos: Todo[] = copiedTodos.filter((todo: Todo) => todo.id !== todoId);
      const result = { ...todos, [boardId]: filteredTodos };
      return result;
    });
  };

  return (
    <Draggable index={index} draggableId={String(todoId)} key={todoId}>
      {(provided: DraggableProvided, { isDragging }: DraggableStateSnapshot) => {
        return (
          <Card isDragging={isDragging} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            <CardText>{todoText}</CardText>
            <DeleteButton onClick={() => handleDeleteTodo(todoId)} type="button">
              삭제
            </DeleteButton>
          </Card>
        );
      }}
    </Draggable>
  );
};

export default memo(DraggableCard);
