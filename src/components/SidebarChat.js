import React from 'react'
import './css/sidebarChat.css'
import {Avatar} from "@material-ui/core";
import db from "../config/firebase";
import {Link} from "react-router-dom";


class SidebarChat extends React.Component {
    
    state = {
        seed: ''
    }
    
    componentDidMount() {
        this.setState({seed: Math.floor(Math.random() * 5000)})
    }

    createChat = () => {
        const roomName = prompt('Please enter name for chat!')
        if(roomName) {
            db.collection('rooms').add({
                name:roomName
            })
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

        ) : (
            <div className={'sidebarChat'} onClick={this.createChat}>
                <h2>Add new Chat</h2>
            </div>
        )
    }
}

export default SidebarChat;