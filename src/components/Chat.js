import React, {useEffect} from 'react'
import './css/chat.css'
import {Avatar, IconButton} from "@material-ui/core";
import {AttachFile, MoreVert, SearchOutlined} from "@material-ui/icons";
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import db from '../config/firebase'
import {useParams} from 'react-router-dom'

const Chat = (props) => {
    const [seed, setSeed] = React.useState('')
    const [message, setMessage] = React.useState('')
    const [roomName, setRoomName] = React.useState('')
    const {roomId} = useParams()


    useEffect(() =>{
        if(roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
                setRoomName( snapshot.data().name)
            })
        }
    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    },[])



    const handleInputChange = (e) => {
        setMessage(e.target.value)
    }

    const sendMessage = (e) => {
        e.preventDefault()
        console.log('You typed ', this.state.message)
        setMessage('')
    }

    return (
        <div className="chat">
            <div className="chat-header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat-headerInfo">
                    <h3>{roomName}</h3>
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
                <form onSubmit={sendMessage} action="">
                    <input value={message} onChange={handleInputChange} type="text"/>
                    <button  type={'submit'}>Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat