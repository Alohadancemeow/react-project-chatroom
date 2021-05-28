import React from 'react'

import { Avatar } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LockOpenIcon from '@material-ui/icons/LockOpen'


export const SideBox = (props) => {
  
    const { current, containerRef, onClick } = props

  return (
    <div
      className="right-side"
      ref={containerRef}
      onClick={onClick}
    >
      <div className="inner-container">
        <div className="text">
          <Avatar style={{ margin: "0 auto", backgroundColor: "yellowgreen" }}>
            {
              current === 'Login'
                ? <LockOpenIcon />
                : <LockOutlinedIcon />
            }
          </Avatar>
          <h3> {current}</h3>
          
            <h6>
              {
                current === 'Login'
                ? 'Wellcome back'
                : 'Create Account'
              }
            </h6>
          
        </div>
      </div>
    </div>
  )
}
