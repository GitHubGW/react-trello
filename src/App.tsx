import styled from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import DragDropContainer from "./components/DragDropContainer";
import CardModal from "./components/CardModal";
import BoardModal from "./components/BoardModal";
import { SetterOrUpdater, useSetRecoilState } from "recoil";
import { boardModalState } from "./atom";
import BoardTitleModal from "./components/BoardTitleModal";

const Container = styled.div`
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const AddBoardButton = styled.button`
  position: absolute;
  top: 40px;
  right: 50px;
  border: none;
  outline: none;
  background-color: rgba(178, 190, 195, 0.5);
  box-shadow: rgb(0 0 0 / 35%) 0px 5px 35px;
  color: white;
  padding: 10px 15px;
  border-radius: 50%;
  font-size: 25px;
  cursor: pointer;
`;

const App = () => {
  const setBoardModal: SetterOrUpdater<boolean> = useSetRecoilState(boardModalState);

  return (
    <Container>
      <GlobalStyle />
      <AddBoardButton onClick={() => setBoardModal(true)} type="button">
        ✚
      </AddBoardButton>
      <BoardModal />
      <BoardTitleModal />
      <CardModal />
      <DragDropContainer />
    </Container>
  );
};

export default App;
