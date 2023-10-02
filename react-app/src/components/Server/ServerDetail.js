import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import * as serverActions from "../../store/server";
import * as channelActions from "../../store/channel";
import { useDispatch, useSelector } from "react-redux";
import ServerSettingButton from './ServerSettingButton';
import OpenModalButton from "../OpenModalButton";
import CreateChannelModal from "../Channel/CreateChannelModal";
import ChannelSettingButton from "../Channel/ChannelSettingButton";
import "./Server.css";

const ServerDetail = () => {
  const dispatch = useDispatch();
  let serverId = useParams();
  serverId = serverId.id
  const [showMenu, setShowMenu] = useState(false);
  const current_user = useSelector(state => state.session);
  const alltServers = useSelector(state => state.server);
  const allChannels = useSelector(state => Object.values(state.channel).filter(x => x.server_id == serverId));
  const currentServer = useSelector(state => Object.values(state.server).filter(x => x.id == serverId));

  useEffect(() => {
    dispatch(serverActions.loadAllServerThunk());
    dispatch(channelActions.loadAllChannelThunk());
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
      <div className="channel_tags">
        <hr></hr>
        <div>TEXT CHANNELS
          {current_user?.user?.id == currentServer[0]?.user_id ?
            <OpenModalButton
              buttonText={create_channel_logo()}
              onItemClick={closeMenu}
              modalComponent={<CreateChannelModal serverId={serverId} />}
            />
            : null}
        </div>
        <div>
          {allChannels.map((each) => (
            <div key={each?.id} className="allChannel">
              #{each?.name}
              <ChannelSettingButton channelId={each?.id} currentServer={currentServer} channel_info={each} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};

export default ServerDetail;
