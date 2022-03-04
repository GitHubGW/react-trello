import { memo } from "react";
import { Draggable, DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import styled from "styled-components";

interface DraggableCardProps {
  index: number;
  todo: string;
}

const Card = styled.div`
  background-color: ${(props) => props.theme.cardColor};
  border-radius: 5px;
  padding: 12px 10px;
  margin-bottom: 10px;
`;

const DraggableCard = ({ index, todo }: DraggableCardProps) => {
  return (
    <Draggable index={index} draggableId={todo} key={todo}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          {todo}
        </Card>
      )}
    </Draggable>
  );
};

export default memo(DraggableCard);
