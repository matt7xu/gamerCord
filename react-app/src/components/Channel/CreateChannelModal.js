import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as channelActions from "../../store/channel";

function CreateChannelModal({ serverId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [name, setName] = useState("");
  const [private_server, setPrivate_server] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("name", name);
    formData.append("private", private_server);

    dispatch(channelActions.addChannelThunk(formData, serverId));

    closeModal()
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
            CHANNEL NAME
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Private Channel
            <input
              type="radio"
              value="False"
              onChange={(e) => setPrivate_server(false)}

            />
            False(default)
            <input
              type="radio"
              value="True"
              onChange={(e) => setPrivate_server(true)}
            />
            True
          </label>
        </div>
        <p>Only selected members and roles will be able to view this channel.</p>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateChannelModal;
