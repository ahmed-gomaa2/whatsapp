import {provider} from "../config/firebase";

export const login = () => (dispatch,getState,  {getFirebase}) => {
    const firebase = getFirebase()
    firebase.auth().signInWithPopup(provider).then((result) => {
        dispatch({
            type:'LOGIN_USER',
            payload:result
        })
    }).catch(err => {
        dispatch({
            type:'LOGIN_USER_ERR',
            payload:err
        })
    })
}

export const createRoom = (room) => (dispatch, getState, {getFirebase}) => {
    const firestore = getFirebase().firestore()

    firestore.collection('rooms').add({
        name:room
    }).then(()=> {
        dispatch({
            type:'CREATE_ROOM',
            payload:room
        })
    }).catch(err => {
        dispatch({
            type:'CREATE_ROOM_ERR',
            payload:err
        })
    })
}