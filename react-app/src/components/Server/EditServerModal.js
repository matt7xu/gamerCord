import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
// import { useHistory } from "react-router-dom";
import * as serverActions from "../../store/server";

function EditServerModal({ serverId, server_info }) {
  const dispatch = useDispatch();
  // const history = useHistory();
  const [name, setName] = useState(server_info.name);
  const [private_server, setPrivate_server] = useState(server_info.private);
  const [image, setImage] = useState(server_info.image);
  // const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedServer = new FormData();
    updatedServer.append("name", name);
    updatedServer.append("private", private_server);
    updatedServer.append("image", image);

    await dispatch(serverActions.editServerThunk(serverId, updatedServer));
    closeModal()
    // history.push(`/{serverId}`);
  };

  return (
    <div>
      <h1>Server Profiles</h1>
      <h5>Show who you are with different profiles for each of your servers.</h5>
      <form onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        {/* <ul>
          {errors.length > 0 && errors.map(el => (
            <div key={el} className="errors">{el}</div>
          ))}
        </ul> */}
        <div>
          <label>
            Name
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
            private
            <input
              type="radio"
              value="False"
              onChange={(e) => setPrivate_server(false)}
              checked
            />
            False
            <input
              type="radio"
              value="True"
              onChange={(e) => setPrivate_server(true)}
            />
            True
          </label>
        </div>
        <div>
          <label>
            Server Image Url
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  )
};

export default EditServerModal;
