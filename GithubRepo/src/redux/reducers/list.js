import { DELETE, DELETE_ALL, PLUS } from "../actions";

const initialState = {
  data: [],
};

export default function list(state = initialState, action) {
  if (action.type === PLUS) {
    const addData = state.data;
    const newState = [...addData, action.payload];
    state.data = newState;
    return {
      ...state,
    };
  }

  if (action.type === DELETE) {
    const target = action.payload;
    const dataCopy = state.data.filter((v) => v.id !== Number(target));

    state.data = dataCopy;

    return {
      ...state,
    };
  }

  if (action.type === DELETE_ALL) {
    state.data = [];
    return {
      ...state,
    };
  }

  return state;
}
