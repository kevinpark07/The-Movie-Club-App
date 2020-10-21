import React, { useState } from 'react'
import { Redirect, NavLink } from 'react-router-dom'
import styled from 'styled-components'

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
            <Container>
                <form onSubmit={submitHandle} >
                    <h1>Login</h1>
                    <label>Username: </label>
                    <Input type="text" name="username" value={username} onChange={changeHandle} />
                    <br></br>
                    <br></br>
                    <label>Password: </label>
                    <Input type="password" name="password" value={password} onChange={changeHandle} />
                    <br></br>
                    <br></br>
                    <Button type="submit">Submit</Button>
                    <br></br>
                    <br></br>
                    <h4>Not a User? Click <NavLink to="/signup">here</NavLink> to Sign-Up</h4>
                </form>
            </Container>
    )
}

export default Login;

const Container = styled.div`
    top: 27%;
    left: 27%;
    position: absolute;
    margin: auto;
    width: 50%;
    font: bold 15px monospace;
    background-color: #f5f8fa;
    background-radius: 10px;
    text-align: center;
`

const Input = styled.input`
    width: 85%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    font: 15px monospace;
`

const Button = styled.button`
    height: 40px;
    width: 150px;
    background: #0066A2;
    text-shadow:none;
    margin-top: 4%;
    border-radius: 10px;
    font: bold 15px monospace;
    display: block;
    margin-left: auto;
    margin-right: auto;
    color: white;
`