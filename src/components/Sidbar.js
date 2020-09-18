import React from 'react'
import {Avatar, IconButton} from '@material-ui/core'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import './css/sidbar.css'
import {SearchOutlined} from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
import {compose} from "redux";
import {connect} from "react-redux";
import {firestoreConnect} from 'react-redux-firebase'
import * as actions from "../actions";

class Sidbar extends React.Component {

    signout = () => {
        this.props.logout()
    }

    render() {
        console.log(this.props.rooms)
        return(
            <div className={'sidebar'}>
                <div className="sidebar-header">
                    <Avatar src={this.props.emailIMG} />
                    <div className="sidebar-headerRight">
                        <IconButton>
                            <DonutLargeIcon />
                        </IconButton>
                        <IconButton>
                            <ChatIcon/>
                        </IconButton>
                        <IconButton>
                            <MoreVertIcon onClick={this.signout}/>
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
                    {!this.props.rooms ? '': this.props.rooms.map(room => {
                        return <SidebarChat id={room.id} key={room.id} name={room.name} />
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state)
    return {
        uid: state.firebase.auth.uid,
        rooms: state.firestore.ordered.rooms,
        emailIMG: state.firebase.auth.photoURL
    }
}

export default compose(
    connect(mapStateToProps, actions),
    firestoreConnect(props => [
        {collection:'rooms'}
    ])
) (Sidbar);