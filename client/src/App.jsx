import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import store from './redux/store'
import { loadUser } from './redux/actions/authAction'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import "./App.scss";

import Auth from './components/Auth/Auth'
import Home from './components/home/HomePage'

const App = () => {

  // # Check for logged in user
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])


  // !Not work - error
  // const token = JSON.parse(localStorage.getItem('token'))

  // ? Work but slow a little bit
  // # Check for isAuthenticated
  const { isAuthenticated } = useSelector(state => state.auth)


  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={() => <Redirect to="/auth" />} />
        <Route path="/auth" component={() => (
          !isAuthenticated
            ? <Auth />
            : <Redirect to="/home" />
        )} />
        <Route path="/home" component={() => (
          !isAuthenticated
            ? <Redirect to="/auth" />
            : <Home />
        )} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
