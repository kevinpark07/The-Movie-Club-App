import React from 'react';
import {NavLink} from 'react-router-dom'

const User = (props) => {
    
    const renderClubs = () => {
        return props.user.clubs.map(club => 
            <NavLink to={`/clubs/${club.id}`}>
                <li>{club.name}</li>
            </NavLink>
        )
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