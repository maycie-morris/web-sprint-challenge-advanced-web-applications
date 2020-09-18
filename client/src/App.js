import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import Login from "./components/Login";
import BubblePage from './components/BubblePage'
import PrivateRoute from './components/PrivateRoute'
import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">

        <Link to='/'>Login</Link>
        {/* <Link to='/BubblePage'>Bubbles!</Link> */}

        <Switch>

          <Route exact path="/">
            <Login />
          </Route>

          <Route path="login">
            <Login />
          </Route>

          <PrivateRoute exact path="/BubblePage" component={BubblePage} />


        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
