import React, {useState} from 'react'
import MessageBoard from './MessageBoard';
import ReviewForm from './ReviewForm';
import { NavLink, Route, Switch, Redirect } from 'react-router-dom'

const REVIEW_API = 'http://localhost:3000/reviews/'

const MovieClub = (props) => {
    
    const [memberClicked, setMemberClicked] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const clickMemberButton = () => {
        setMemberClicked(!memberClicked)
    }

    const removeClubButton = () => {
        props.removeClub(props.club.id)
        setRedirect(!redirect)
    }

    const reviewSubmit = (review, id) => {
        fetch(REVIEW_API + id, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                accepts: "application/json"
            }, 
            body: JSON.stringify(review)
        }).then(resp => resp.json()).then(console.log)
    }

    
    return (
        <div>
            {redirect ? <Redirect to='/clubs' /> : null}
            <Switch>
                <Route exact path={`/clubs/${props.club.id}/review`} render={() => <ReviewForm submit={reviewSubmit} club={props.club} /> } />
                <div>
                    <NavLink to={`/clubs/${props.club.id}`}>
                        <img alt={props.club.image} src={props.club.image} />
                    </NavLink>
                    <h1>{props.club.name}</h1>
                    <h3>{props.club.meeting_time}</h3>
                    <p>Current Movie: {props.club.movies = "" ? "Not Chosen" : props.club.movies[props.club.movies.length - 1].title}</p>
                    <p>{props.club.description}</p>
                    <button onClick={clickMemberButton}>Members</button>
                    {props.removeClub ? <button onClick={removeClubButton}>Delete</button> : null}
                    {memberClicked ? 
                        props.club.users.map((user, index) => {
                            return ( 
                            <div key={index} >
                                <img alt="" src={user.image}/>
                                <p>{user.name}</p>
                                <p>{user.email}</p>
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