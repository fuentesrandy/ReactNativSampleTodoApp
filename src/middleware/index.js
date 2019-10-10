
//
import { applyMiddleware } from "redux";

//
import { sagaMiddleware } from '../sagas';
import logger from "./logger";

// order matters
let middleware = [sagaMiddleware];
if (process.env.NODE_ENV !== "production") {
    middleware.push(logger);
}

export default applyMiddleware(...middleware);
