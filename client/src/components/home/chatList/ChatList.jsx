import React from 'react'
import './chatList.scss'

const ChatList = () => {
    return (
        <div className="main-chatlist">

            {/* //todo: add button */}
            <button className="add-btn">
                <i className="fa fa-plus"></i>
                <span>New conversation</span>
            </button>

            {/* //todo: header */}
            <div className="chatlist-heading">
                <h2>Chat Room</h2>
                <button className="btn-nobg">
                    <i className="fa fa-ellipsis-h"></i>
                </button>
            </div>

            <ul>
                <li>item1</li>
                <li>item2</li>
                <li>item3</li>
            </ul>


            {/* //todo: search */}
            <div className="chatlist-search">
                <div className="search-wrap">
                    <input type="text" placeholder="Search here" />
                    <button className="search-btn">
                        <i className="fa fa-search"></i>
                    </button>
                </div>
            </div>

            {/* //todo: chat item */}
            <div className="chatlist-items">

                {/* //todo: map items} */}
                <ul>
                    <li>item1</li>
                    <li>item2</li>
                    <li>item3</li>
                    <li>item4</li>
                    <li>item5</li>
                    <li>item6</li>
                </ul>

            </div>

        </div>
    )
}

export default ChatList
