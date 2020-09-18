import React from 'react'
import './css/sidebarChat.css'
import {Avatar} from "@material-ui/core";
import db from "../config/firebase";
import {Link} from "react-router-dom";
import {connect} from 'react-redux'
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import * as actions from '../actions'


class SidebarChat extends React.Component {
    
    state = {
        seed: '',
        room: '',
        open:false
    }

    handleClick = () => {
        this.setState({open:!this.state.open})
    }


    componentDidMount() {
        this.setState({seed: Math.floor(Math.random() * 5000)})
    }

    handleChange = (e) => {
        this.setState({room: e.target.value})
    }

    addChatRoom = (e) => {
        e.preventDefault()
        this.props.createRoom(this.state.room)
        console.log(this.state.room)
        this.setState({room:''})
    }

    renderForm = () => {
        if(!this.state.open) {
            return <div className={'sidebarChat'} onClick={this.handleClick}>
                <h2>Add new Chat</h2>
            </div>
        }else {
            return <form onSubmit={this.addChatRoom}>
                     <input value={this.state.room} type="text" onChange={this.handleChange}/>
                     <button>Add Room</button>
                  </form>
        }
    }


    render() {
        return !this.props.addNewChat ?  (
            <Link to={`/rooms/${this.props.id}`} >
                <div className={'sidebarChat'}>
                    <Avatar src={`https://avatars.dicebear.com/api/human/${this.state.seed}.svg`} />
                    <div className="sidebarChat-info">
                        <h2>{this.props.name}</h2>
                        <p>Last message</p>
                    </div>
                </div>
            </Link>

        ) : this.renderForm()

    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         createRoom: () => dispatch(actions.createRoom())
//     }
// }

export default connect(null, actions)(SidebarChat);