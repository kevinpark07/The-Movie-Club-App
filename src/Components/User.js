import React from 'react';
import { NavLink, Redirect } from 'react-router-dom'
import styled from 'styled-components';

const Facebook = "https://vectorified.com/images/icono-facebook-png-34.png"
const Twitter = 'https://www.pinclipart.com/picdir/middle/149-1496652_twitter-png-clipart-twitter-logo-png-black-transparent.png'
const Instagram = 'https://www.pinclipart.com/picdir/middle/158-1580825_instagram-icon-free-instagram-logo-black-clipart.png'
const BACKGROUND_URL = "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=925&q=80";

const User = (props) => {

    const renderClubs = () => {
        let userMember = props.members.filter(member => member.user.id === props.user.id);

        if (props.user.clubs) {
            return userMember.map(member =>
                <NavLink to={`/clubs/${member.club.id}`}>
                    <li key={member.club.id}>{member.club.name}</li>
                </NavLink>
            )
        } else {
            return (<li>NO CLUBS JOINED</li>)
        }
    }

    return (
        props.user ?
            <Container>
                <Background alt='' src={BACKGROUND_URL} />
                    <InnerContainer>
                        <Image alt="" src={props.user.profile_image} />
                        <Info>
                            <h1><b>Name:</b> {props.user.name}</h1>
                            <p><b>Age:</b> {props.user.age}</p>
                            <p><b>Username:</b> {props.user.username}</p>
                            <p><b>Email:</b> {props.user.email}</p>
                            <h3>Clubs:</h3>
                            <ul>
                                {renderClubs()}
                            </ul>
                            <SocialMedia>
                                <FacebookImage alt='' src={Facebook} />
                                <TwitterImage alt='' src={Twitter} />
                                <InstagramImage alt='' src={Instagram} />
                            </SocialMedia>
                        </Info>
                    </InnerContainer>
            </Container>
            :
            <Redirect to='/home' />
    )
}

export default User;

const Background = styled.img`
        width: 100%;
        height: 100%;
        z-index: -1;
        position: absolute;
        left: 0px;
        top: 12%;
`

const Container = styled.div`
    font-family: "Courier New",Courier,monospace;
`

const InnerContainer = styled.div`
    z-index: 1;
    align-self: center;
    margin-top: 5%;
`

const Image = styled.img`
    width: 14%;
    height: 37%;
    position: absolute;
    left: 44%;
    top: 20%;
    border-radius: 7px;
`

const Info = styled.div`
    position: absolute;
    top: 61%;
    width: 45%;
    right: 25%;
    background-color: #f7f7f7;
    border-radius: 10px;
    padding-left: 1%;
`

const SocialMedia = styled.div`
    float: right;
    margin-right: 10px;
`

const FacebookImage = styled.img`
    width: 52px;
    height: 52px;
`

const TwitterImage = styled.img`
    width: 65px;
    height: 50px;
`

const InstagramImage = styled.img`
    width: 50px;
    height: 50px;
`

