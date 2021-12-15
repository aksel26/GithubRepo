import { createStore } from "redux";
import githubRep from "./reducers/reducer";

const store = createStore(githubRep);

export default store;
