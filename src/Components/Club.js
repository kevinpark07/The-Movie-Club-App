import React from 'react';
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Club = (props) => {

    return (
        <Container>
            <p>
                <NavLink to={`/clubs/${props.club.id}`}>
                    <Image alt={props.club.image} src={props.club.image} />
                </NavLink>
            </p>
            <Header>{props.club.name}</Header>
            <Info>
                <p><b>Club Meeting: </b> {props.club.meeting_time}</p>
                <p><b>Current Movie: </b> {props.club.movies[props.club.movies.length - 1].title}</p>
                <p><b>Club Description: </b> <p>{props.club.description}</p></p>
            </Info>
        </Container>
    )
}

export default Club;

const Container = styled.div`
    float: left;
    width: 20.3%;
    height: 700px;
    margin-bottom: 16px;
    margin-left: 45px;
    padding: 0 8px;
    display: block;
    font-family: "Courier New",Courier,monospace;
    border: 1px solid gray;
    border-radius: 10px;
    background-color: #1c1f1f;
    margin-top: 15px;
`

const Image = styled.img`
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 300px;
    height: 250px;
    border-radius: 10px;
`
const Header = styled.h1`
    text-align: center;
    color: white;
`

const Info = styled.div`
    width: 75%;
    padding: 20px;
    height: 40px;
    color: white;
    text-align: left;
`



