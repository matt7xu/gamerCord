import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import * as channelActions from "../../store/channel";

function DeleteChannelModal({ channelId, serverId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const allChannels = useSelector(state => Object.values(state.channel).filter(x => x.server_id == serverId));

  const confirmButtonHandler = (e) => {
    e.preventDefault();
    dispatch(channelActions.deleteChannelThunk(channelId));

    closeModal()
    if (allChannels.length > 0) {
      history.push(`/channels/${allChannels[0].id}`);
    } else {
      history.push(`/guild-discovery`);
    }

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
