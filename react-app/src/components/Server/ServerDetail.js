import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import * as serverActions from "../../store/server";
import { useDispatch, useSelector } from "react-redux";
import ServerSettingButton from './ServerSettingButton';

const ServerDetail = () => {
  const dispatch = useDispatch();
  const  serverId  = useParams();
  const allServers = useSelector(state => Object.values(state.server));

  useEffect(() => {
    dispatch(serverActions.loadAllServerThunk());
  }, [dispatch]);

  const currentAlbum = allServers[serverId.id];
  const serverId_string = serverId.id.toString()

  return (
    <div>
      <div>
        {currentAlbum?.name}
        <ServerSettingButton serverId={serverId_string} server_info={currentAlbum} />
      </div>

    </div>
  )
};

export default ServerDetail;
