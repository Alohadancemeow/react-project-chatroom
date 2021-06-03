import React, { useState, useEffect } from 'react'
import './chatList.scss'
import { io } from "socket.io-client";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useDispatch } from 'react-redux'
import { signout } from '../../../redux/actions/authAction'

import UserList from './userList'

const ChatList = () => {

    const dispatch = useDispatch()

    // # Socket.io v.3 or higher
    const socket = io(
        'http://localhost:5000',
        { withCredentials: true }
    )

    const [user, setUser] = useState([])

    useEffect(() => {

        socket.on('users', ({ name, momentTime }) => {
            setUser([
                ...user,
                { name, momentTime }
            ])
        })
    }, [])

    console.log(user);


    // # Handle leave btn
    const handleLeave = () => {
        dispatch(signout())
    }


    return (
        <div className="main-chatlist">

            {/* //todo: add button */}
            <button
                className="leave-btn"
                onClick={handleLeave}
            >
                <i><ExitToAppIcon /></i>
                <span>Leave ChatRoom</span>
            </button>

            {/* //todo: header */}
            <div className="chatlist-heading">
                <h2>Who's in here?</h2>
            </div>

            <div className="userlist">

                { //todo: map joined users
                    user.map(({ name, momentTime }, index) => (
                        <UserList
                            index={index}
                            username={name}
                            momentTime={momentTime}
                        />
                    ))
                }

            </div>

        </div>
    )
}

export default ChatList
