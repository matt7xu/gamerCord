import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from 'socket.io-client';
import * as messageActions from "../../store/message";
import * as sessionActions from "../../store/session";
import MessageSettingButton from "./MessageSettingButton";
import "./Message.css";


let socket;

const Chat = ({ channelId }) => {
  const dispatch = useDispatch();
  const [chatInput, setChatInput] = useState("");
  // const [messages, setMessages] = useState([]);
  const user = useSelector(state => state.session.user)
  const allUser = useSelector(state => state.session)
  const currentChannelMessages = useSelector(state => Object.values(state.message).filter(x => x.channel_id == channelId));
  const currentChannel = useSelector(state => Object.values(state.channel).filter(x => x.id == channelId));

  useEffect(() => {
    dispatch(messageActions.loadAllMessageThunk());
    dispatch(sessionActions.loadAllUserThunk());
    dispatch(sessionActions.loadUserByIdThunk(user.id));
  }, [dispatch]);

  useEffect(() => {
    // open socket connection
    // create websocket
    socket = io();

    socket.on("chat", (chat) => {
      dispatch(messageActions.loadAllMessageThunk());
      // setMessages(messages => [...messages, chat])
    })
    // when component unmounts, disconnect
    return (() => {
      socket.disconnect()
    })
  }, [])

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
    return (
      <img className="messageImage" src={imageLink} alt="userImage"></img>
    )
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

  return (user && (
    <div>
      <div className="messageCont">
        {currentChannelMessages.map((message, ind) => (
          <div key={ind} className="messageBox">
            <div className="messageContUserimage">
              {handleUserImage(message)}
            </div>
            <div className="messageContUsername">
              {checkVIP(message) }
              {`${message?.username}  ${getCorrectString(message?.createdAt)}`} <MessageSettingButton message={message} />
            </div>
            <div className="messageContMessage">
              {`${message?.content}`}
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
