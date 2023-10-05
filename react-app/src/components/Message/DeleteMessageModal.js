import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as messageActions from "../../store/message";

function DeleteMessageModal({ messageId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const confirmButtonHandler = (e) => {
    e.preventDefault();
    dispatch(messageActions.deleteMessageThunk(messageId));
    closeModal()
  };

  return (
    <div>
      <h1>Confirm Delete</h1>
      <h5>Are you sure you want to remove this message?</h5>
      <button className="" onClick={confirmButtonHandler}>Yes (Delete Message)</button>
      <button className="" onClick={closeModal}>No (Keep Message)</button>
    </div>
  )
};

export default DeleteMessageModal;
