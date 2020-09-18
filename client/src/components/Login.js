import React, { useState } from "react";
import { useHistory } from 'react-router-dom'

import axiosWithAuth  from '../utils/axiosWithAuth'

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  let history = useHistory();

  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const handleChange = e => {
    e.persist()
    setCredentials({
      ...credentials,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('/login', credentials)
      .then((res) => {
        window.localStorage.setItem('token', res.data.payload)
        history.push('/protected')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      
        <div className="login-form">
          <form onSubmit={ handleSubmit }>
            <h2>Login:</h2>
            <label htmlFor="username">
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter username"
                value={ credentials.username }
                onChange={ handleChange }
              />
            </label>
            <label htmlFor="password">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter password"
                value={ credentials.password }
                onChange={ handleChange }
              />
            </label>
            <button className="login-button" type="submit">Login</button>
          </form>
        </div>
      
    </>
  );
};

export default Login;
