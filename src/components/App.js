import React, {Component} from 'react';
import './css/app.css'
import Sidbar from "./Sidbar";
import Chat from "./Chat";
import {BrowserRouter, Route,} from 'react-router-dom'
import {connect} from 'react-redux'
import Login from "./Login";

class App extends Component {

    state = {
        user: null
    }
    render() {
        console.log(this.props)
        return !this.props.uid ? (
            <Login />
        ) : (
            <div className={'app'}>
                <div className="app-body">
                    <BrowserRouter>
                        <Sidbar/>
                        <Route exact path='/rooms/:roomId' component={() => <Chat />} />
                    </BrowserRouter>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        uid: state.firebase.auth.uid,
        firebase: state.firebase
    }
}

export default connect(mapStateToProps, null) (App);