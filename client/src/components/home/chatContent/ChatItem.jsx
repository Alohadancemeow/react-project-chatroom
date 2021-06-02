import React from 'react'
import './chatItem.scss'

const ChatItem = (props) => {

    const { index, username, message } = props
    console.log(index, username, message);

    return (
        <div key={index} class="chat-messages">
            <div  className="message">
                <p className="meta">
                    {username}
                    <span>9:12pm</span>
                </p>
                <p className="text">{message}</p>
            </div>
        </div>
    )
}

export default ChatItem
