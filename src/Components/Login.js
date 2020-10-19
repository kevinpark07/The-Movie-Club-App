import React, {useState} from 'react'
import { Redirect } from 'react-router-dom'

const Login = (props) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [userFound, setUserFound] = useState(false)

    const changeHandle = event => {
        if (event.target.name === "username") {
            console.log(username)
            setUsername(event.target.value)
        } else if (event.target.name === "password") {
            console.log(password)
            setPassword(event.target.value)
        }
    }

    const submitHandle = event => {
        event.preventDefault();
        if (props.users.find(user => user.username === username && user.password === password)) {
            let loginUser = props.users.find(user => user.username === username && user.password === password)
            props.login(loginUser)
            setUserFound(!userFound)
    
        } else {
            alert("Incorrect Username or Password. Please try again.")
            setUsername("");
            setPassword("")
        }
    }

    return (
        userFound ?
        
        <Redirect to="/profile" />
        
        :

        <form onSubmit={submitHandle} >
            <h1>Login</h1>
            <label>Username:</label>
            <input type="text" name="username" value={username} onChange={changeHandle} />
            <br></br>
            <br></br>
            <label>Password:</label>
            <input type="password" name="password" value={password} onChange={changeHandle} />
            <br></br>
            <br></br>
            <button type="submit">Submit</button>
        </form>

    )
}

export default Login;