import React, { useState, useRef, useEffect } from "react";
import "./App.scss";
import { Login, Register, SideBox } from './components/login/index'


function App() {

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
    </div>
  );
}

export default App;
