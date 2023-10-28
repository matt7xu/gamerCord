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
  const allServers = useSelector(state => state.server);

  useEffect(() => {
    dispatch(sessionActions.loadUserByIdThunk(userId));
    dispatch(serverActions.loadServerOwnedThunk());
    dispatch(channelActions.loadAllChannelThunk());
  }, [dispatch]);

  const closeMenu = () => setShowMenu(false);

  const handleEachServer = (server) => {
    if (server?.image == null || server.image == '') {
      return (
        <div>
          <img className="server_image" src={noPicture} alt="noImage"></img>
        </div>
      )
    } else {

      return (
        <div>
          <img className="server_image" src={allServers[server.id]?.image}
            alt="link broken"
            onError={event => {
              event.target.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"
              event.onerror = null
            }}></img>
        </div>
      )
    }
  }

  const create_server_logo = () => {
    return (
      <div className="tooltip">
        <i className="fas fa-plus fa-3x add_server_icon"></i>
        <span className="tooltiptext">Add a Server</span>
      </div>
    )
  }


  return (
    <div className="server_left">
      {user_servers?.map((server) => (
        <Link key={server?.id} to={`/servers/${server?.id}`}>
          {handleEachServer(server)}
        </Link>
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
            <span className="tooltiptext">Explore Discoverable Servers</span>
          </div>
        </Link>
      </div>
    </div>
  )
};

export default Servers;
