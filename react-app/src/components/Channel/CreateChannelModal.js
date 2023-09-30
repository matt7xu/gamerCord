import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as serverActions from "../../store/server";
import * as sessionActions from "../../store/session";

function CreateServerModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const [name, setName] = useState("");
  const [private_server, setPrivate_server] = useState(false);
  const [image, setImage] = useState("");
  // const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("name", name);
    formData.append("private", private_server);

    const data = await dispatch(serverActions.addServerThunk(formData));
    dispatch(sessionActions.userJoinServerThunk(data.id, data.user_id));

    closeModal()
    history.push("/guild-discovery");



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
        {/* <ul>
          {errors.length > 0 && errors.map(el => (
            <div key={el} className="errors">{el}</div>
          ))}
        </ul> */}
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
        <p>Only selected members and roles will be able to view this channel.</p>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateServerModal;
