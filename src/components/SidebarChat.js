import React from 'react'
import './css/sidebarChat.css'
import {Avatar} from "@material-ui/core";
import firebase from "../config/firebase";
import {Link} from "react-router-dom";
import {connect} from 'react-redux'
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import * as actions from '../actions'


class SidebarChat extends React.Component {
    
    state = {
        seed: '',
        room: '',
        open:false,
        messages:''
    }

    handleClick = () => {
        this.setState({open:!this.state.open})
    }

    componentDidMount() {
        this.setState({seed: Math.floor(Math.random() * 5000)})
        const db = firebase.firestore()
        if(this.props.id) {
            db.collection('rooms')
                .doc(this.props.id)
                .collection('messages')
                .orderBy('timestamp', 'desc')
                .onSnapshot(snapshot => {
                    this.setState({
                        messages: [snapshot.docs.map(doc => {
                            return doc.data()
                        })]
                    })
                })
        }


    }

    handleChange = (e) => {
        this.setState({room: e.target.value})
    }

    addChatRoom = (e) => {
        e.preventDefault()
        this.props.createRoom(this.state.room, this.props.userID)
        console.log(this.state.room)
        this.setState({room:'', open:false})

    }

    renderForm = () => {
        if(!this.state.open) {
            return <div className={'sidebarChat'} onClick={this.handleClick}>
                <h2>Add new Chat</h2>
            </div>
        }else {
            return <form className={'creator-form'} onSubmit={this.addChatRoom}>
                     <input value={this.state.room} type="text" onChange={this.handleChange}/>
                     <button>Add</button>
                  </form>
        }
    }


    render() {
        if (this.state.messages) {
            console.log(this.state)
        }
        return !this.props.addNewChat ?  (
            <Link to={`/rooms/${this.props.id}`} >
                <div className={'sidebarChat'}>
                    <Avatar src={`https://avatars.dicebear.com/api/human/${this.state.seed}.svg`} />
                    <div className="sidebarChat-info">
                        <h2>{this.props.name}</h2>
                        <p>{this.state.messages ? this.state.messages[0][0]?.message : ''}</p>
                    </div>
                </div>
            </Link>

        ) : this.renderForm()

    }
}

const mapStateToProps = state => {
    return {
        userID: state.firebase.auth.uid
    }
}


export default connect(mapStateToProps, actions)(SidebarChat);