import styled from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import DragDropContainer from "./components/DragDropContainer";

const Container = styled.div`
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const App = () => {
  return (
    <Container>
      <GlobalStyle />
      <DragDropContainer />
    </Container>
  );
};

export default App;
