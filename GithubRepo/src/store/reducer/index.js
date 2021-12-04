export const initialState = {
  isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
  user: JSON.parse(localStorage.getItem("user")) || null,
  client_id: process.env.REACT_APP_CLIENT_ID,
  redirect_uri: process.env.REACT_APP_REDIRECT_URI,
  client_secret: process.env.REACT_APP_CLIENT_SECRET,
  proxy_url: process.env.REACT_APP_PROXY_URL,
  data: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      localStorage.setItem(
        "isLoggedIn",
        JSON.stringify(action.payload.isLoggedIn)
      );
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        user: action.payload.user,
      };
    }
    case "LOGOUT": {
      localStorage.clear();
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    }
    case "ADD": {
      const addData = state.data;
      const newState = [...addData, action.payload];
      state.data = newState;
      return {
        ...state,
      };
    }

    case "DELETE": {
      const target = action.payload;
      const dataCopy = state.data.filter((v) => v.storeId !== Number(target));

      state.data = dataCopy;

      return {
        ...state,
      };
    }

    case "DELETE_ALL": {
      state.data = [];
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};
