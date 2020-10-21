import React, { useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom'
import styled from 'styled-components';

const NavBar = (props) => {


    const logoutHandle = () => {
        props.logout("");
    }

    return (
        <Nav>
            <ul className="navbar">
                <Link to="/home">
                    <li>Home</li>
                </Link>
                <Link to="/movies">
                    <li>Movie Collection</li>
                </Link>
                <Link to="/clubs">
                    <li>Browse Movie Clubs</li>
                </Link>
                {props.user ?
                    // logout ?
                    // <Redirect to='/home' />
                    // :
                    <>
                        <Link to="/clubs/create">
                            <li>Create Club</li>
                        </Link>
                        <Link to="/profile">
                            <li>Profile</li>
                        </Link>
                        <Log>
                        <Link to="/home" onClick={logoutHandle}>
                            <li>Log-Out</li>
                        </Link>
                        </Log>
                    </>
                    :
                    <Log>
                        <Link to="/login">
                            <li>Log-In/Sign-Up</li>
                        </Link>
                    </Log>
                }
            </ul>
        </Nav>
    )
}

export default NavBar;

const Link = styled(NavLink)`
    color: white; 
    text-decoration: none;  

    &:hover {
        text-decoration: none;
        color: #F74978;
      }
`

const Nav = styled.div`
    overflow: hidden;
    background-color: #131313;
`

const Log = styled.div`
    float: right;
`