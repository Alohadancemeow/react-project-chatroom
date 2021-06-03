import React from 'react'
import './chatItem.scss'

const ChatItem = (props) => {

    const { index, username, message, time } = props
    console.log(index, username, message, time);

    return (
        <div key={index} class="chat-messages" id="chat-messsage">
            <div  className="message">
                <p className="meta">
                    {username}
                    <span>{time}</span>
                </p>
                <p className="text">{`Say: ${message}`}</p>
            </div>
        </div>
    )
}

export default ChatItem
