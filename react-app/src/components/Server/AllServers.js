import React, { useEffect } from "react";
import * as serverActions from "../../store/server";
import { useDispatch, useSelector } from "react-redux";
import noPicture from "./No_image.png";

const AllServers = () => {
  const dispatch = useDispatch();
  const allServers = useSelector(state => Object.values(state.server));

  useEffect(() => {
    dispatch(serverActions.loadAllServerThunk());
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
          <img src={noPicture} alt="noImage"></img>
        </div>
      )
    } else {
      return (
        <div>
          <img src={server.image} alt="serverImage"></img>
        </div>
      )
    }
  }

  return (
    <div>
      <h1>Find your community on gamerCord</h1>
      <h3>From gaming, to game music, there's a place for you</h3>
      <h2>Featured communities</h2>
      {allServers.map((server) => (
        <div>
          {handleEachServer(server)}
          <div>{server.name}</div>
        </div>
      ))}
    </div>
  )
};

export default AllServers;
