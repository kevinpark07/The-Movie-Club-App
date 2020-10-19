import React, {useState} from 'react';
import { NavLink, Redirect } from 'react-router-dom'

const NavBar = (props) => {


    const logoutHandle = () => {
        props.logout("");
    }

    return (
        <ul class="navbar">
            <NavLink to="/home">
                <li>Home</li>
            </NavLink>
            <NavLink to="/movies">
                <li>Movie Collection</li>
            </NavLink>
            <NavLink to="/clubs">
                <li>Browse Movie Clubs</li>
            </NavLink>
           { props.user ?
                // logout ?
                // <Redirect to='/home' />
                // :
                <>
                <NavLink to="/clubs/create">
                    <li>Create Club</li>
                </NavLink>
                <NavLink to="/profile">
                    <li>Profile</li>
                </NavLink>
                <NavLink to="/home" onClick={logoutHandle}>
                    <li>Log-Out</li>
                </NavLink>
                </>
            :
            <NavLink to="/login">
                <li>Log-In/Sign-Up</li>
            </NavLink>
           }
        </ul>
    )
}

export default NavBar;