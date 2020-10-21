import React, { useState } from 'react'
import { Redirect, NavLink } from 'react-router-dom'
import styled from 'styled-components'

const BACKGROUND_URL = "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=925&q=80";

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
                <Image alt="" src={BACKGROUND_URL} />
                <Form onSubmit={submitHandle} >
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
                    <NotUser>Not a User? Click <Link to="/signup">HERE</Link> to Sign-Up</NotUser>
                </Form>
            </Container>
    )
}

export default Login;

const Container = styled.div`
    position: relative;
    text-align: center;
    overflow: scroll;
`

const Link = styled(NavLink)`
    color: white; 
    text-decoration: none;  

    &:hover {
        text-decoration: none;
        color: #F74978;
      }
`

const NotUser = styled.h4`
    color: white;
`

const Image = styled.img`
    width: 100%;
`

const Form = styled.form`
    top: 31.5%;
    left: 50%;
    position: absolute;
    margin: auto;
    width: 30%;
    font: bold 15px monospace;
    background-color: transparent;
    background-radius: 10px;
    text-align: center;
    transform: translate(-50%, -50%);
    color: white
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