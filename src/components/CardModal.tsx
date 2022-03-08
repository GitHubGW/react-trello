import { useForm } from "react-hook-form";
import { cardModalState, todosState, TodosState } from "../atom";
import { SetterOrUpdater, useRecoilState, useSetRecoilState } from "recoil";
import ModalContainer from "../shared/ModalContainer";

interface FormData {
  text: string;
}

const CardModal = () => {
  const [cardModal, setCardModal] = useRecoilState<boolean>(cardModalState);
  const setTodos: SetterOrUpdater<TodosState> = useSetRecoilState(todosState);
  const { register, handleSubmit, getValues, setValue } = useForm<FormData>({ mode: "onChange" });

  const handleCloseModal = (): void => {
    return setCardModal(false);
  };

  const onValid = (): void => {
    setTodos((todos: TodosState) => {
      const { text } = getValues();
      // const result: TodosState = { ...todos, [title]: [] };
      // handleSaveTodoInLocalStorage(result);
      // return result;
      return todos;
    });
    setValue("text", "");
    handleCloseModal();
  };

  return (
    <ModalContainer isOpen={cardModal} onRequestClose={handleCloseModal} ariaHideApp={false} contentLabel="cardModal">
      <button onClick={handleCloseModal}>✕</button>
      <form onSubmit={handleSubmit(onValid)}>
        <div>
          <h1>할 일 수정</h1>
          <input {...register("text", { required: "할 일을 수정하세요." })} type="text" placeholder="할 일을 수정하세요." />
        </div>
      </form>
    </ModalContainer>
  );
};

export default CardModal;
