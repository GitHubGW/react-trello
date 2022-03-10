import { useForm } from "react-hook-form";
import { cardModalState, cardState, Todo, todosState, TodosState } from "../atom";
import { SetterOrUpdater, useRecoilState, useSetRecoilState } from "recoil";
import ModalContainer from "../shared/ModalContainer";
import { handleSaveTodoInLocalStorage } from "../todo.utils";

interface FormData {
  text: string;
}

const CardModal = () => {
  const { register, handleSubmit, getValues, setValue } = useForm<FormData>({ mode: "onChange" });
  const setTodos: SetterOrUpdater<TodosState> = useSetRecoilState(todosState);
  const [cardModal, setCardModal] = useRecoilState<boolean>(cardModalState);
  const [card, setCard] = useRecoilState(cardState);

  const handleCloseModal = (): void => {
    return setCardModal(false);
  };

  const onValid = (): void => {
    setTodos((todos) => {
      const { text } = getValues();
      const copiedTodos = [...todos[Object.keys(card)[0]]];
      const editingTodoIndex: number = copiedTodos.findIndex((todo) => todo.id === Object.values(card)[0]);
      copiedTodos.splice(editingTodoIndex, 1);
      const editedTodo: Todo = { id: Object.values(card)[0], text };
      copiedTodos.splice(editingTodoIndex, 0, editedTodo);
      const result = { ...todos, [Object.keys(card)[0]]: copiedTodos };
      handleSaveTodoInLocalStorage(result);
      console.log("result", result);

      return result;
    });
    setCard({});
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
