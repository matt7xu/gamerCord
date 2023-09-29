const LOAD_ALL_SERVER = "servers/all";
const LOAD_SERVER_OWNED = "servers/owned";
const LOAD_SERVER_BY_ID = "servers/loadServerById";
const ADD_SERVER = "servers/addServer";
const EDIT_SERVER = "servers/editServer";
const DELETE_SERVER = "servers/deleteServer";


export const loadAllServer = (servers) => ({
  type: LOAD_ALL_SERVER,
  payload: servers
});

export const loadServerOwned = (servers) => ({
  type: LOAD_SERVER_OWNED,
  payload: servers
});

export const loadServerById = (server) => ({
  type: LOAD_SERVER_BY_ID,
  payload: server
});

export const addServer = (server) => ({
  type: ADD_SERVER,
  payload: server
});

export const editServer = (server) => ({
  type: EDIT_SERVER,
  payload: server
});

export const deleteServer = (id) => ({
  type: DELETE_SERVER,
  payload: id
});


//thunk
export const loadAllServerThunk = () => async (dispatch) => {
  const res = await fetch("/api/servers/");
  if (res.ok) {
    const servers = await res.json();
    dispatch(loadAllServer(servers));
    return servers;
  }
};

export const loadServerOwnedThunk = () => async (dispatch) => {
  const res = await fetch("/api/servers/owned");
  if (res.ok) {
    const load_All_Server = await res.json();
    dispatch(loadServerOwned(load_All_Server));
    return load_All_Server;
  }
};

export const loadServerByIdThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/servers/${id}`);

  if (res.ok) {
    const server = await res.json();
    dispatch(loadServerById(server));
    return server;
  }
}

export const addServerThunk = (server) => async (dispatch) => {
  const res = await fetch("/api/servers/new", {
    method: "POST",
    body: server
  });

  if (res.ok) {
    const server = await res.json();
    dispatch(addServer(server));
    return server;
  }
};

export const editServerThunk = (id, updatedServer) => async (dispatch) => {
  const res = await fetch(`/api/servers/${id}`, {
    method: "PUT",
    body: updatedServer
  });

  if (res.ok) {
    const server = await res.json();
    dispatch(editServer(server));
    return server;
  }
};

export const deleteServerThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/servers/${id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    return dispatch(deleteServer(id));
  }
};



//Reducer
const initialState = {};

const serverReducer = (state = initialState, action) => {
  let newState = { ...state }
  switch (action.type) {
    case LOAD_ALL_SERVER:
      action.payload.servers.forEach((ea) => {
        newState[ea.id] = ea;
      });
      return newState;
    case LOAD_SERVER_OWNED:
      action.payload.Servers.forEach((ea) => {
        newState[ea.id] = ea;
      });
      return newState;
    case LOAD_SERVER_BY_ID:
      newState[action.payload.id] = action.payload;
      return newState;
    case ADD_SERVER:
      newState[action.payload.id] = action.payload;
      return newState;
    case EDIT_SERVER:
      newState[action.payload.id] = action.payload;
      return newState;
    case DELETE_SERVER:
      delete newState[action.payload];
      return newState;
    default:
      return newState
  }
};

export default serverReducer;
