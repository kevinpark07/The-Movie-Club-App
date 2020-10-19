import React from 'react';
import {NavLink} from 'react-router-dom'

const User = (props) => {
    
    const renderClubs = () => {
        let userMember = props.members.filter(member => member.user.id === props.user.id);
        
        if (props.user.clubs) {
        return userMember.map(member => 
            <NavLink to={`/clubs/${member.club.id}`}>
                <li>{member.club.name}</li>
            </NavLink>
        )} else {
           return (<li>NO CLUBS JOINED</li>)
        }
    }
    
    return (
        <div>
            <img alt="" src={props.user.profile_image}/>
            <h1>{props.user.name}</h1>
            <p>{props.user.age}</p>
            <p>{props.user.username}</p>
            <p>{props.user.email}</p>
            <h3>Clubs:</h3>
            <ul>
            {renderClubs()}
            </ul>
        </div>
    )
}

export default User;