import { createStore } from "redux";
import mainReducer from "../reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";

export const initialState = {
  tasks: [],
  goals: [],
  routines: [],
  user: [],
  homeCalendarDate: "",
  loggedIn: false,
};

const persistConfig = {
  key: "root",
  storage,
  transforms: [
    encryptTransform({
      secretKey: "hello",
    }),
  ],
};

const persistedReducer = persistReducer(persistConfig, mainReducer);

export const configureStore = createStore(
  persistedReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const persistor = persistStore(configureStore);
