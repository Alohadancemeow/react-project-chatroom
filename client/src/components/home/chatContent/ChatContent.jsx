import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import './chatContent.scss'
import { io } from "socket.io-client";
import ReactScrollableFeed from 'react-scrollable-feed'

import ChatItem from './ChatItem'

const ChatContent = () => {

    // # Socket.io v.3 or higher
    const socket = io(
        'http://localhost:5000',
        { withCredentials: true }
    )

    // # Select authReducer
    const { user } = useSelector(state => state.auth)
    const username = user.name

    // # States
    const [state, setState] = useState({
        username: username,
        message: ''
    })

    // # State for socket messages
    const [wellcomeMessage, setWellcomeMessage] = useState([])
    console.log(wellcomeMessage);
    const [joinMessage, setJoinMessage] = useState([])
    const [chatMessage, setChatMessage] = useState([])
    console.log(chatMessage);
    const [leaveMessage, setLeaveMessage] = useState([])


    // # Handle OnChange
    const handleOnChange = (e) => {

        // Get text from input
        const message = e.target.value

        setState({
            ...state,
            username,
            message,
        })
    }

    // console.log(chatMessage);

    // # Send Message
    const emitMessage = (e) => {
        e.preventDefault()

        const { username, message } = state

        // Emit to server
        if (message) {

            socket.emit('chatMessage', {
                username,
                message,
            })
        }

        // Clear fotm input
        setState({
            ...state,
            message: ''
        })

    }

    useEffect(() => {

        // emit user
        socket.emit('users', username)

        // Receive joinMessage from server with moment time
        socket.on('wellcomeMessage', ({ username, message, time }) => {
            setWellcomeMessage([
                ...wellcomeMessage,
                { username, message, time }
            ])
        })

        // Receive chatMessage from server with moment time
        socket.on('chatMessage', ({ username, message, time }) => {
            setChatMessage(oldMessage => [
                ...oldMessage,
                { username, message, time }
            ])
        })


    }, [])



    return (
        <div className="main-chatcontent">

            {/* //todo: header */}
            <div className="content-header">
                <div className="blocks">
                    <div className="current-chatting">
                        <h2>We need to talk</h2>
                    </div>
                </div>
                <div className="blocks">
                    <div className="settings">
                        <button className="btn-nobg">
                            <i className="fa fa-cog"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div className="center-box">

                {/* //todo: body */}
                <div className="content-body">
                    <div className="chat-items">

                        <ReactScrollableFeed >
                            { //todo: map chat items here
                                chatMessage.map(({ username, message, time }, index) => (
                                    <ChatItem
                                        index={index}
                                        username={username}
                                        message={message}
                                        time={time}
                                    />
                                ))
                            }
                        </ReactScrollableFeed>

                    </div>
                </div>

                {/* //todo: footer */}
                <div className="content-footer">
                    <div className="send-message">
                        <button className="add-file">
                            <i className="fa fa-plus"></i>
                        </button>
                        <input
                            type="text"
                            name="message"
                            value={state.message}
                            placeholder="Type a message here"
                            onChange={handleOnChange}
                        />
                        <button
                            className="send-btn"
                            id="send-btn"
                            onClick={emitMessage}
                        >
                            <i className="fa fa-paper-plane"></i>
                        </button>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default ChatContent
