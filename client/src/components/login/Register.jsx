import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../redux/actions/authAction'

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
        errMessage: null,
        successMessage: 'register successfully'
    })

    // # Select Reducers
    const error = useSelector(state => state.error)
    // console.log(error);
    const auth = useSelector(state => state.auth)
    // console.log(auth);


    // # Register error effect
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

        // Show snackbar
        handleClick()

    }


    // # Snackbar section
    const [snackbar, setSnackbar] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center'
    });

    const { vertical, horizontal, open } = snackbar

    const handleClick = () => {
        setSnackbar({
            ...snackbar,
            open: true
        });
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbar({
            ...snackbar,
            open: false
        });
    };



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

            {/* //todo: Snackbar */}
            <Snackbar
                key={vertical + horizontal}
                open={open}
                autoHideDuration={6000}
                anchorOrigin={{ vertical, horizontal }}
                onClose={handleClose}
            >
                {
                    user.errMessage
                        ? (
                            <Alert
                                onClose={handleClose}
                                severity="error"
                            >
                                {user.errMessage}

                            </Alert>
                        )
                        : (
                            <Alert
                                onClose={handleClose}
                                severity="success"
                            >
                                {user.successMessage}

                            </Alert>
                        )
                }

            </Snackbar>

        </div>
    )
}

