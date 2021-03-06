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

export const logout = () => (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase()

    firebase.auth().signOut().then(() => {
        dispatch({type:'SIGN_OUT'})
    })
}

export const createRoom = (room, userID) => (dispatch, getState, {getFirebase}) => {
    const firestore = getFirebase().firestore()

    firestore.collection('rooms').add({
        name:room,
        userId: userID
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

export const createMessage = (message, userID,userName, room) => (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase()
    const firestore = firebase.firestore()

    firestore.collection('rooms').doc(room).collection('messages').add({
        message:message,
        userID:userID,
        name:userName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        dispatch({
            type: 'ADD_MESSAGE',
            payload:message
        })
    })
}