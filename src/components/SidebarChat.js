import React from 'react'
import './css/sidebarChat.css'
import {Avatar} from "@material-ui/core";


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

        }
    }

    render() {
        return !this.props.addNewChat ?  (
            <div className={'sidebarChat'}>
                <Avatar src={`https://avatars.dicebear.com/api/human/${this.state.seed}.svg`} />
                <div className="sidebarChat-info">
                    <h2>Room name</h2>
                    <p>Last message</p>
                </div>
            </div>
        ) : (
            <div className={'sidebarChat'} onClick={this.createChat}>
                <h2>Add new Chat</h2>
            </div>
        )
    }
}

export default SidebarChat;