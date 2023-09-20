import { applyMiddleware } from "redux";
import { combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { CarouselReducer } from "./reducer/CarouselReducer/CarouselReducer";
import { ManangerFilmReducer } from "./reducer/ManagerFilmReducer.js/ManagerFilmReducer";
import { ManagerCinema } from "./reducer/ManagerCinema/ManagerCinema";
const rootReducer = combineReducers({
  // State ung dung
  CarouselReducer: CarouselReducer,
  ManangerFilmReducer: ManangerFilmReducer,
  ManagerCinema: ManagerCinema,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
