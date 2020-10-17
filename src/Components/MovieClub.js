import React, {useState} from 'react'
import MessageBoard from './MessageBoard';
import ReviewForm from './ReviewForm';
import { NavLink, Route, Switch } from 'react-router-dom'

const MovieClub = (props) => {
    
    const [memberClicked, setMemberClicked] = useState(false);
    const [reviewClicked, setReviewClicked] = useState(false);

    const clickMemberButton = () => {
        setMemberClicked(!memberClicked)
    }


    
    return (
        <div>
            <Switch>
                <Route exact path={`/clubs/${props.club.id}/review`} render={() => <ReviewForm /> } />
                <div>
                    <NavLink to={`/clubs/${props.club.id}`}>
                        <img alt={props.club.image} src={props.club.image} />
                    </NavLink>
                    <h1>{props.club.name}</h1>
                    <h3>{props.club.meeting_time}</h3>
                    <p>{props.club.description}</p>
                    <button onClick={clickMemberButton}>Members</button> 
                    {memberClicked ? 
                        props.club.members.map((member, index) => {
                            return ( 
                                <div key={index} >
                                <img alt="" src={member.user.image}/>
                                <p>{member.user.name}</p>
                                <p>{member.user.email}</p>
                            </div>
                            )
                        }) : null
                    }
                </div>
            </Switch>
        </div>
    )
}

export default MovieClub;