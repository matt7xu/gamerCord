import React, { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import * as serverActions from "../../store/server";
import * as channelActions from "../../store/channel";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import CreateChannelModal from "./CreateChannelModal";
import ChannelSettingButton from "./ChannelSettingButton";
import ServerSettingButton from '../Server/ServerSettingButton';
import Chat from "../Message";
import "./Channel.css";

const ChannelDetails = () => {
  const dispatch = useDispatch();
  let channelId = useParams();
  channelId = channelId.id

  const [showMenu, setShowMenu] = useState(false);
  const current_user = useSelector(state => state.session);
  const currentChannel = useSelector(state => Object.values(state.channel).filter(x => x.id == channelId));
  let serverId = currentChannel[0]?.server_id;
  const allServers = useSelector(state => state.server);
  const allChannels = useSelector(state => Object.values(state.channel).filter(x => x.server_id == serverId));
  // const currentServer = useSelector(state => Object.values(state.server).filter(x => x.id == serverId));
  const currentServer = allServers[serverId]


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
    </div>
      <div>
        <Chat channelId={channelId} />
      </div>
    </div>
  )
};

export default ChannelDetails;
