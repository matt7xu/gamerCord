import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as messageActions from "../../store/message";

function EditChannelModal({ message }) {
  const dispatch = useDispatch();
  const [content, setContent] = useState(message.content);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedMessage = new FormData();
    updatedMessage.append("content", content);

    await dispatch(messageActions.editMessageThunk(message.id, updatedMessage));
    closeModal()
  };

  return (
    <div className="pageContainers">
      <h1>Message</h1>
      <form onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div>
          <label>
            Message Content
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  )
};

export default EditChannelModal;
