const LOAD_ALL_MESSAGE = "messages/all";
const LOAD_MESSAGE_BY_ID = "messages/loadMessageById";
const ADD_MESSAGE = "messages/addMessage";
const EDIT_MESSAGE = "messages/editMessage";
const DELETE_MESSAGE = "messages/deleteMessage";

export const loadAllMessage = (messages) => ({
  type: LOAD_ALL_MESSAGE,
  payload: messages
});


export const loadMessageById = (message) => ({
  type: LOAD_MESSAGE_BY_ID,
  payload: message
});

export const addMessage = (message) => ({
  type: ADD_MESSAGE,
  payload: message
});

export const editMessage = (message) => ({
  type: EDIT_MESSAGE,
  payload: message
});

export const deleteMessage = (id) => ({
  type: DELETE_MESSAGE,
  payload: id
});


//thunk
export const loadAllMessageThunk = () => async (dispatch) => {
  const res = await fetch("/api/messages/");
  if (res.ok) {
    const messages = await res.json();
    dispatch(loadAllMessage(messages));
    return messages;
  }
};


export const loadMessageByIdThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/messages/${id}`);

  if (res.ok) {
    const message = await res.json();
    dispatch(loadMessageById(message));
    return message;
  }
}

export const addMessageThunk = (newMessage) => async (dispatch) => {

  const res = await fetch("/api/messages/", {
    method: "POST",
    body: newMessage
  });

  if (res.ok) {
    const message = await res.json();
    dispatch(addMessage(message));
    return message;
  }
};

export const editMessageThunk = (id, updateMessage) => async (dispatch) => {

  const res = await fetch(`/api/messages/${id}`, {
    method: "PUT",
    body: updateMessage
  });

  if (res.ok) {
    const message = await res.json();
    dispatch(editMessage(message));
    return message;
  }
};

export const deleteMessageThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/messages/${id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    return dispatch(deleteMessage(id));
  }
};

const initialState = {};

const messageReducer = (state = initialState, action) => {
  let newState = { ...state }
  switch (action.type) {
    case LOAD_ALL_MESSAGE:
      action.payload.messages.forEach((ea) => {
        newState[ea.id] = ea;
      });
      return newState;
    case LOAD_MESSAGE_BY_ID:
      newState[action.payload.id] = action.payload;
      return newState;
    case ADD_MESSAGE:
      newState[action.payload.id] = action.payload;
      return newState;
    case EDIT_MESSAGE:
        newState[action.payload.id] = action.payload;
        return newState;
    case DELETE_MESSAGE:
      delete newState[action.payload];
      return newState;
    default:
      return newState
  }
};

export default messageReducer;
