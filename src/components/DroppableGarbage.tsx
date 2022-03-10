import { Droppable, DroppableProvided, DroppableStateSnapshot } from "react-beautiful-dnd";
import styled from "styled-components";
import { FcEmptyTrash, FcFullTrash } from "react-icons/fc";

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
  background-color: ${(props) => (props.isDraggingOver === true ? "rgba(223, 230, 233,0.3)" : props.draggingFromThisWith === true ? "rgba(225, 112, 85,0.5)" : "transparent")};
`;

const DroppableGarbage = () => {
  return (
    <Container>
      <Droppable droppableId="garbage">
        {(provided: DroppableProvided, { isDraggingOver, draggingOverWith, draggingFromThisWith, isUsingPlaceholder }: DroppableStateSnapshot) => (
          <Content isDraggingOver={isDraggingOver} draggingFromThisWith={Boolean(draggingFromThisWith)} ref={provided.innerRef} {...provided.droppableProps}>
            {isDraggingOver === false ? <FcEmptyTrash /> : <FcFullTrash />}
            {provided.placeholder}
          </Content>
        )}
      </Droppable>
    </Container>
  );
};

export default DroppableGarbage;
