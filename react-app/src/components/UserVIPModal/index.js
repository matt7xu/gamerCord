import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from 'react-router-dom';
import * as userActions from "../../store/user.js";
import vipPicture from "./vip.png";

const UserVIPModal = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const current_user = useSelector(state => Object.values(state.session));

  const handleClick = async (e) => {
  e.preventDefault();
  const data = await dispatch(userActions.updateUserVIPThunk(current_user[0].id));
    if (data) {
      closeModal();
      history.push("/servers/@me");
    }
  }

return (
  <div>
    <div>
      <img src={vipPicture} alt="vip"></img>
    </div>
    <div>
      <button onClick={handleClick} type="submit">JOIN NOW</button>
    </div>
  </div>
);
}

export default UserVIPModal;
