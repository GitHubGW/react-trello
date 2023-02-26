import { Droppable, DroppableProvided, DroppableStateSnapshot } from "react-beautiful-dnd";
import styled from "styled-components";
import { FcEmptyTrash, FcFullTrash } from "react-icons/fc";

const DroppableGarbage = () => {
  return (
    <Container>
      <Droppable droppableId="garbage">
        {(provided: DroppableProvided, { isDraggingOver, draggingFromThisWith }: DroppableStateSnapshot) => (
          <Content ref={provided.innerRef} isDraggingOver={isDraggingOver} draggingFromThisWith={!!draggingFromThisWith} {...provided.droppableProps}>
            {isDraggingOver ? <FcFullTrash /> : <FcEmptyTrash />}
            {provided.placeholder}
          </Content>
        )}
      </Droppable>
    </Container>
  );
};

export default DroppableGarbage;

const Container = styled.div`
  width: 150px;
  height: 150px;
`;

const Content = styled.div<{ isDraggingOver: boolean; draggingFromThisWith: boolean }>`
  font-size: 90px;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  padding: 10px;
  background-color: ${({ isDraggingOver, draggingFromThisWith }) => (isDraggingOver ? "rgba(223, 230, 233,0.3)" : draggingFromThisWith ? "rgba(225, 112, 85,0.5)" : "transparent")};
`;
