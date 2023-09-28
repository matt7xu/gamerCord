import React, { useState, useEffect, useRef } from "react";
import OpenModalButton from "../OpenModalButton";
import EditServerModal from "./EditServerModal";
import DeleteServerModal from "./DeleteServerModal";

function ServerSettingButton({serverId, server_info}) {
  const [showMenu, setShowMenu] = useState(false);

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
      <button onClick={openMenu}>
        <i className="fas fa-cog" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        <>
          <OpenModalButton
            buttonText="Edit Server"
            onItemClick={closeMenu}
            modalComponent={<EditServerModal serverId={serverId} server_info={server_info} />}
          />
          <OpenModalButton
            buttonText="Delete Server"
            onItemClick={closeMenu}
            modalComponent={<DeleteServerModal serverId={serverId} />}
          />
        </>
      </ul>
    </>
  );
}

export default ServerSettingButton;
