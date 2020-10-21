import React from 'react';
import { NavLink, Redirect } from 'react-router-dom'
import styled from 'styled-components';


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
        <>
        {props.user ?
            <Container>
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
                </Info>
            </Container> 
            :
            <Redirect to='/home' /> 
            }
        </>
    )
}

export default User;

const Container = styled.div`
    font-family: "Courier New",Courier,monospace;
`

const Image = styled.img`
    width: 20%;
    height: 50%;
    position: absolute;
    left: 15%;
    top: 20%;
    border-radius: 50%;
`

const Info = styled.div`
    position: absolute;
    top: 30%;
    width: 45%;
    right: 15%;
    background-color: #f5f8fa;
    border-radius: 10px;
`


