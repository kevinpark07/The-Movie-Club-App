import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components'

const Signup = (props) => {

    const [user, setUser] = useState("")
    const [pass, setPass] = useState("")
    const [confirm, setConfirm] = useState("")
    const [email, setEmail] = useState("")
    const [photo, setPhoto] = useState("")
    const [name, setName] = useState("")


    const changeHandle = e => {
        if (e.target.name === 'username') {
            setUser(e.target.value)
        } else if (e.target.name === 'password') {
            setPass(e.target.value)
        } else if (e.target.name === 'name') {
            setName(e.target.value)
        } else if (e.target.name === 'confirm') {
            setConfirm(e.target.value)
        } else if (e.target.name === 'email') {
            setEmail(e.target.value)
        } else if (e.target.name === 'image') {
            setPhoto(e.target.value)
        }
    }

    const submitHandle = e => {
        e.preventDefault();

        if (pass === confirm) {
            let userInfo = {
                name: name,
                username: user,
                password: pass,
                email: email,
                profile_image: photo
            }

            props.newUser(userInfo)

        } else {
            alert("Passwords do not match. Please try again.")
            setUser('')
            setPass('')
            setConfirm('')
            setName('')
            setEmail('')
            setPhoto('')
        }

    }


    return (
        <Container>
            <form onSubmit={submitHandle} >
                <h1>Enter Your Information</h1>
                <p><Input type='text' name="username" placeholder='Enter Username' value={user} onChange={changeHandle} /></p>
                <p><Input type='password' name="password" placeholder='Enter Password' value={pass} onChange={changeHandle} /></p>
                <p><Input type='password' name="confirm" placeholder='Confirm Password' value={confirm} onChange={changeHandle} /></p>
                <p><Input type='text' name="name" placeholder='Enter Full Name' value={name} onChange={changeHandle} /></p>
                <p><Input type='text' name="email" placeholder='Enter Email Address' value={email} onChange={changeHandle} /></p>
                <p><Input type='text' name="image" placeholder='Upload Photo' value={photo} onChange={changeHandle} /></p>
                <Button>Sign-Up</Button>
            </form>
        </Container>
    )
}

export default Signup;

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