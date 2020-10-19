import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

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
        <form onSubmit={submitHandle} >
            <input type='text' name="username" placeholder='Enter Username' value={user} onChange={changeHandle} />
            <input type='password' name="password" placeholder='Enter Password' value={pass} onChange={changeHandle} />
            <input type='password' name="confirm" placeholder='Confirm Password' value={confirm} onChange={changeHandle} />
            <input type='text' name="name" placeholder='Enter Full Name' value={name} onChange={changeHandle} />
            <input type='text' name="email" placeholder='Enter Email Address' value={email} onChange={changeHandle} />
            <input type='text' name="image" placeholder='Upload Photo' value={photo} onChange={changeHandle} />
            <button>Sign-Up</button>
        </form>
    )
}

export default Signup;