import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as serverActions from "../../store/server";
import * as sessionActions from "../../store/session";
import * as channelActions from "../../store/channel";
import noPicture from "./No_image.png";
import OpenModalButton from "../OpenModalButton";
import CreateServerModal from "./CreateServerModal";
import "./Server.css";

const Servers = ({ userId }) => {
  const dispatch = useDispatch();
  // const allServers = useSelector(state => state.server);
  const current_user = useSelector(state => state.session);
  const [showMenu, setShowMenu] = useState(false);
  const user_servers = current_user.user.servers;
  const allChannels = useSelector(state => Object.values(state.channel));

  useEffect(() => {
    dispatch(sessionActions.loadUserByIdThunk(userId));
    dispatch(serverActions.loadServerOwnedThunk());
    dispatch(channelActions.loadAllChannelThunk());
  }, [dispatch]);

  const closeMenu = () => setShowMenu(false);

  const checkImage = (urlString) => {
    const endings = ["png", "jpg", "jpeg"];
    const array = urlString.split(".");
    if (endings.includes(array[array.length - 1])) {
      return false;
    }
    return true;
  }

  const handleEachServer = (server) => {
    if (checkImage(server.image)) {
      return (
        <div>
          <img className="server_image" src={noPicture} alt="noImage"></img>
        </div>
      )
    } else {
      return (
        <div>
          <img className="server_image" src={server.image} alt="serverImage"></img>
        </div>
      )
    }
  }

  const create_server_logo = () => {
    return (
      <div className="tooltip">
        <i className="fas fa-plus fa-3x add_server_icon"></i>
        <span class="tooltiptext">Add a Server</span>
      </div>
    )
  }

  const linktoChannel = (server) => {
    let channelId = 0;

    for (let i = 0; i < allChannels.length; i++) {
      if (allChannels[i].server_id == server.id) {
        channelId = allChannels[i].id;
        break;
      }
    }
    return (
      <Link key={server?.id} to={`/channels/${channelId}`}>
          {handleEachServer(server)}
      </Link>
    )
  }


  return (
    <div className="server_left">

      {user_servers?.map((server) => (
        linktoChannel(server)
      ))}
      <div>
        <OpenModalButton
          buttonText={create_server_logo()}
          onItemClick={closeMenu}
          modalComponent={<CreateServerModal />}
        />
      </div>
      <div>
        <Link to={`/guild-discovery`}>
          <div className="tooltip">
            <i className="fas fa-compass fa-3x all_server_icon"></i>
            <span class="tooltiptext">Explore Discoverable Servers</span>
          </div>
        </Link>
      </div>
    </div>
  )
};

export default Servers;
