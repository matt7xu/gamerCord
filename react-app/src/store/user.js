const LOAD_USER_BY_ID = "albums/loadSpotById";
const UPDATE_VIP = "users/UPDATE_VIP"

const loadUserById = (user) => ({
  type: LOAD_USER_BY_ID,
  payload: user
});

const updateUserVIP = (user) => ({
	type: UPDATE_VIP,
  payload: user
});

export const loadUserByIdThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/users/${id}`);

  if (res.ok) {
    const current_user = await res.json();
    dispatch(loadUserById(current_user));
    return current_user;
  }
}

export const updateUserVIPThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: {}
  });

  if (res.ok) {
    const current_user = await res.json();
    dispatch(updateUserVIP(current_user));
    return current_user;
  }
};

const initialState = {};

export default function userReducer(state = initialState, action) {
  let newState = { ...state }
	switch (action.type) {
    case LOAD_USER_BY_ID:
      newState[action.payload.id] = action.payload;
      return newState;
		case UPDATE_VIP:
			newState[action.payload.id] = action.payload;
      return newState
		default:
			return state;
	}
}
