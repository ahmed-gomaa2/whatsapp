import React, {useEffect} from 'react'
import './css/chat.css'
import {Avatar, IconButton} from "@material-ui/core";
import {AttachFile, MoreVert, SearchOutlined} from "@material-ui/icons";
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import firebase from '../config/firebase'
import {useParams} from 'react-router-dom'
import {connect} from 'react-redux'
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import * as actions from '../actions'

const Chat = (props) => {
    const [seed, setSeed] = React.useState('')
    const [message, setMessage] = React.useState('')
    const [messages, setMessages] = React.useState([])
    const [roomName, setRoomName] = React.useState('')
    const {roomId} = useParams()


    useEffect(() =>{
        if(roomId) {
            const db = firebase.firestore()
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
                setRoomName( snapshot.data().name)
            })
            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp','asc').onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => doc.data()))
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
        props.createMessage(message, props.userID, props.userName, roomId)
        setMessage('')
    }

    return (
        <div className="chat">
            <div className="chat-header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat-headerInfo">
                    <h3>{roomName}</h3>
                    <p>{
                        new Date(
                            messages[messages.length - 1]?.
                                timestamp?.toDate()
                        ).toUTCString()
                    }</p>
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
                {!messages ? '' : messages.map((message) => {
                    console.log(message)
                    return <p className={`chat-message ${message.userID === props.userID ? 'chat-reciever' : ''}`}>
                        <span className="chat-name">{message.name}</span>
                        {message.message}
                        <span className="chat-timestamp">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>
                })}

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

const mapStateToProps = state => {
    console.log(state)
    return {
        userID: state.firebase.auth.uid,
        userName: state.firebase.auth.displayName,
        rooms:state.firestore.ordered.rooms
    }
}

export default compose(
    connect(mapStateToProps, actions),

    firestoreConnect(props => [
        {
            collection:'rooms',
        }
    ])

)( Chat)