import React from 'react'
import ChatBody from './chatBody/ChatBody'
import './home.scss'

import Nav from './nav/Nav'

const HomePage = () => {
    return (
        <div className="main">
            <Nav />
            <ChatBody />
        </div>
    )
}

export default HomePage
