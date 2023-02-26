import { useForm } from "react-hook-form";
import { cardModalState, cardState, todosState } from "../atom";
import { useRecoilState, useSetRecoilState } from "recoil";
import StyledModal from "./common/StyledModal";
import { saveTodoToLocalStorage } from "../utils/todo";
import { useCallback } from "react";

interface FormData {
  text: string;
}

const CardModal = () => {
  const { register, handleSubmit, getValues, setValue } = useForm<FormData>({ mode: "onChange" });
  const [card, setCard] = useRecoilState(cardState);
  const [cardModal, setCardModal] = useRecoilState<boolean>(cardModalState);
  const setTodos = useSetRecoilState(todosState);

  const handleCloseModal = useCallback(() => {
    return setCardModal(false);
  }, [setCardModal]);

  const onValid = useCallback(() => {
    const { text } = getValues();
    setTodos((prev) => {
      const cardKey = Object.keys(card)[0];
      const cardValue = Object.values(card)[0];
      const { [cardKey]: todosToEdit, ...restTodos } = prev;
      const editedTodo = { id: cardValue, text };
      const updatedTodos = [editedTodo, ...todosToEdit.filter((todo) => todo.id !== editedTodo.id)];
      const result = { ...restTodos, [cardKey]: updatedTodos };
      saveTodoToLocalStorage(result);
      return result;
    });
    setCard({});
    setValue("text", "");
    handleCloseModal();
  }, [card, getValues, handleCloseModal, setCard, setTodos, setValue]);

  return (
    <StyledModal isOpen={cardModal} onRequestClose={handleCloseModal} ariaHideApp={false} contentLabel="cardModal">
      <button type="button" onClick={handleCloseModal}>
        ✕
      </button>
      <form onSubmit={handleSubmit(onValid)}>
        <div>
          <h1>할 일 수정</h1>
          <input {...register("text", { required: "할 일을 수정하세요." })} type="text" placeholder="할 일을 수정하세요." />
        </div>
      </form>
    </StyledModal>
  );
};

export default CardModal;
