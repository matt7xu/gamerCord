import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as userActions from "../../store/user.js";
import * as serverActions from "../../store/server";
import noPicture from "./No_image.png";
import "./Server.css";

const Servers = () => {
  const dispatch = useDispatch();
  const allServers = useSelector(state => Object.values(state.server));
  const current_user = useSelector(state => Object.values(state.session));

  useEffect(() => {
    dispatch(serverActions.loadServerOwnedThunk());
  }, [dispatch]);

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

  return (
    <div className="server_left">
      {allServers.map((server) => (
        <Link key={server.id} to={`/servers/${server.id}`}>
          {handleEachServer(server)}
        </Link>
      ))}
      <div>
        <Link to={`/guild-discovery`}>
          <i className="fas fa-compass fa-3x"></i>
        </Link>
      </div>
    </div>
  )
};

export default Servers;
