import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const BACKGROUND_URL = "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=925&q=80";

const Home = (props) => {
    return (
        props.user ?
            <Container>
                <Image alt="" src={BACKGROUND_URL} />
                <Welcome>Welcome {props.user.name}</Welcome>
            </Container>
            :
            <Container>
                <Image alt="" src={BACKGROUND_URL} />
                <Header><Link to="/login">Enter</Link></Header>
            </Container>

    )
}

export default Home;
// 
//     border-radius: 5px;
//     box-shadow: 5px 5px #DE1570;

const Welcome = styled.h1`
    position: absolute;
    top: 28%;
    left: 50%;
    opacity: 0.8;
    transform: translate(-50%, -50%);
    font-family: "Courier New",Courier,monospace;
    font-size: 30pt;
    background-color: black;
    border-radius: 5px;
    box-shadow: 5px 5px #DE1570;
`

const Link = styled(NavLink)`
    color: #F74978;
    opacity: 0.8;
    text-decoration: none;
    background-color: black;
    border-radius: 10px;

    &:hover {
        text-decoration: none;
        color: white;
      }
`

const Image = styled.img`
    width: 100%;
`
const Header = styled.h1`
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: "Courier New",Courier,monospace;
    font-size: 30pt;
`

const Container = styled.div`
    position: relative;
    text-align: center;
    color: white;
    overflow: scroll;
`

// background-ige: url(https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=925&q=80);
//     background-color: #cccccc;
//     background-position:center;
//     background-attachment: scroll;
//     background-repeat: no-repeat;