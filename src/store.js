import { createStore } from "redux";
import listReducer from "./reducers/listReducer";
import { combineReducers } from "redux";

const reducers = combineReducers({
  taskList: listReducer
});

export const store = createStore(reducers);
