import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import EditServerModal from "./EditServerModal";
import DeleteServerModal from "./DeleteServerModal";
import QuitServerModal from "./QuitServerModal";
// import * as sessionActions from "../../store/session";
import "./Server.css";

function ServerSettingButton({ serverId, server_info }) {
  // const dispatch = useDispatch();
  // const history = useHistory();

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
    <>
      <button onClick={openMenu} title="Edit Server">
        <i className="fas fa-cog" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        <>
          {current_user?.user?.id == server_info?.user_id ?
            <div className="editServerButton">
              <OpenModalButton
                buttonText="Edit Server"
                onItemClick={closeMenu}
                modalComponent={<EditServerModal serverId={serverId} server_info={server_info} />}
              />
              <OpenModalButton
                buttonText="Delete Server"
                onItemClick={closeMenu}
                modalComponent={<DeleteServerModal serverId={serverId} userId={current_user?.user?.id} />}
              />
            </div>
            :
            <div className="quitServerButton">
              <OpenModalButton
                buttonText="Quit Server"
                onItemClick={closeMenu}
                modalComponent={<QuitServerModal serverId={serverId} userId={current_user?.user?.id} />}
              />
            </div>
          }

        </>
      </ul>
    </>
  );
}

export default ServerSettingButton;
