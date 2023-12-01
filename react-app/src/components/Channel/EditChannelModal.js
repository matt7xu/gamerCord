import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as channelActions from "../../store/channel";

function EditChannelModal({ channelId, channel_info }) {
  const dispatch = useDispatch();
  const [name, setName] = useState(channel_info.name);
  const [private_server, setPrivate_server] = useState(channel_info.private);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedChannel = new FormData();
    updatedChannel.append("name", name);
    updatedChannel.append("private", private_server);

    await dispatch(channelActions.editChannelThunk(channelId, updatedChannel));
    closeModal()
  };

  return (
    <div className="pageContainers">
      <h1>#{channel_info?.name} TEXT CHANNELS</h1>
      <h2>Overview</h2>
      <form onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div>
          <label>
            CHANNEL NAME:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        {/* <div>
          <label>
            private
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
        </div> */}
        <button type="submit">Update</button>
      </form>
    </div>
  )
};

export default EditChannelModal;
