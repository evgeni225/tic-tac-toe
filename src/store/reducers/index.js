import { combineReducers } from "redux";
import { gameReducer } from "./game";
import { userReducer } from "./user";

export const rootReducer = combineReducers({
    user: userReducer,
    game: gameReducer
})