import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBAoccog7gX_XrTJKCdhPKzCMOEQHIcWvU",
    authDomain: "whatsapp-54ff5.firebaseapp.com",
    databaseURL: "https://whatsapp-54ff5.firebaseio.com",
    projectId: "whatsapp-54ff5",
    storageBucket: "whatsapp-54ff5.appspot.com",
    messagingSenderId: "42088485672",
    appId: "1:42088485672:web:02228d90d64e9149d4361d",
    measurementId: "G-S9Z9KM6FH4"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()

export {provider}

export default firebase;