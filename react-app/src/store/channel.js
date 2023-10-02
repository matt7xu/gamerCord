const LOAD_ALL_CHANNEL = "channels/all";
const LOAD_CHANNEL_BY_ID = "channels/loadChannelById";
const ADD_CHANNEL = "channels/addChannel";
const EDIT_CHANNEL = "channels/editChannel";
const DELETE_CHANNEL = "channels/deleteChannel";

export const loadAllChannel = (channels) => ({
  type: LOAD_ALL_CHANNEL,
  payload: channels
});


export const loadChannelById = (channel) => ({
  type: LOAD_CHANNEL_BY_ID,
  payload: channel
});

export const addChannel = (channel) => ({
  type: ADD_CHANNEL,
  payload: channel
});

export const editChannel = (channel) => ({
  type: EDIT_CHANNEL,
  payload: channel
});

export const deleteChannel = (id) => ({
  type: DELETE_CHANNEL,
  payload: id
});


//thunk
export const loadAllChannelThunk = () => async (dispatch) => {
  const res = await fetch("/api/channels/");
  if (res.ok) {
    const channels = await res.json();
    dispatch(loadAllChannel(channels));
    return channels;
  }
};


export const loadChannelByIdThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/channels/${id}`);

  if (res.ok) {
    const channel = await res.json();
    dispatch(loadChannelById(channel));
    return channel;
  }
}

export const addChannelThunk = (newChannel, serverId) => async (dispatch) => {

  const res = await fetch(`/api/channels/${serverId}/new`, {
    method: "POST",
    body: newChannel
  });

  if (res.ok) {
    const channel = await res.json();
    dispatch(addChannel(channel));
    return channel;
  }
};

export const editChannelThunk = (id, updateChannel) => async (dispatch) => {

  const res = await fetch(`/api/channels/${id}`, {
    method: "PUT",
    body: updateChannel
  });

  if (res.ok) {
    const channel = await res.json();
    dispatch(editChannel(channel));
    return channel;
  }
};

export const deleteChannelThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/channels/${id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    return dispatch(deleteChannel(id));
  }
};

const initialState = {};

const channelReducer = (state = initialState, action) => {
  let newState = { ...state }
  switch (action.type) {
    case LOAD_ALL_CHANNEL:
      action.payload.channels.forEach((ea) => {
        newState[ea.id] = ea;
      });
      return newState;
    case LOAD_CHANNEL_BY_ID:
      newState[action.payload.id] = action.payload;
      return newState;
    case ADD_CHANNEL:
      newState[action.payload.id] = action.payload;
      return newState;
    case EDIT_CHANNEL:
        newState[action.payload.id] = action.payload;
        return newState;
    case DELETE_CHANNEL:
      delete newState[action.payload];
      return newState;
    default:
      return newState
  }
};

export default channelReducer;
