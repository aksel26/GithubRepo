import { combineReducers } from "redux";

import login from "./login";
import list from "./list";

const reducer = combineReducers({
  login,
  list,
});

export default reducer;
