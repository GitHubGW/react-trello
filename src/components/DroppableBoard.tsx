import { useRef } from "react";
import { Droppable, DroppableProvided, DroppableStateSnapshot } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

interface DroppableBoardProps {
  boardId: string;
  todos: any;
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

const DroppableBoard = ({ boardId, todos }: DroppableBoardProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    console.log("inputRef", inputRef);
    inputRef.current?.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleClick}>Click</button>
      <Droppable droppableId={boardId}>
        {(provided: DroppableProvided, { isDraggingOver, draggingOverWith, draggingFromThisWith, isUsingPlaceholder }: DroppableStateSnapshot) => (
          <Board ref={provided.innerRef} {...provided.droppableProps}>
            <BoardId>{boardId}</BoardId>
            <BoardContent isDraggingOver={isDraggingOver} draggingFromThisWith={Boolean(draggingFromThisWith)}>
              {todos.map((todo: string, index: number) => (
                <DraggableCard key={todo} index={index} todo={todo} />
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
