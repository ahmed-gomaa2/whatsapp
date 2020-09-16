import React from 'react'
import './css/chat.css'
import {Avatar, IconButton} from "@material-ui/core";
import {AttachFile, MoreVert, SearchOutlined} from "@material-ui/icons";
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'

class Chat extends React.Component {
    state = {
        seed: '',
        message: ''
    }
    componentDidMount() {
        this.setState({seed: Math.floor(Math.random() * 5000)})
    }

    handleInputChange = (e) => {
        this.setState({message: e.target.value})
    }

    sendMessage = (e) => {
        e.preventDefault()
        console.log('You typed ', this.state.message)
        this.setState({message: ''})
    }

    render() {
        return (
            <div className="chat">
                <div className="chat-header">
                    <Avatar src={`https://avatars.dicebear.com/api/human/${this.state.seed}.svg`} />
                    <div className="chat-headerInfo">
                        <h3>Room name</h3>
                        <p>Last seen at ....</p>
                    </div>
                    <div className="chat-headerRight">
                        <IconButton>
                            <SearchOutlined/>
                        </IconButton>
                        <IconButton>
                            <AttachFile />
                        </IconButton>
                        <IconButton>
                            <MoreVert />
                        </IconButton>
                    </div>
                </div>

                <div className="chat-body">
                    <p className={`chat-message ${true ? 'chat-reciever' : ''}`}>
                        <span className="chat-name">Ahmed Gomaa</span>
                        Hello from the other side
                        <span className="chat-timestamp">3:66pm</span>
                    </p>
                </div>

                <div className="chat-footer">
                    <InsertEmoticonIcon />
                    <form onSubmit={this.sendMessage} action="">
                        <input value={this.state.message} onChange={this.handleInputChange} type="text"/>
                        <button  type={'submit'}>Send a message</button>
                    </form>
                    <MicIcon />
                </div>
            </div>
        )
    }
}

export default Chat