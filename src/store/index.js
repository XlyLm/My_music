import {createStore,applyMiddleware,compose} from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

// 浏览器插件用于处理store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// 使用中间件,可以接收多个中间件
const applyThunkMiddleware = applyMiddleware(thunk);

/**
 *  createStore创建store
 *  参数一：reducer
 *  参数二：加强函数，一般用于处理中间件和插件
 */
const store = createStore(reducers, composeEnhancers(applyThunkMiddleware));

export default store;