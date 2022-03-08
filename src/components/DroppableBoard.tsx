import { Droppable, DroppableProvided, DroppableStateSnapshot } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Todo, TodosState, todosState } from "../atom";
import DraggableCard from "./DraggableCard";

interface DroppableBoardProps {
  boardId: string;
  todos: Todo[];
}

interface FormData {
  text: string;
}

const Board = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding: 25px 10px;
  border-radius: 5px;
  min-height: 200px;
`;

const BoardId = styled.h1`
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 13px;
`;

const BoardContent = styled.div<{ isDraggingOver: boolean; draggingFromThisWith: boolean }>`
  height: calc(100% - 30px);
  border-radius: 5px;
  transition: all 0.5s;
  padding: 10px;
  box-sizing: border-box;
  background-color: ${(props) =>
    props.isDraggingOver === true ? "rgba(178, 190, 195,0.5)" : props.draggingFromThisWith === true ? "rgba(231, 76, 60,0.8)" : props.theme.boardColor};
`;

const Form = styled.form``;

const Input = styled.input``;

const DroppableBoard = ({ boardId, todos }: DroppableBoardProps) => {
  const { register, handleSubmit, setValue, getValues } = useForm<FormData>({ mode: "onChange", defaultValues: { text: "" } });
  const setTodos = useSetRecoilState(todosState);

  const onValid = (): void => {
    setTodos((todos: TodosState) => {
      const { text } = getValues();
      const createdTodo: Todo = { id: Date.now(), text };
      const result = { ...todos, [boardId]: [createdTodo, ...todos[boardId]] };
      return result;
    });
    setValue("text", "");
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onValid)}>
        <Input {...register("text", { required: "할 일을 입력하세요." })} type="text" placeholder={`할 일을 추가하세요.`} />
      </Form>
      <Droppable droppableId={boardId}>
        {(provided: DroppableProvided, { isDraggingOver, draggingOverWith, draggingFromThisWith, isUsingPlaceholder }: DroppableStateSnapshot) => (
          <Board ref={provided.innerRef} {...provided.droppableProps}>
            <BoardId>{boardId}</BoardId>
            <BoardContent isDraggingOver={isDraggingOver} draggingFromThisWith={Boolean(draggingFromThisWith)}>
              {todos.map((todo: Todo, index: number) => (
                <DraggableCard key={todo.id} index={index} boardId={boardId} todoId={todo.id} todoText={todo.text} />
              ))}
              {provided.placeholder}
            </BoardContent>
          </Board>
        )}
      </Droppable>
    </div>
  );
};

export default DroppableBoard;
