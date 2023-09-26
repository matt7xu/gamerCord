import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { NavLink, useHistory } from 'react-router-dom';
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import * as sessionActions from "../../store/session";
import "./LoginForm.css";

function LoginFormModal() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
        history.push("/servers/@me");
    }
  };
  const closeMenu = () => setShowMenu(false);

  const demoLogin = (e) => {
    e.preventDefault();
    dispatch(sessionActions.login("PeterGriffin@aa.io", "password"))
    closeModal()
    history.push("/servers/@me");
  }

  return (
    <>
      <h1>Welcome back!</h1>
      <h2>We're so Excited to see you again!</h2>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          EMAIL
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          PASSWORD
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Log In</button>
        <div>
        <h3>Need an account?</h3>
        <OpenModalButton
              buttonText="Register"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
        </div>
        <div>
        <button onClick={demoLogin} type="submit">Demo User</button>
        </div>
      </form>
    </>
  );
}

export default LoginFormModal;
