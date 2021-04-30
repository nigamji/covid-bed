import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './redux/reducers'


const initialState = {};
const middleWare = [thunk];
const configMid = composeWithDevTools(applyMiddleware(...middleWare));
const store = createStore(rootReducer, initialState, configMid);

export default store;