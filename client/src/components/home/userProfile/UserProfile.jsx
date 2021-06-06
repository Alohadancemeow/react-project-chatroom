import React, { useState, useEffect } from 'react'
import './userProfile.scss'

import { io } from "socket.io-client";
import ReactScrollableFeed from 'react-scrollable-feed'


const UserProfile = () => {

    // # Socket.io v.3 or higher
    const socket = io(
        'https://chatroom-app-backend.herokuapp.com/',
        { withCredentials: true }
    )

    const [notifyMessage, setNotifyMessage] = useState([])


    useEffect(() => {

        // Receive joinMessage from server with moment time
        socket.on('notifyMessage', ({ username, message, time }) => {
            setNotifyMessage((oldMessage) => [
                ...oldMessage,
                { username, message, time }
            ])
        })

    }, [])

    console.log(notifyMessage);


    return (
        <div className="main-profile">

            {/* //todo: profile */}
            <div className="profile-card">
                <div className="profile-image">
                    <img src="/image3.jpg" alt="profile" />
                </div>
                <h4>3rd rabbit Bot</h4>
                <p>
                    <strong>Status : </strong>
                    unstable
                </p>
            </div>

            {/* //todo: notify */}
            <div className="notify-content">
                <div className="card-header">
                    <h4>Notification</h4>
                </div>
                <div class="notify-items" >

                    {/* //todo: map notify-item */}
                    <ReactScrollableFeed >
                        {
                            notifyMessage.map(({ username, message, time }, index) => (

                                <div className="notify-item" key={index}>
                                    <p className="meta">{username}</p>
                                    <p className="text">
                                        <span>{time}</span>
                                        {` : ${message}`}
                                    </p>
                                </div>
                            ))
                        }
                    </ReactScrollableFeed>

                </div>


            </div>
        </div>
    )
}

export default UserProfile