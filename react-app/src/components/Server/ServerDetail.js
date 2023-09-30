import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import * as serverActions from "../../store/server";
import { useDispatch, useSelector } from "react-redux";
import ServerSettingButton from './ServerSettingButton';
import OpenModalButton from "../OpenModalButton";
import CreateChannelModal from "../Channel/CreateChannelModal";
import "./Server.css";

const ServerDetail = () => {
  const dispatch = useDispatch();
  let serverId = useParams();
  serverId = serverId.id
  const [showMenu, setShowMenu] = useState(false);
  const alltServers = useSelector(state => state.server);

  useEffect(() => {
    dispatch(serverActions.loadAllServerThunk());
  }, [dispatch]);

  const closeMenu = () => setShowMenu(false);

  const create_channel_logo = () => {
    return (
      <div>
        <i className="fas fa-plus"></i>
      </div>
    )
  }

  return (
    <div>
      <div className="server_name_cont">
        {alltServers[serverId]?.name}'s server
        <ServerSettingButton serverId={serverId} server_info={alltServers[serverId]} />
      </div>
      <div>
        <div>TEXT CHANNELS
          <OpenModalButton
            buttonText={create_channel_logo()}
            onItemClick={closeMenu}
            modalComponent={<CreateChannelModal />}
          /></div>
      </div>
    </div>
  )
};

export default ServerDetail;
