import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import * as serverActions from "../../store/server";
import * as sessionActions from "../../store/session";

function EditServerModal({ serverId, server_info, userId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState(server_info.name);
  const [private_server, setPrivate_server] = useState(server_info.private);
  const [image, setImage] = useState(server_info.image);
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errorMess = [];
    if (image !== '') {
      const allowedExtensions = ['png', 'jpg', 'jpeg'];
      if(image.name) {
        const fileExtension = image.name.split('.');

        if (!allowedExtensions.includes(fileExtension[fileExtension.length - 1])) {
          errorMess.push('Image file must have a valid extension: .png, .jpg, .jpeg')
        }
      } else {
        const fileExtension = image.split('.');

        if (!allowedExtensions.includes(fileExtension[fileExtension.length - 1])) {
          errorMess.push('Image file must have a valid extension: .png, .jpg, .jpeg')
        }
      }
    }

    setErrors(errorMess)

    if (errorMess.length === 0) {
      const updatedServer = new FormData();
      updatedServer.append("name", name);
      updatedServer.append("private", private_server);
      updatedServer.append("image", image);

      dispatch(serverActions.editServerThunk(serverId, updatedServer));
      dispatch(sessionActions.editUserServerByIdThunk(userId, serverId, image));

      closeModal()
      history.push(`/servers/${serverId}`);
    }
  };

  return (
    <div>
      <h1>Server Profiles</h1>
      <h5>Show who you are with different profiles for each of your servers.</h5>
      <form onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <ul>
          {errors.length > 0 && errors.map(el => (
            <div key={el} className="errors">{el}</div>
          ))}
        </ul>
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
        <label>
          Server Image (optional)
          URL must end in .png, .jpg, or .jpeg
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          {image.name ?
            <label>Selected Image: {image.name} </label> :
          <label>Selected Image: {image} </label>
            }
        </label>
        <button type="submit">Update</button>
      </form >
    </div >
  )
};

export default EditServerModal;
