import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import * as serverActions from "../../store/server";
import { useDispatch, useSelector } from "react-redux";
import ServerSettingButton from './ServerSettingButton';

const ServerDetail = () => {
  const dispatch = useDispatch();
  let serverId = useParams();
  serverId = serverId.id
  const alltServers = useSelector(state =>state.server);

  useEffect(() => {
    dispatch(serverActions.loadAllServerThunk());
  }, [dispatch]);


  return (
    <div>
      <div>
        {alltServers[serverId]?.name}
        <ServerSettingButton serverId={serverId} server_info={alltServers[serverId]} />
      </div>
    </div>
  )
};

export default ServerDetail;
