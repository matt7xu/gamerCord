import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";

function DeleteServerModal({serverId, userId}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const confirmButtonHandler = (e) => {
        e.preventDefault();
        dispatch(sessionActions.userQuitServerThunk(serverId, userId));
        closeModal()
        history.push("/guild-discovery");
    };

    return(
        <div>
            <h1>Quit</h1>
            <h5>Are you sure you want to quit this server?</h5>
            <button className="" onClick={confirmButtonHandler}>Yes (Quit Server)</button>
            <button className="" onClick={closeModal}>No (Keep Server)</button>
        </div>
    )
};

export default DeleteServerModal;
