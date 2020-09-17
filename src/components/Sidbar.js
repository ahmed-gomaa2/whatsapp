import React from 'react'
import {Avatar, IconButton} from '@material-ui/core'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import './css/sidbar.css'
import {SearchOutlined} from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
import db from '../config/firebase'

class Sidbar extends React.Component {
    state = {
        rooms: []
    }

    componentDidMount() {
        db.collection('rooms').onSnapshot(snapshot => {
            this.setState({rooms: snapshot.docs.map(doc => (
                    {
                        id: doc.id,
                        data:doc.data()
                    }
                ))})
        })
    }

    render() {
        return(
            <div className={'sidebar'}>
                <div className="sidebar-header">
                    <Avatar />
                    <div className="sidebar-headerRight">
                        <IconButton>
                            <DonutLargeIcon />
                        </IconButton>
                        <IconButton>
                            <ChatIcon/>
                        </IconButton>
                        <IconButton>
                            <MoreVertIcon/>
                        </IconButton>

                    </div>
                </div>
                <div className="sidebar-search">
                    <div className="sidebar-searchContainer">
                        <SearchOutlined/>
                        <input placeholder={'search or start new chat'} type={'text'}/>
                    </div>
                </div>
                <div className="sidebar-chats">
                    <SidebarChat addNewChat />
                    {this.state.rooms.map(room => {
                        return <SidebarChat id={room.id} key={room.id} name={room.data.name} />
                    })}
                </div>
            </div>
        )
    }
}

export default Sidbar;