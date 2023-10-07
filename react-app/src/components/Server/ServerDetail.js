import React, { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import * as serverActions from "../../store/server";
import * as channelActions from "../../store/channel";
import { useDispatch, useSelector } from "react-redux";
import ServerSettingButton from './ServerSettingButton';
import OpenModalButton from "../OpenModalButton";
import "./Server.css";
import CreateChannelModal from "../Channel/CreateChannelModal";
import ChannelSettingButton from "../Channel/ChannelSettingButton";

const ServerDetail = () => {
  const dispatch = useDispatch();
  let serverId = useParams();
  serverId = serverId.id

  const [showMenu, setShowMenu] = useState(false);
  const current_user = useSelector(state => state.session);
  const allChannels = useSelector(state => Object.values(state.channel).filter(x => x.server_id == serverId));


  const allServers = useSelector(state => state.server);
  const currentServer = allServers[serverId];

  useEffect(() => {
    dispatch(serverActions.loadAllServerThunk());
    dispatch(channelActions.loadAllChannelThunk());
  }, [dispatch]);

  const closeMenu = () => setShowMenu(false);


  const create_channel_logo = () => {
    return (
      <div className="tooltip">
        <i className="fas fa-plus"></i>
        <span class="tooltiptext">Create Channel</span>
      </div>
    )
  }


  return (
    <div>
      <div className="server_name_cont">
        {allServers[serverId]?.name}'s server
        <ServerSettingButton serverId={serverId} server_info={allServers[serverId]} />
      </div>
      <div className="channel_tags">
        <hr></hr>
        <div>TEXT CHANNELS
          {current_user?.user?.id == currentServer?.user_id ?
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
              <Link className="allChannelLink" key={each.id} to={`/channels/${each.id}`}>
                #{each?.name}
                <ChannelSettingButton channelId={each?.id} currentServer={currentServer} channel_info={each} />
              </Link>
            </div>
          ))}
        </div>
      </div>
      {/* <ChannelDetails /> */}
      <div className="serverWelcome">
        <h1>Welcome to</h1>
        <h1>{currentServer?.name}</h1>
        <h3>This is the beginning of this server.</h3>
      </div>
    </div>
  )
};

export default ServerDetail;
