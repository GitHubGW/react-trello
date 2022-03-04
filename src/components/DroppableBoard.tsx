import { Droppable, DroppableProvided, DroppableStateSnapshot } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

interface DroppableBoardProps {
  boardId: string;
  todos: any;
}

const Board = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding: 20px;
  border-radius: 5px;
  min-height: 200px;
`;

const BoardId = styled.h1`
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 13px;
`;

const DroppableBoard = ({ boardId, todos }: DroppableBoardProps) => {
  return (
    <Droppable droppableId={boardId}>
      {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
        <Board ref={provided.innerRef} {...provided.droppableProps}>
          <BoardId>{boardId}</BoardId>
          {todos.map((todo: string, index: number) => (
            <DraggableCard key={todo} index={index} todo={todo} />
          ))}
          {provided.placeholder}
        </Board>
      )}
    </Droppable>
  );
};

export default DroppableBoard;
