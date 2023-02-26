import { useForm } from "react-hook-form";
import { boardModalState, todosState } from "../atom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { saveTodoToLocalStorage } from "../utils/todo";
import StyledModal from "./common/StyledModal";
import { useCallback } from "react";

interface FormData {
  title: string;
}

const BoardModal = () => {
  const { register, handleSubmit, getValues, setValue } = useForm<FormData>({ mode: "onChange" });
  const [boardModal, setBoardModal] = useRecoilState<boolean>(boardModalState);
  const setTodos = useSetRecoilState(todosState);

  const handleCloseModal = useCallback(() => {
    return setBoardModal(false);
  }, [setBoardModal]);

  const onValid = useCallback(() => {
    const { title } = getValues();
    setTodos((prev) => {
      const result = { [title]: [], ...prev };
      saveTodoToLocalStorage(result);
      return result;
    });
    setValue("title", "");
    handleCloseModal();
  }, [getValues, handleCloseModal, setTodos, setValue]);

  return (
    <StyledModal isOpen={boardModal} onRequestClose={handleCloseModal} ariaHideApp={false} contentLabel="boardModal">
      <button type="button" onClick={handleCloseModal}>
        ✕
      </button>
      <form onSubmit={handleSubmit(onValid)}>
        <div>
          <h1>보드 추가</h1>
          <input {...register("title", { required: "보드를 추가하세요." })} type="text" placeholder="보드를 추가하세요." />
        </div>
      </form>
    </StyledModal>
  );
};

export default BoardModal;
