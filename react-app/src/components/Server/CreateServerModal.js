import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as serverActions from "../../store/server";
import * as sessionActions from "../../store/session";
import * as channelActions from "../../store/channel";


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
    formData.append("image", image);

    const data = await dispatch(serverActions.addServerThunk(formData));
    dispatch(sessionActions.userJoinServerThunk(data.id, data.user_id));

    let formDataServer = new FormData();
    formDataServer.append("name", "general");
    formDataServer.append("private", false);
    dispatch(channelActions.addChannelThunk(formDataServer, data.id));

    closeModal()
    history.push(`/servers/${data.id}`);



  }

  return (
    <div className="pageContainers">
      <div>
        <h1>Create a server</h1>
        <p>Your server is where you an your friends hang out.</p>
        <p>Make your and start talking.</p>
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
              // checked
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
        <p>By creating a server, you agree to gamerCord's Community Guidelines.</p>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateServerModal;
