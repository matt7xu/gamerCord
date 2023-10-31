import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from 'react-router-dom';
import * as sessionActions from "../../store/session.js";
import vipPicture from "./vip.png";
import './UserVIPModal.css';

const UserVIPModal = ({ userId }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleClick = async (e) => {
    e.preventDefault();
    const data = await dispatch(sessionActions.updateUserVIPThunk(userId));
    if (data) {
      closeModal();
      history.push("/guild-discovery");
    }
  }

  return (
    <div>
      <div>
        <img src={vipPicture} alt="vip"></img>
      </div>
      <div>
        <button className="joinVIPbutton" onClick={handleClick} type="submit">JOIN NOW</button>
      </div>
    </div>
  );
}

export default UserVIPModal;
