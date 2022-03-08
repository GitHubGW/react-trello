import { useForm } from "react-hook-form";
import { boardModalState, todosState, TodosState } from "../atom";
import { SetterOrUpdater, useRecoilState, useSetRecoilState } from "recoil";
import { handleSaveTodoInLocalStorage } from "../todo.utils";
import ModalContainer from "../shared/ModalContainer";

interface FormData {
  title: string;
}

const BoardModal = () => {
  const [boardModal, setBoardModal] = useRecoilState<boolean>(boardModalState);
  const setTodos: SetterOrUpdater<TodosState> = useSetRecoilState(todosState);
  const { register, handleSubmit, getValues, setValue } = useForm<FormData>({ mode: "onChange" });

  const handleCloseModal = (): void => {
    return setBoardModal(false);
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
    <ModalContainer isOpen={boardModal} onRequestClose={handleCloseModal} ariaHideApp={false} contentLabel="boardModal">
      <button onClick={handleCloseModal}>✕</button>
      <form onSubmit={handleSubmit(onValid)}>
        <div>
          <h1>보드 추가</h1>
          <input {...register("title", { required: "보드를 추가하세요." })} type="text" placeholder="보드를 추가하세요." />
        </div>
      </form>
    </ModalContainer>
  );
};

export default BoardModal;
