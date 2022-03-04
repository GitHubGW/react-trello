import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  DragStart,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { todosState } from "./atom";
import DraggableCard from "./components/DraggableCard";
import GlobalStyle from "./styles/GlobalStyle";

const Container = styled.div`
  border: 3px solid yellow;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  width: 100%;
`;

const Board = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding: 20px;
  border-radius: 5px;
  min-height: 200px;
`;

const App = () => {
  console.log("App");

  const [todos, setTodos] = useRecoilState(todosState);

  const onDragStart = (initial: DragStart, provided: ResponderProvided) => {};

  const onDragEnd = ({ draggableId, destination, source }: DropResult, provided: ResponderProvided) => {
    console.log("draggableId", draggableId, "destination?.index", destination?.index, "source.index", source.index);
    if (destination?.index === undefined) return;

    setTodos((todos) => {
      const copiedTodos = [...todos];
      copiedTodos.splice(source.index, 1);
      copiedTodos.splice(destination.index, 0, draggableId);
      return copiedTodos;
    });
  };

  return (
    <Container>
      <GlobalStyle />
      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <Boards>
          <Droppable droppableId="one">
            {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
              <Board ref={provided.innerRef} {...provided.droppableProps}>
                {todos.map((todo: string, index: number) => (
                  <DraggableCard key={todo} index={index} todo={todo} />
                ))}
                {provided.placeholder}
              </Board>
            )}
          </Droppable>
        </Boards>
      </DragDropContext>
    </Container>
  );
};

export default App;
