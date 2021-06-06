import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signin } from '../../redux/actions/authAction'

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export const Login = (props) => {

    // # Recieve props from app
    const { containerRef } = props

    // # Set hook
    const dispatch = useDispatch()

    // # State
    const [user, setUser] = useState({
        email: '',
        password: '',
        errMessage: null,
        successMessage: 'login successfully'
    })


    // # Select Reducers
    const error = useSelector(state => state.error)
    // console.log(error);
    const auth = useSelector(state => state.auth)
    // console.log(auth);


    // # Login error effect
    useEffect(() => {

        // Check for login error
        if (error.id === "LOGIN_FAIL") {
            return setUser({
                ...user,
                errMessage: error.msg.message
            })
        }

        // else
        setUser({ ...user, errMessage: null })

    }, [error])


    // Handle onChange
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }


    // Handle login click
    const handleLogin = (e) => {
        e.preventDefault()

        // todo: login user
        const { email, password } = user

        // Get signed up user
        const signedUpUser = {
            email,
            password
        }
        console.log(signedUpUser);

        // Send to login
        dispatch(signin(signedUpUser))

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

    // # Render snackbar alert
    const renderAlert = () => {
        
        return user.errMessage
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


    return (
        <div className="base-container" ref={containerRef}>

            <div className="header">
                Login
            </div>

            <div className="content">
                <div className="image">
                    <img src="/user.svg" alt="logo" />
                </div>
                <div className="form">
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
                    onClick={handleLogin}
                >
                    Login
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
                    renderAlert()
                }

            </Snackbar>

        </div >
    )
}

