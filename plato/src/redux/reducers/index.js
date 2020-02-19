import { combineReducers } from "redux";
// import visibilityFilter from "./visibilityFilter";
import highlighting from "./highlighting";
import userLabeling from "./userLabeling";

export default combineReducers({ highlighting, userLabeling });
