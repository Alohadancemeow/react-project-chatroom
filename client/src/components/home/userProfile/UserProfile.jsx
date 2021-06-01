import React from 'react'
import './userProfile.scss'

const UserProfile = () => {
    return (
        <div className="main-profile">
            <div className="profile-card">
                <div className="profile-image">
                    <img src="" alt="profile" />
                </div>
                <h4>3rd rabbit</h4>
                <p>CEO & Founder at Highly Inc</p>
            </div>
            <div className="profile-card">
                <div className="card-header">
                    <h4>Inforamtion</h4>
                    <i className="fa fa-angle-down"></i>
                </div>
                <div className="card-content">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, sint.
                </div>
            </div>
        </div>
    )
}

export default UserProfile