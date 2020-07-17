import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reduces from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';


const store = createStore(
    reduces
);




export default store;