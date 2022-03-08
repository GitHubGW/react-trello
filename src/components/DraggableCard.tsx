import { memo } from "react";
import { Draggable, DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import { SetterOrUpdater, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Todo, TodosState, todosState } from "../atom";
import { handleSaveTodoInLocalStorage } from "../todo.utils";

interface DraggableCardProps {
  index: number;
  boardId: string;
  todoId: number;
  todoText: string;
}

const Card = styled.div<{ isDragging: boolean }>`
  background-color: ${(props) => (props.isDragging === true ? "rgba(85, 239, 196, 0.6)" : props.theme.cardColor)};
  color: ${(props) => (props.isDragging === true ? "white" : "black")};
  border-radius: 5px;
  padding: 13px 12px;
  margin-bottom: 10px;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardText = styled.span<{ isDragging: boolean }>`
  font-size: 15px;
  color: ${(props) => (props.isDragging === true ? "white" : "darkgray")};
`;

const DeleteButton = styled.button<{ isDragging: boolean }>`
  border: none;
  outline: none;
  cursor: pointer;
  background-color: ${(props) => (props.isDragging === true ? "white" : "rgba(178, 190, 195,1.0)")};
  color: ${(props) => (props.isDragging === true ? "rgba(178, 190, 195,1.0)" : "white")};
  padding: 5px 7px;
  border-radius: 3px;
  font-size: 12px;
`;

const DraggableCard = ({ index, boardId, todoId, todoText }: DraggableCardProps) => {
  const setTodos: SetterOrUpdater<TodosState> = useSetRecoilState(todosState);

  const handleEditTodo = (todoId: number): void => {
    setTodos((todos: TodosState) => {
      console.log("todos", todos, boardId, todoId);

      const copiedTodos = [...todos[boardId]];

      console.log("copiedTodos", copiedTodos);

      // copiedTodos

      const result = {};

      return todos;
    });
  };

  const handleDeleteTodo = (todoId: number): void => {
    setTodos((todos: TodosState) => {
      const copiedTodos: Todo[] = [...todos[boardId]];
      const filteredTodos: Todo[] = copiedTodos.filter((todo: Todo) => todo.id !== todoId);
      const result = { ...todos, [boardId]: filteredTodos };
      handleSaveTodoInLocalStorage(result);
      return result;
    });
  };

  return (
    <Draggable index={index} draggableId={String(todoId)} key={todoId}>
      {(provided: DraggableProvided, { isDragging }: DraggableStateSnapshot) => {
        return (
          <Card onClick={() => handleEditTodo(todoId)} isDragging={isDragging} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            <CardText isDragging={isDragging}>{todoText}</CardText>
            <DeleteButton isDragging={isDragging} onClick={() => handleDeleteTodo(todoId)} type="button">
              ✕
            </DeleteButton>
          </Card>
        );
      }}
    </Draggable>
  );
};

export default memo(DraggableCard);
