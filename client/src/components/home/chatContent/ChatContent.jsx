import React from 'react'
import './chatContent.scss'
import ChatItem from './ChatItem'

const ChatContent = () => {

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
                            placeholder="Type a message here"
                            value=""
                            onChange={() => { }}
                        />
                        <button className="send-btn" id="send-btn">
                            <i className="fa fa-paper-plane"></i>
                        </button>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default ChatContent
