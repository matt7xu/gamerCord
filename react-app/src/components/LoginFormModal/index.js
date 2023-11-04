import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from 'react-router-dom';
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

    const useremail = email.toLowerCase();

    const data = await dispatch(login(useremail, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
        history.push("/");
    }
  };
  const closeMenu = () => setShowMenu(false);

  const demoLogin1 = (e) => {
    e.preventDefault();
    dispatch(sessionActions.login("PeterGriffin@aa.io", "password"))
    closeModal()
  }

  const demoLogin2 = (e) => {
    e.preventDefault();
    dispatch(sessionActions.login("Stewart@aa.io", "password"))
    closeModal()
  }

  return (
    <div className="pageContainers">
      <h1>Welcome!</h1>
      <h2>We're so Excited to see you!</h2>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          EMAIL
          <input
            type="email"
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
        <div className="loginDemoButton">
        <h3>Need an account?</h3>
        <OpenModalButton
              buttonText="Register"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
        </div>
        <div className="loginDemoButton">
        <button onClick={demoLogin1} type="submit">Demo User1</button>
        </div>
        <div className="loginDemoButton">
        <button onClick={demoLogin2} type="submit">Demo User2</button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
