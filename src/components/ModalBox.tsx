import styled from "styled-components";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { todosState, TodosState } from "../atom";
import { handleSaveTodoInLocalStorage } from "../todo.utils";
import { SetterOrUpdater, useSetRecoilState } from "recoil";

interface FormData {
  title: string;
}

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

const Container = styled(Modal)`
  outline: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 320px;
  height: 200px;
  background-color: #f5f5f5;
  border-radius: 5px;
  box-shadow: rgb(0 0 0 / 35%) 0px 5px 15px;

  button {
    position: absolute;
    top: 15px;
    right: 15px;
    border: none;
    outline: none;
    background-color: rgba(178, 190, 195, 0.5);
    color: white;
    padding: 8px 10px;
    border-radius: 50%;
    font-size: 13px;
    cursor: pointer;
  }
  form {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    div {
      width: 100%;
      text-align: center;
      h1 {
        text-align: center;
        margin-bottom: 50px;
        font-size: 20px;
        font-weight: 400;
      }
      input {
        border: none;
        outline: none;
        padding: 17px 20px;
        padding-left: 13px;
        border-radius: 5px;
        width: calc(100% - 100px);
      }
    }
  }
`;

const ModalBox = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const setTodos: SetterOrUpdater<TodosState> = useSetRecoilState(todosState);
  const { register, handleSubmit, getValues, setValue } = useForm<FormData>({ mode: "onChange" });

  const handleOpenModal = (): void => {
    return setModalIsOpen(true);
  };

  const handleCloseModal = (): void => {
    return setModalIsOpen(false);
  };

  const onValid = (): void => {
    setTodos((todos: TodosState) => {
      const { title } = getValues();
      const result: TodosState = { ...todos, [title]: [] };
      handleSaveTodoInLocalStorage(result);
      return result;
    });
    setValue("title", "");
    handleCloseModal();
  };

  return (
    <div>
      <AddBoardButton onClick={handleOpenModal} type="button">
        ✚
      </AddBoardButton>
      <Container isOpen={modalIsOpen} onRequestClose={handleCloseModal} ariaHideApp={false} contentLabel="Example Modal">
        <button onClick={handleCloseModal}>✕</button>
        <form onSubmit={handleSubmit(onValid)}>
          <div>
            <h1>보드 추가</h1>
            <input {...register("title", { required: "보드를 추가하세요." })} type="text" placeholder="보드를 추가하세요." />
          </div>
        </form>
      </Container>
    </div>
  );
};

export default ModalBox;
