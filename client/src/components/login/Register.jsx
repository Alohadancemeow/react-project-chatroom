import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../redux/actions/authAction'
import { clearErrors } from '../../redux/actions/errorAction'


export const Register = (props) => {

    // # Recieve props from App
    const { containerRef } = props

    // # Set hooks
    const dispatch = useDispatch()

    // # State
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        errMessage: null
    })

    // # Select Reducers
    const error = useSelector(state => state.error)
    // console.log(error);
    const auth = useSelector(state => state.auth)
    // console.log(auth);


    useEffect(() => {

        // Check for register error
        if (error.id === "REGISTER_FAIL") {
            return setUser({
                ...user,
                errMessage: error.msg.message
            })
        }

        // else
        setUser({ ...user, errMessage: null })

    }, [error])


    // # HandleChange
    const handleChange = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    // # HandleSubmit
    const handleSubmit = (e) => {
        e.preventDefault()

        //todo: register user
        const { name, email, password } = user

        // Create user
        const newUser = {
            name,
            email,
            password
        }
        console.log(newUser);

        // Send to register
        dispatch(register(newUser))

    }


    return (
        <div className="base-container" ref={containerRef}>

            <div className="header">
                Register
            </div>

            <div className="content">
                <div className="image">
                    <img src="/login.svg" alt="logo" />
                </div>
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="username"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="email"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="password"
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>

            <div className="footer">
                <button
                    type="button"
                    className="btn"
                    onClick={handleSubmit}
                >
                    Register
                </button>
            </div>
        </div>
    )
}

