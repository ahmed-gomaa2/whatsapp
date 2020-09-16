import React from 'react'
import {Avatar, IconButton} from '@material-ui/core'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import './css/sidbar.css'
import {SearchOutlined} from "@material-ui/icons";
import SidebarChat from "./SidebarChat";

class Sidbar extends React.Component {
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
                    <SidebarChat addNewChat/>
                </div>
            </div>
        )
    }
}

export default Sidbar;