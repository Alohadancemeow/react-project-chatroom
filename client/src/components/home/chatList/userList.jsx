import React from 'react'

const UserList = (props) => {

    const { index, username, momentTime } = props
    console.log(index, username, momentTime);

    return (
        <div class="chatlist-items" key={index}>
            <div className="chatlist-item">
                <p className="meta">{username}</p>
                <p className="text">Joined : {momentTime}</p>
            </div>
        </div>
    )
}

export default UserList
