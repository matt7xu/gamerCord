import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import * as channelActions from "../../store/channel";
import * as messageActions from "../../store/message";

function DeleteChannelModal({ channelId, serverId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const allChannels = useSelector(state => Object.values(state.channel).filter(x => x.server_id == serverId));
  const currentChannelMessages = useSelector(state => Object.values(state.message).filter(x => x.channel_id == channelId));

  const confirmButtonHandler = (e) => {
    e.preventDefault();
    for (let i = 0; i < currentChannelMessages.length; i++) {
      dispatch(messageActions.deleteMessageThunk(currentChannelMessages[i].id));
    }

    dispatch(channelActions.deleteChannelThunk(channelId));
    closeModal()
    history.push(`/servers/${serverId}`);
  };

  return (
    <div>
      <h1>Confirm Delete</h1>
      <h5>Are you sure you want to remove this channel?</h5>
      <button className="" onClick={confirmButtonHandler}>Yes (Delete Channel)</button>
      <button className="" onClick={closeModal}>No (Keep Channel)</button>
    </div>
  )
};

export default DeleteChannelModal;
