import { createStore } from "redux";
//
import { sagaMiddleware, rootSaga } from "./sagas"
import reducer from "./reducers";
import middleware from "./middleware";

const store = createStore(reducer, middleware);

sagaMiddleware.run(rootSaga);

export default store;