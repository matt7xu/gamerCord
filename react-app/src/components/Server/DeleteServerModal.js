import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import * as serverActions from "../../store/server";
import * as sessionActions from "../../store/session";
import * as channelActions from "../../store/channel";
import * as messageActions from "../../store/message";
import * as reactionActions from "../../store/reaction";

function DeleteServerModal({ serverId, userId }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const currChannels = useSelector(state => Object.values(state.channel).filter(x => x.server_id == serverId));
    const allMessage = useSelector(state => Object.values(state.message));
    const allReaction = useSelector(state => Object.values(state.reaction));

    const confirmButtonHandler = (e) => {
        e.preventDefault();

        currChannels.forEach((each) => {
            let currMessage = allMessage.filter((mess) => mess.channel_id == each.id);
            if (currMessage.length !== 0) {
                currMessage.forEach((message) => {
                    let currMess = allReaction.filter((reac) => reac.message_id == message.id);
                    if (currMess.length !== 0) {
                        currMess.forEach((reaction) => {
                            dispatch(reactionActions.deleteReactionThunk(reaction.id));
                        })
                    }
                    dispatch(messageActions.deleteMessageThunk(message.id));
                })
            }
            dispatch(channelActions.deleteChannelThunk(each.id));
        })

        dispatch(sessionActions.userQuitServerThunk(serverId, userId));
        dispatch(serverActions.deleteServerThunk(serverId));


        closeModal()
        history.push("/");
    };

    return (
        <div>
            <h1>Confirm Delete</h1>
            <h5>Are you sure you want to remove this server?</h5>
            <button className="" onClick={confirmButtonHandler}>Yes (Delete Server)</button>
            <button className="" onClick={closeModal}>No (Keep Server)</button>
        </div>
    )
};

export default DeleteServerModal;
