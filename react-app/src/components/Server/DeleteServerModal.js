import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import * as serverActions from "../../store/server";
import * as sessionActions from "../../store/session";

function DeleteServerModal({serverId, userId}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const confirmButtonHandler = (e) => {
        e.preventDefault();
        dispatch(sessionActions.userQuitServerThunk(serverId, userId));
        dispatch(serverActions.deleteServerThunk(serverId));

        closeModal()
        history.push("/guild-discovery");
    };

    return(
        <div>
            <h1>Confirm Delete</h1>
            <h5>Are you sure you want to remove this server?</h5>
            <button className="" onClick={confirmButtonHandler}>Yes (Delete Server)</button>
            <button className="" onClick={closeModal}>No (Keep Server)</button>
        </div>
    )
};

export default DeleteServerModal;
