import React from 'react'
import ReactDom from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import Thunk from 'redux-thunk'
import {getFirebase, ReactReduxFirebaseProvider} from "react-redux-firebase";
import {createFirestoreInstance} from 'redux-firestore'
import App from './components/App'
import reducers from './reducers'
import firebase from './config/firebase'


const store = createStore(reducers, applyMiddleware(Thunk.withExtraArgument({getFirebase})))

const rrfProps = {
    firebase,
    config: {},
    dispatch: store.dispatch,
    createFirestoreInstance
}

ReactDom.render(
    <Provider store={store} >
        <ReactReduxFirebaseProvider  {...rrfProps} >
            <App/>
        </ReactReduxFirebaseProvider>
    </Provider>,
    document.querySelector('#root')
)