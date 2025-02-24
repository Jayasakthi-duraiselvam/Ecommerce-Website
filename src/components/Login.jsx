import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Login = () => {
    let {newuser}=useParams()
    let navigate=useNavigate();

    function handlenavigate(){
      navigate("/")
    }
  return (
    <div>Login = {newuser}
    <button onClick={handlenavigate}>Move To Home</button></div>
  )
}

export default Login;