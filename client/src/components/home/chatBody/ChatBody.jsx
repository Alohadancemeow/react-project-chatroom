import React from 'react'
import './chatBody.scss'

import ChatList from '../chatList/ChatList'
import ChatContent from '../chatContent/ChatContent'
import UserProfile from '../userProfile/UserProfile'

const ChatBody = () => {
    return (
        <div className="main-chatbody">
            <ChatList />
            <ChatContent />
            <UserProfile />
        </div>
    )
}

export default ChatBody
