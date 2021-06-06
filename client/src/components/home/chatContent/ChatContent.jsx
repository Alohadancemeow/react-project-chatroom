import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import './chatContent.scss'
import { io } from "socket.io-client";
import ReactScrollableFeed from 'react-scrollable-feed'

import ChatItem from './ChatItem'
import ImageItem from './ImageItem';

const ChatContent = () => {

    // # Socket.io v.3 or higher
    const socket = io(
        'https://chatroom-app-backend.herokuapp.com/',
        { withCredentials: true }
    )

    // # Select authReducer
    const { user } = useSelector(state => state.auth)
    const username = user.name

    // # States
    const [state, setState] = useState({
        username: username,
        message: '',
        fileName: ''
    })

    const [userId, setUserId] = useState()
    // console.log(userId);

    const [file, setFile] = useState()

    // # State for socket messages
    const [chatMessage, setChatMessage] = useState([])
    console.log(chatMessage);


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

    // # Selected file
    const selectedFile = (e) => {

        // Get selected image file
        const imageFile = e.target.files[0]
        setFile(imageFile)
        console.log(imageFile);

        setState({
            ...state,
            fileName: imageFile.name
        })
    }


    // # Send Message
    const emitMessage = (e) => {
        e.preventDefault()

        const { username, message } = state


        if (file) {
            const messageObject = {
                username,
                type: "file",
                body: file,
                mimeType: file.type,
                fileName: file.name
            }

            setFile()

            socket.emit('chatMessage', messageObject)

            // Clear fotm input
            setState({
                ...state,
                message: '',
                fileName: ''
            })
        }

        // If message, Emit to server
        if (message) {

            const messageObject = {
                username,
                type: 'text',
                body: message
            }

            socket.emit('chatMessage', messageObject)

            // Clear fotm input
            setState({
                ...state,
                message: '',
                fileName: ''
            })
        }
    }

    useEffect(() => {

        // Get socket id
        socket.on('id', (id) => {
            setUserId(id)
        })

        // emit user
        socket.emit('users', { username })

        // Receive chatMessage from server with moment time
        socket.on('chatMessage', ({ username, message, time }) => {
            const { type, body, mimeType, fileName } = message
            setChatMessage(oldMessage => [
                ...oldMessage,
                { username, type, body, mimeType, fileName, time }
            ])
        })

    }, [])


    // # Render message items
    const renderMessageItems = () => {

        return chatMessage.map((messageItem, index) => {

            // render image
            if (messageItem.type === 'file') {

                const blob = new Blob([messageItem.body], { type: messageItem.type })

                return (
                    <ImageItem
                        index={index}
                        username={messageItem.username}
                        fileName={messageItem.fileName}
                        time={messageItem.time}
                        blob={blob}
                    />
                )
            }

            // reder message
            return (
                <ChatItem
                    index={index}
                    username={messageItem.username}
                    message={messageItem.body}
                    time={messageItem.time}
                />
            )

        })

    }


    return (
        <div className="main-chatcontent">

            {/* //todo: header */}
            <div className="content-header">

                <div className="current-chatting">
                    <h3>WE NEED TO TALK</h3>
                </div>

            </div>

            <div className="center-box">

                {/* //todo: body */}
                <div className="content-body">
                    <div className="chat-items">

                        <ReactScrollableFeed >
                            { //todo: map chat items here
                                renderMessageItems()
                            }
                        </ReactScrollableFeed>

                    </div>
                </div>

                {/* //todo: footer */}
                <div className="content-footer">
                    <div className="send-message">

                        <button className="add-file">
                            <label htmlFor="file">
                                <i className="fa fa-plus"></i>
                            </label>
                            <input
                                id="file"
                                type="file"
                                accept="image/*"
                                onChange={selectedFile}
                            />
                        </button>
                        <input
                            type="text"
                            name="message"
                            value={state.fileName ? state.fileName : state.message}
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
