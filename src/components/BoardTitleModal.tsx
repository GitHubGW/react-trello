import { useForm } from "react-hook-form";
import { boardTitleModalState, boardTitleState, Todo, todosState, TodosState } from "../atom";
import { SetterOrUpdater, useRecoilState, useSetRecoilState } from "recoil";
import { handleSaveTodoInLocalStorage } from "../todo.utils";
import ModalContainer from "../shared/ModalContainer";

interface FormData {
  title: string;
}

const BoardTitleModal = () => {
  const [boardTitleModal, setBoardTitleModal] = useRecoilState<boolean>(boardTitleModalState);
  const { register, handleSubmit, getValues, setValue } = useForm<FormData>({ mode: "onChange" });
  const setTodos: SetterOrUpdater<TodosState> = useSetRecoilState(todosState);
  const [boardTitle, setBoardTitle] = useRecoilState<string>(boardTitleState);

  const handleCloseModal = (): void => {
    return setBoardTitleModal(false);
  };

  const onValid = (): void => {
    setTodos((todos: TodosState) => {
      const { title } = getValues();
      const copiedTodos: TodosState = { ...todos };
      const editingBoard: Todo[] = copiedTodos[boardTitle];
      delete copiedTodos[boardTitle];
      const result: TodosState = { [title]: editingBoard, ...copiedTodos };
      handleSaveTodoInLocalStorage(result);
      return result;
    });
    setBoardTitle("");
    setValue("title", "");
    handleCloseModal();
  };

  return (
    <ModalContainer isOpen={boardTitleModal} onRequestClose={handleCloseModal} ariaHideApp={false} contentLabel="boardTitleModal">
      <button onClick={handleCloseModal}>✕</button>
      <form onSubmit={handleSubmit(onValid)}>
        <div>
          <h1>보드 수정</h1>
          <input {...register("title", { required: "보드를 수정하세요." })} type="text" placeholder="보드를 수정하세요." />
        </div>
      </form>
    </ModalContainer>
  );
};

export default BoardTitleModal;
