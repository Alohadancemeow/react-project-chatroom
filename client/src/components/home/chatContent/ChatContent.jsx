import React, { useState } from 'react'
import './chatContent.scss'
import ChatItem from './ChatItem'

import { outputMessage, emitMessage } from '../socket'

const ChatContent = () => {

    const txt = outputMessage()
    console.log(txt);

    // # State
    const [message, setMessage] = useState('')

    // # Handle OnChange
    const handleOnChange = (e) => {
        const text = e.target.value
        // [e.target.name] = e.target.value
        console.log(text);

        setMessage(text)
    }

    // # Send Message
    const sendMessage = (e) => {
        e.preventDefault()

        console.log(message);

        // send message to server
        emitMessage(message)

        // clear state
        setMessage('')

    }


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
                        <ChatItem />

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
                            value={message}
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
