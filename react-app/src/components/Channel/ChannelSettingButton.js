import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import EditChannelModal from "./EditChannelModal";
import DeleteChannelModal from "./DeleteChannelModal";


function ChannelSettingButton({ channelId, currentServer, channel_info }) {
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
    {current_user?.user?.id == currentServer?.user_id ?
    <>
      <button onClick={openMenu} title="Edit Channel">
        <i className="fas fa-cog" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        <>
            <div className="editServerButton">
              <OpenModalButton
                buttonText="Edit Channel"
                onItemClick={closeMenu}
                modalComponent={<EditChannelModal channelId={channelId} channel_info={channel_info} />}
              />
              <OpenModalButton
                buttonText="Delete Channel"
                onItemClick={closeMenu}
                modalComponent={<DeleteChannelModal channelId={channelId} serverId={currentServer.id} />}
              />
            </div>
        </>
      </ul>
      </>
      :null}
    </>
  );
}

export default ChannelSettingButton;
