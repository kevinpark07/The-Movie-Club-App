import React, { useState } from 'react'
import MessageBoard from './MessageBoard';
import ReviewForm from './ReviewForm';
import NewMovieForm from './NewMovieForm'
import { NavLink, Route, Switch, Redirect } from 'react-router-dom'

const REVIEW_URL = 'http://localhost:3000/reviews/';
const CLUBS_URL = 'http://localhost:3000/clubs/'

const MovieClub = (props) => {

    const [memberClicked, setMemberClicked] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [review, setReview] = useState(false);
    const [meeting, setMeeting] = useState(false)

    const clickMemberButton = () => {
        setMemberClicked(!memberClicked)
    }

    const removeClubButton = () => {
        props.removeClub(props.club.id)
        setRedirect(!redirect)
    }

    const reviewSubmit = (review, id) => {
        fetch(REVIEW_URL + id, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                accepts: "application/json"
            },
            body: JSON.stringify(review)
        }).then(resp => resp.json()).then(console.log)
    }

    const reviewForm = () => {
        setReview(!review)
    }

    const newMeeting = () => {
        setMeeting(!meeting)
    }

    const newMovie = (meeting, movie) => {
        fetch(CLUBS_URL + props.club.id, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                accepts: 'application/json'
            },
            body: JSON.stringify(meeting)
        }).then(res => res.json()).then(console.log)
        postReview(movie)
    }

    const postReview = (movie) => {
        fetch(REVIEW_URL, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                accepts: "application/json"
            },
            body: JSON.stringify({
                club: props.club,
                movie: movie
            })
        }).then(resp => resp.json()).then(console.log)
    }

    return (
        <>
            <div>
                {review ? <Redirect to={`/clubs/${props.club.id}/review`} /> : null}
                {meeting ? <Redirect to={`/clubs/${props.club.id}/newMeeting`} /> : null}
                <Switch>
                    <Route path={`/clubs/${props.club.id}/newMeeting`} render={()=> <NewMovieForm newMovie={newMovie} movies={props.movies} club={props.club} /> } />
                    <Route path={`/clubs/${props.club.id}/review`} render={() => <ReviewForm submit={reviewSubmit} club={props.club} />} />
                    <div>
                        <NavLink to={`/clubs/${props.club.id}`}>
                            <img alt={props.club.image} src={props.club.image} />
                        </NavLink>
                        <h1>{props.club.name}</h1>
                        <h3>{props.club.meeting_time}</h3>
                        <p>Current Movie: {props.club.movies[props.club.movies.length - 1].title}</p>
                        <p>{props.club.description}</p>
                        <button onClick={clickMemberButton}>Members</button>
                        {props.removeClub ? <button onClick={removeClubButton}>Delete</button> : null}
                        {props.removeClub ? <button onClick={reviewForm}>Write Group Review</button> : null}
                        {props.removeClub ? <button onClick={newMeeting}>New Meeting</button> : null}
                        {memberClicked ?
                            props.club.users.map((user, index) => {
                                return (
                                    <div key={index} >
                                        <img alt="" src={user.image} />
                                        <p>{user.name}</p>
                                        <p>{user.email}</p>
                                    </div>
                                )
                            }) : null
                        }
                        {props.removeClub ? <MessageBoard submitMessage={props.submitMessage} message={props.message} club={props.club} user={props.user} /> : null}
                    </div>
                </Switch>
                {redirect ? <Redirect to='/clubs' /> : null}
            </div>
        </>
    )
}

export default MovieClub;