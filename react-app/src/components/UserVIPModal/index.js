import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from 'react-router-dom';
import * as sessionActions from "../../store/session.js";
import vipPicture from "./vip.png";
import './UserVIPModal.css';

const UserVIPModal = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const current_user = useSelector(state => state.session);

  const handleClick = async (e) => {
  e.preventDefault();
  const data = await dispatch(sessionActions.updateUserVIPThunk(current_user.user.id));
    if (data) {
      closeModal();
      history.push("/");
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
