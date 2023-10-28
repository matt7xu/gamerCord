import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as serverActions from "../../store/server";
import * as sessionActions from "../../store/session";
import noPicture from "./No_image.png";
import "./Server.css";

const AllServers = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const allServers = useSelector(state => state.server);
  const current_user = useSelector(state => state.session);
  const userId = current_user?.user?.id


  useEffect(() => {
    dispatch(serverActions.loadAllServerThunk());
    // dispatch(sessionActions.loadUserByIdThunk());
  }, [dispatch]);


  const handleEachServer = (server) => {
    if (server.image == null  || server.image == '') {
      return (
        <img className="server_card_img" src={noPicture} alt="noImage"></img>
      )
    } else {
      return (
        <img className="server_card_img" src={server.image} alt="serverImage"></img>
      )
    }
  }

  const joinServer = (e, serverId) => {
    const userId = current_user?.user?.id
    dispatch(sessionActions.userJoinServerThunk(serverId, userId));
    history.push(`/servers/${serverId}`);
  }

  const checkServerJoinedOrNot = (serverId) => {
    let user_servers = current_user.user?.servers
    for (let i = 0; i < user_servers?.length; i++) {
      if (user_servers[i]?.id == serverId) {
        return true;
      }
    }
    return false;
  }

  return (
    <div className="server_card_grid">
      <div className="server_card_text">
        <h1>Find your community on gamerCord</h1>
        <h3>From gaming, to game background music, there's a place for you</h3>
        <h2>Featured communities</h2>
      </div>
      {Object.values(allServers).map((server) => (
        <div className="server_card_server" key={server?.id}>
          {handleEachServer(server)}
          <div>{server?.name}</div>
          {checkServerJoinedOrNot(server?.id)
            ?
            <div>Server Joined</div>
            :
            <div>
              <button  onClick={e => joinServer(e, server?.id)}>Join Server</button>
            </div>
          }
        </div>
      ))}
    </div>
  )
};

export default AllServers;
