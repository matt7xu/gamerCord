// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const UPDATE_VIP = "users/UPDATE_VIP";
const LOAD_USER_BY_ID = "albums/loadSpotById";
const USER_JOIN_SERVER = "servers/userJoinServer";
const USER_QUIT_SERVER = "servers/userQuitServer";
const LOAD_ALL_USER = "users/all"

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const updateUserVIP = (user) => ({
	type: UPDATE_VIP,
	payload: user
});

const loadUserById = (user) => ({
	type: LOAD_USER_BY_ID,
	payload: user
});

export const userJoinServer = (server) => ({
	type: USER_JOIN_SERVER,
	payload: server
});

export const userQuitServer = (serverId, userId) => ({
	type: USER_QUIT_SERVER,
	payload: [userId, serverId]
});

export const loadAllUser = (users) => ({
	type: LOAD_ALL_USER,
	payload: users
});

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (username, email, password, image) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username,
			email,
			password,
			image
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

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

export const loadAllUserThunk = () => async (dispatch) => {
	const res = await fetch(`/api/users/all`);

	if (res.ok) {
		const users = await res.json();
		dispatch(loadAllUser(users));
		return users;
	}
}

export const loadUserByIdThunk = (id) => async (dispatch) => {
	const res = await fetch(`/api/users/${id}`);

	if (res.ok) {
		const current_user = await res.json();
		dispatch(loadUserById(current_user));
		return current_user;
	}
}

export const userJoinServerThunk = (serverId, userId) => async (dispatch) => {
	const res = await fetch(`/api/servers/${serverId}/user/${userId}`,
		{
			method: "POST",
			body: {}
		});

	if (res.ok) {
		const ret = await res.json();
		dispatch(userJoinServer(ret));
		return ret;
	}
};

export const userQuitServerThunk = (serverId, userId) => async (dispatch) => {
	const res = await fetch(`/api/servers/${serverId}/user/${userId}`, {
		method: "DELETE"
	});

	if (res.ok) {
		dispatch(userQuitServer(serverId, userId));
	}
};

const helperFunDelete = (state, action, userId, serverId) => {
	let servers = state.user.servers
	let currentId = 0;
	for (let i = 0; i < servers.length; i++) {
		if (servers[i].id == serverId) {
			currentId = i;
			break;
		}
	}
	delete state.user.servers[currentId.toString()]
	return state
}

export default function reducer(state = initialState, action) {
	let newState = { ...state }
	switch (action.type) {
		case LOAD_ALL_USER:
			action.payload.users.forEach((ea) => {
				newState[ea.id] = ea;
			});
			return newState;
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		case UPDATE_VIP:
			newState['user']['vip'] = !newState['user']['vip'];
			return newState;
		case LOAD_USER_BY_ID:
			newState['user'] = action.payload;
			return newState;
		case USER_JOIN_SERVER:
			return { user: action.payload };
		case USER_QUIT_SERVER:
			return helperFunDelete(newState, action, action.payload[0], action.payload[1])
		default:
			return state;
	}
}
