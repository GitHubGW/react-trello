import { memo } from "react";
import { Draggable, DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import styled from "styled-components";

interface DraggableCardProps {
  index: number;
  todo: string;
}

const Card = styled.div<{ isDragging: boolean }>`
  background-color: ${(props) => (props.isDragging === true ? "rgba(116, 185, 255,0.8)" : props.theme.cardColor)};
  color: ${(props) => (props.isDragging === true ? "white" : "black")};
  border-radius: 5px;
  padding: 15px 12px;
  margin-bottom: 10px;
  font-size: 20px;
`;

const DraggableCard = ({ index, todo }: DraggableCardProps) => {
  return (
    <Draggable index={index} draggableId={todo} key={todo}>
      {(provided: DraggableProvided, { isDragging }: DraggableStateSnapshot) => {
        return (
          <Card isDragging={isDragging} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            {todo}
          </Card>
        );
      }}
    </Draggable>
  );
};

export default memo(DraggableCard);
