import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import './chatContent.scss'
import { io } from "socket.io-client";

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
        username: '',
        message: ''
    })

    const [chatMessage, setChatMessage] = useState([])
    // console.log(chatMessage);


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

    console.log(chatMessage);

    // # Send Message
    const sendMessage = (e) => {
        e.preventDefault()

        const { username, message } = state

        // Emit to server
        socket.emit('chatMessage', { username, message })

        // Clear fotm input
        setState({
            ...state,
            message: ''
        })

    }

    useEffect(() => {

        // Receive message from server
        socket.on('chatMessage', ({ username, message }) => {
            setChatMessage(oldMessage => [
                ...oldMessage,
                { username, message }
            ])
        })

    }, [])

    // # Render chatMessage
    // const renderChatMessage = () => {
    //     return (
    //         chatMessage.map(({ username, message }, index) => (
    //             <div key={index} class="chat-messages">
    //                 <div className="message">
    //                     <p className="meta">
    //                         {username}
    //                         <span>9:12pm</span>
    //                     </p>
    //                     <p className="text">{message}</p>
    //                 </div>
    //             </div>
    //         ))
    //     )
    // }


    return (
        <div className="main-chatcontent">

            {/* //todo: header */}
            <div className="content-header">
                <div className="blocks">
                    <div className="current-chatting">
                        {/* <p>Room name</p> */}
                        <h2>Room name</h2>
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

                        {/* //todo: map chat items here */}
                        {/* {renderChatMessage()} */}

                        {
                            chatMessage.map(({ username, message }, index) => (
                                <ChatItem
                                    index={index}
                                    username={username}
                                    message={message}
                                />
                            ))
                        }


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
                            onClick={sendMessage}
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
