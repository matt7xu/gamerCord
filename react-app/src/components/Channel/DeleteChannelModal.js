import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import * as channelActions from "../../store/channel";
import * as messageActions from "../../store/message";
import * as reactionActions from "../../store/reaction";

function DeleteChannelModal({ channelId, serverId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const currentChannelMessages = useSelector(state => Object.values(state.message).filter(x => x.channel_id == channelId));
  const allReaction = useSelector(state => Object.values(state.reaction));

  const confirmButtonHandler = (e) => {
    e.preventDefault();
    currentChannelMessages.forEach((message) => {
      let currMess = allReaction.filter((reac) => reac.message_id == message.id);
      if (currMess.length !== 0) {
          currMess.forEach((reaction) => {
              dispatch(reactionActions.deleteReactionThunk(reaction.id));
          })
      }
      dispatch(messageActions.deleteMessageThunk(message.id));
  })

    dispatch(channelActions.deleteChannelThunk(channelId));
    closeModal()
    history.push(`/servers/${serverId}`);
  };

  return (
    <div className="pageContainers">
      <h1>Confirm Delete</h1>
      <h5>Are you sure you want to remove this channel?</h5>
      <button className="" onClick={confirmButtonHandler}>Yes (Delete Channel)</button>
      <button className="" onClick={closeModal}>No (Keep Channel)</button>
    </div>
  )
};

export default DeleteChannelModal;
