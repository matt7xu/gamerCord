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
  const [image, setImage] = useState('');
  const [imageLoading, setImageLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errorMess = [];

    if (image !== '') {
      const allowedExtensions = ['png', 'jpg', 'jpeg'];
      const fileExtension = image.name.split('.');

      if (!allowedExtensions.includes(fileExtension[fileExtension.length - 1])) {
        errorMess.push('Image file must have a valid extension: .png, .jpg, .jpeg')
      }
    }

    setErrors(errorMess)

    if (errorMess.length === 0) {

      let formData = new FormData();
      formData.append("name", name);
      formData.append("private", private_server);
      formData.append("image", image);

      const data = await dispatch(serverActions.addServerThunk(formData));

      dispatch(sessionActions.userJoinServerThunk(data.id, data.user_id));

      let formDataServer = new FormData();
      formDataServer.append("name", "general");
      formDataServer.append("private", false);

      closeModal()
      history.push(`/servers/${data.id}`);
    }
    setImageLoading(false);
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
        <ul>
          {errors.length > 0 && errors.map(el => (
            <div key={el} className="errors">{el}</div>
          ))}
        </ul>
        {(imageLoading) && <p>Image Uploading...</p>}
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
        <div>
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
        </div>
        <p>By creating a server, you agree to gamerCord's Community Guidelines.</p>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateServerModal;
