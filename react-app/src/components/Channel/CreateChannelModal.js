import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as channelActions from "../../store/channel";

function CreateChannelModal({ serverId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [name, setName] = useState("");
  const [private_server, setPrivate_server] = useState('False');

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("name", name);
    formData.append("private", private_server);

    dispatch(channelActions.addChannelThunk(formData, serverId));

    closeModal()
  }

  function onChangeValue(event) {
    setPrivate_server(event.target.value);
  }

  return (
    <div className="pageContainers">
      <div>
        <h1>Create Channel</h1>
        <p>in Text Channels</p>
      </div>
      <form onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div>
          <label>
            Channel Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        {/* <div onChange={onChangeValue}>
          Private:
          <input type="radio" value="True" name="private_server" checked={private_server === "True"} /> True
          <input type="radio" value="False" name="private_server" checked={private_server === "False"} /> False(default)
        </div> */}
        <p>Only selected members and roles will be able to view this channel.</p>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateChannelModal;
