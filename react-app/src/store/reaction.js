const LOAD_ALL_REACTION = "reactions/all";
const LOAD_REACTION_BY_ID = "reactions/loadReactionById";
const ADD_REACTION = "reactions/addReaction";
const EDIT_REACTION = "reactions/editReaction";
const DELETE_REACTION = "reactions/deleteReaction";

export const loadAllReaction = (reactions) => ({
  type: LOAD_ALL_REACTION,
  payload: reactions
});


export const loadReactionById = (reaction) => ({
  type: LOAD_REACTION_BY_ID,
  payload: reaction
});

export const addReaction = (reaction) => ({
  type: ADD_REACTION,
  payload: reaction
});

export const editReaction = (reaction) => ({
  type: EDIT_REACTION,
  payload: reaction
});

export const deleteReaction = (id) => ({
  type: DELETE_REACTION,
  payload: id
});


//thunk
export const loadAllReactionThunk = () => async (dispatch) => {
  const res = await fetch("/api/reactions/");

  if (res.ok) {
    const reactions = await res.json();
    dispatch(loadAllReaction(reactions));
    return reactions;
  }
};


export const loadReactionByIdThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/reactions/${id}`);

  if (res.ok) {
    const reaction = await res.json();
    dispatch(loadReactionById(reaction));
    return reaction;
  }
}

export const addReactionThunk = (newReaction) => async (dispatch) => {

  const res = await fetch("/api/reactions/", {
    method: "POST",
    body: newReaction
  });

  if (res.ok) {
    const reaction = await res.json();
    dispatch(addReaction(reaction));
    return reaction;
  }
};

export const editReactionThunk = (id, updateReaction) => async (dispatch) => {

  const res = await fetch(`/api/reactions/${id}`, {
    method: "PUT",
    body: updateReaction
  });

  if (res.ok) {
    const reaction = await res.json();
    dispatch(editReaction(reaction));
    return reaction;
  }
};

export const deleteReactionThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/reactions/${id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    return dispatch(deleteReaction(id));
  }
};

const initialState = {};

const reactionReducer = (state = initialState, action) => {
  let newState = { ...state }
  switch (action.type) {
    case LOAD_ALL_REACTION:
      action.payload.reactions.forEach((ea) => {
        newState[ea.id] = ea;
      });
      return newState;
    case LOAD_REACTION_BY_ID:
      newState[action.payload.id] = action.payload;
      return newState;
    case ADD_REACTION:
      newState[action.payload.id] = action.payload;
      return newState;
    case EDIT_REACTION:
        newState[action.payload.id] = action.payload;
        return newState;
    case DELETE_REACTION:
      delete newState[action.payload];
      return newState;
    default:
      return newState
  }
};

export default reactionReducer;
