import React from 'react';
import './css/login.css'
import {Button} from "@material-ui/core";
import {connect} from 'react-redux'
import {compose} from "redux";
import * as actions from '../actions'
import {firestoreConnect} from "react-redux-firebase";
import logo from './images/WhatsApp_Logo_1.png'

const Login = (props) => {
    const singIn = () => {
       props.login()
    }
    return (
        <div className={'login'}>
            <div className="login-container">
                <img src={logo} alt=''/>
                <div className="login-text">
                    <h1>Sign in to WhatsApp</h1>
                </div>

                <Button type={'submit'} onClick={singIn}>
                    Sign In With Google
                </Button>
            </div>
        </div>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        login: () => dispatch(actions.login())
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        uid: state.auth
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props => [
        {
            collection:'rooms'
        }
    ])
) (Login);