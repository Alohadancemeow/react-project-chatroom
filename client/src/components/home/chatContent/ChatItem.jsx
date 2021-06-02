import React from 'react'
import './chatItem.scss'

const ChatItem = () => {



    return (
        <div class="chat-messages">
            <div className="message">
                <p className="meta">Bred <span>9:12pm</span></p>
                <p className="text">Lorem ipsum dolor sit amet.</p>
            </div>
            <div className="message">
                <p className="meta">Mary <span>9:12pm</span></p>
                <p className="text">Lorem ipsum dolor sit amet.</p>
            </div>
           
        
        </div>
    )
}

export default ChatItem
