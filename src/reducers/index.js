import {combineReducers} from 'redux'
import {firestoreReducer} from "redux-firestore";
import {firebaseReducer} from "react-redux-firebase";
import authReducer from './authReducer'
import createRoom from "./createRoom";
import createMessageReducer from "./createMessageReducer";

export default combineReducers(({
    firebase: firebaseReducer,
    firestore:firestoreReducer,
    auth:authReducer,
    rooms: createRoom,
    message: createMessageReducer
}))