import { useDispatch, useSelector } from "react-redux";
import * as serverActions from "../../store/server";

const Servers = () => {
  const dispatch = useDispatch();
  const allServers = useSelector(state => Object.values(state.servers));

  useEffect(() => {
    dispatch(serverActions.loadServerOwned());
  }, [dispatch]);

  return (
    <div>

    </div>
  )
};

export default Servers;
