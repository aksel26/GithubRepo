import { LOGIN, LOGOUT } from "../actions";

export const initialState = {
  isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
  user: JSON.parse(localStorage.getItem("user")) || null,
  client_id: process.env.REACT_APP_CLIENT_ID || "",
  redirect_uri: process.env.REACT_APP_REDIRECT_URI || "",
  client_secret: process.env.REACT_APP_CLIENT_SECRET || "",
  proxy_url: process.env.REACT_APP_PROXY_URL || "",
};

export default function login(state = initialState, action) {
  if (action.type === LOGIN) {
    localStorage.setItem(
      "isLoggedIn",
      JSON.stringify(action.payload.isLoggedIn)
    );
    localStorage.setItem("user", JSON.stringify(action.payload.data));
    return {
      ...state,
      isLoggedIn: action.payload.isLoggedIn,
      user: action.payload.data,
    };
  }

  if (action.type === LOGOUT) {
    localStorage.clear();
    return {
      ...state,
      isLoggedIn: false,
      user: null,
    };
  }

  return state;
}
