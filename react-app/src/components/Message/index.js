import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from 'socket.io-client';
import * as messageActions from "../../store/message";
import * as sessionActions from "../../store/session";
import * as reactionActions from "../../store/reaction";
import MessageSettingButton from "./MessageSettingButton";
import Picker from 'emoji-picker-react';
import "./Message.css";
import noImage from "./noImage.jpeg";


let socket;

const Chat = ({ channelId }) => {
  const dispatch = useDispatch();
  const [chatInput, setChatInput] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [selectMessage, setSelectMessage] = useState(null);


  useEffect(() => {
    dispatch(messageActions.loadAllMessageThunk());
    dispatch(sessionActions.loadAllUserThunk());
    dispatch(sessionActions.loadUserByIdThunk(user.id));
    dispatch(reactionActions.loadAllReactionThunk());
  }, [dispatch]);

  useEffect(() => {
    socket = io();

    socket.on("chat", () => {
      dispatch(messageActions.loadAllMessageThunk());
    })

    socket.on("emoj", () => {
      dispatch(reactionActions.loadAllReactionThunk());
    })

    // when component unmounts, disconnect
    return (() => {
      socket.disconnect()
    })
  }, [])

  const user = useSelector(state => state.session.user)
  const allUser = useSelector(state => state.session)
  const currentChannelMessages = useSelector(state => Object.values(state.message).filter(x => x.channel_id == channelId));
  const currentChannel = useSelector(state => Object.values(state.channel).filter(x => x.id == channelId));
  const allReactions = useSelector(state => Object.values(state.reaction));

  const updateChatInput = (e) => {
    setChatInput(e.target.value)
  };

  const sendChat = (e) => {
    e.preventDefault()
    socket.emit("chat", { username: user.username, content: chatInput, channelId: channelId });
    setChatInput("")
  }

  const handleUserImage = (message) => {
    let id = message?.user_id
    let imageLink = allUser[id]?.image
    if (imageLink?.length > 3) {
      return (
        <img className="messageImage" src={imageLink} alt="userImage"></img>
      )
    } else {
      return (
        <img className="messageImage" src={noImage} alt="userImage"></img>
      )
    }

  }

  function getCorrectString(dateTimeString) {
    var a = new Date(dateTimeString);
    return a.getFullYear() + '/'
      + ('00' + (a.getMonth() + 1)).substring(('00' + (a.getMonth() + 1)).length - 2) + '/'
      + ('00' + a.getDate()).substring(('00' + a.getDate()).length - 2) + ' '
      + ('00' + a.getHours()).substring(('00' + a.getHours()).length - 2) + ':'
      + ('00' + a.getMinutes()).substring(('00' + a.getMinutes()).length - 2);
  }

  let checkVIP = (message) => {
    let id = message?.user_id
    let ifvip = allUser[id]?.vip
    if (ifvip) {
      return (
        <i className="fas fa-crown" />
      )
    }
    return null;
  }

  const onEmojiClick = (e, message) => {
    socket.emit("emoj", { userId: user.id, content: e.emoji, messageId: message?.id });
    setShowPicker(false);
  };

  const handleOnClickEmoji = (e, message) => {
    setShowPicker(val => !val);
    setSelectMessage(message.id);
  }

  const handleRenderReactions = (message) => {
    let currentMessageReactions = [];
    for (let i = 0; i < allReactions.length; i++) {
      if (allReactions[i].message_id == message.id) {
        currentMessageReactions.push(allReactions[i])
      }
    }
    return (currentMessageReactions.map((eachReaction) => (
      <button class="action_btn" type="button" onClick={e => handleDeleteReaction(e, eachReaction)}>{eachReaction.content}</button>
    )))
  }

  const handleDeleteReaction = (e, reaction) => {
    e.preventDefault();
    if (reaction?.user_id == user?.id) {
      dispatch(reactionActions.deleteReactionThunk(reaction?.id));
    }
  }

  return (user && (
    <div>
      <div className="messageCont">
        {currentChannelMessages.map((message, ind) => (
          <div key={ind}>
            <div className="messageBox">
              <div className="messageContUserimage">
                {handleUserImage(message)}
              </div>
              <div className="messageContUsername">
                {checkVIP(message)}
                {`${message?.username}  ${getCorrectString(message?.createdAt)}`}
                <i className="fas fa-smile-wink emoji-icon tooltip"
                  onClick={e => handleOnClickEmoji(e, message)}>
                  {showPicker && selectMessage == message?.id && <Picker
                    pickerStyle={{ width: '100%' }}
                    onEmojiClick={e => onEmojiClick(e, message)} />}
                  <span className="tooltiptext">Add Reaction</span>
                </i>
                <MessageSettingButton message={message} />
              </div>
              <div className="messageContMessage">
                {`${message?.content}`}
              </div>
            </div>
            <div className="reactionbuttons">
              {handleRenderReactions(message)}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={sendChat} className="messageForm">
        <input
          className="messageFormInput"
          value={chatInput}
          onChange={updateChatInput}
          placeholder={`Message #${currentChannel[0]?.name}`}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  )
  )
};


export default Chat;
