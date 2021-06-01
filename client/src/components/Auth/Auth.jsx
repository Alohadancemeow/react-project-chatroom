import React, { useState, useRef, useEffect } from "react";
import { useSelector } from 'react-redux'
import { Login, Register, SideBox } from '../login/index'

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const Auth = () => {

  let sideBox = ''

  // # State
  const [state, setState] = useState({
    isLoginActive: true,
  })

  const { isLoginActive } = state
  const containerRef = useRef('')

  const current = state.isLoginActive ? "Register" : "Login"
  const currentActive = state.isLoginActive ? "Login" : "Register"


  // # If isloginActive,
  // # Add and remove className.
  const handleChange = () => {

    if (isLoginActive) {
      sideBox.classList.remove("right");
      sideBox.classList.add("left");
    } else {
      sideBox.classList.remove("left");
      sideBox.classList.add("right");
    }

    setState({
      ...state,
      isLoginActive: !state.isLoginActive
    })
  }

  useEffect(() => {
    sideBox.classList.add("right");
  }, [])


  // # Snackbar section

  const { id, msg, status } = useSelector(state => state.error)
  // const { isAuthenticated, user } = useSelector(state => state.auth)

  const [snackbar, setSnackbar] = useState({
    open: true,
    vertical: 'top',
    horizontal: 'center'
  });


  const { vertical, horizontal, open } = snackbar

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbar({
      ...snackbar,
      open: false
    });
  };

 
    const isAuth = (
      <Snackbar
        key={vertical + horizontal}
        open={open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical, horizontal }}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="error"
        >
          {msg.message}

        </Alert>
      </Snackbar>
    )



  return (
    <div className="App">
      <div className="login">
        <div className="container" ref={containerRef}>
          {
            isLoginActive
              ? <Login containerRef={(ref) => containerRef.current = ref} />
              : <Register containerRef={(ref) => containerRef.current = ref} />
          }

        </div>

        <SideBox
          current={current}
          currentActive={currentActive}
          containerRef={(ref) => sideBox = ref}
          onClick={handleChange}
        />

      </div>

      {/* //todo: Snackbar */}
      {
        msg.message
          ? isAuth
          : null
      }


    </div>
  );
}

export default Auth;
