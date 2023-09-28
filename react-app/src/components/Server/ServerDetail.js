import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import * as serverActions from "../../store/server";
import { useDispatch, useSelector } from "react-redux";

const ServerDetail = () => {
  const dispatch = useDispatch();
  const  serverId  = useParams();
  const allServers = useSelector(state => Object.values(state.server));

  useEffect(() => {
    dispatch(serverActions.loadAllServerThunk());
  }, [dispatch, serverId]);

  const currentAlbum = allServers[serverId.id];

  return (
    <div>
      <div>{console.log('$$$$$$$$',currentAlbum)}</div>
    </div>
  )
};

export default ServerDetail;
