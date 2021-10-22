import {combineReducers} from 'redux';
import  userReducer  from './UserReducer.js';

const mainReducer = combineReducers({
    'user': userReducer,
})

export default mainReducer