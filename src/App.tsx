import { DragDropContext, DragStart, DropResult, ResponderProvided } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { TodosState, todosState } from "./atom";
import DroppableBoard from "./components/DroppableBoard";
import GlobalStyle from "./styles/GlobalStyle";

const Container = styled.div`
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  gap: 20px;
`;

const App = () => {
  const [todos, setTodos] = useRecoilState(todosState);

  const onDragStart = (initial: DragStart, provided: ResponderProvided) => {};

  const onDragEnd = ({ draggableId, destination, source }: DropResult, provided: ResponderProvided) => {
    console.log("draggableId", draggableId, "destination", destination, "source", source);
    if (destination?.index === undefined) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      setTodos((todos: TodosState) => {
        const copiedTodos: string[] = [...todos[source.droppableId]];
        copiedTodos.splice(source.index, 1);
        copiedTodos.splice(destination.index, 0, draggableId);
        const result: TodosState = { ...todos, [destination.droppableId]: copiedTodos };
        return result;
      });
    }
  };

  return (
    <Container>
      <GlobalStyle />
      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <Boards>
          {Object.keys(todos).map((boardId: string) => (
            <DroppableBoard key={boardId} boardId={boardId} todos={todos[boardId]} />
          ))}
        </Boards>
      </DragDropContext>
    </Container>
  );
};

export default App;
