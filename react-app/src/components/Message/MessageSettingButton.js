import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import EditMessageModal from "./EditMessageModal";
import DeleteMessageModal from "./DeleteMessageModal";
import "./Message.css";

function MessageSettingButton({ message }) {
  const [showMenu, setShowMenu] = useState(false);

  const current_user = useSelector(state => state.session);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <div className="MessageSettingButtonDiv">
      {current_user?.user?.id == message?.user_id ?
        <>
          <button onClick={openMenu} title="Edit Message">
            <i className="fas fa-ellipsis-h" />
          </button>
          <ul className={ulClassName} ref={ulRef}>
            <>
              <div className="editServerButton">
                <OpenModalButton
                  buttonText="Edit Message"
                  onItemClick={closeMenu}
                  modalComponent={<EditMessageModal message={message} />}
                />
                <OpenModalButton
                  buttonText="Delete Message"
                  onItemClick={closeMenu}
                  modalComponent={<DeleteMessageModal messageId={message.id} />}
                />
              </div>
            </>
          </ul>
        </>
        : null}
    </div>
  );
}

export default MessageSettingButton;
