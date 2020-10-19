import React, { useState, useEffect } from 'react'
import MessageBoard from './MessageBoard';
import ReviewForm from './ReviewForm';
import NewMovieForm from './NewMovieForm'
import { NavLink, Route, Switch, Redirect } from 'react-router-dom'
import User from './User';


const MovieClub = (props) => {

    const [redirect, setRedirect] = useState(false);
    const [review, setReview] = useState(false);
    const [meeting, setMeeting] = useState(false);


    const removeClubButton = () => {
        props.removeClub(props.club.id)
        setRedirect(!redirect)
    }


    const newMovie = (meeting, movie) => {
        props.newMovie(meeting, movie, props.club.id)
    }

    const reviewForm = () => {
        setReview(!review)
    }

    const newMeeting = () => {
        setMeeting(!meeting)
    }

    const renderReviews = () => {
        let reviews = props.reviews.filter(review => review.club.id === props.club.id);
        return reviews.map(review => <li>Movie: {review.movie.title}<p>{review.description}</p><p>{review.rating}</p></li>)
    }

    const joinClub = () => {
        props.joinClub(props.club, props.user)
    }

    const clubButton = () => {
        let memberships = props.members.filter(member => member.club.id === props.club.id)
        let user = memberships.find(member => member.user.id === props.user.id)
        if (!user) {
            return <button onClick={joinClub}>Join Club</button>
        }
    }

    const deleteButton = () => {
        let memberships = props.members.filter(member => member.club.id === props.club.id)
        let user = memberships.find(member => member.user.id === props.user.id)
        if (user) {
            return <button onClick={removeClubButton}>Delete</button>
        }
    }

    const reviewButton = () => {
        let memberships = props.members.filter(member => member.club.id === props.club.id)
        let user = memberships.find(member => member.user.id === props.user.id)
        if (user) {
            return <button onClick={reviewForm}>Write Group Review</button>
        }
    }

    const meetingButton = () => {
        let memberships = props.members.filter(member => member.club.id === props.club.id)
        let user = memberships.find(member => member.user.id === props.user.id)
        if (user) {
            return <button onClick={newMeeting}>New Meeting</button>
        }
    }

    const leaveButton = () => {
        let memberships = props.members.filter(member => member.club.id === props.club.id)
        let user = memberships.find(member => member.user.id === props.user.id)
        if (user) {
            return <button onClick={leaveClub}>Leave Club</button>
        }
    }

    const leaveClub = () => {
        let memberships = props.members.filter(member => member.club.id === props.club.id)
        let user = memberships.find(member => member.user.id === props.user.id)
        props.leaveClub(user.id)
    }

    const messageBoard = () => {
        let memberships = props.members.filter(member => member.club.id === props.club.id)
        let user = memberships.find(member => member.user.id === props.user.id)
        if (user) {
            return <MessageBoard submitMessage={props.submitMessage} messages={props.messages} club={props.club} user={props.user} />
        }
    }

    return (
        <>
            <div>
                {review ? <Redirect to={`/clubs/${props.club.id}/review`} /> : null}
                {meeting ? <Redirect to={`/clubs/${props.club.id}/newMeeting`} /> : null}
                <Switch>
                    <Route path={`/clubs/${props.club.id}/newMeeting`} render={() => <NewMovieForm newMovie={newMovie} movies={props.movies} club={props.club} />} />
                    <Route path={`/clubs/${props.club.id}/review`} render={() => <ReviewForm submit={props.reviewForm} club={props.club} reviews={props.reviews} />} />
                    <div>
                        <NavLink to={`/clubs/${props.club.id}`}>
                            <img alt={props.club.image} src={props.club.image} />
                        </NavLink>
                        <h1>{props.club.name}</h1>
                        <h3>{props.club.meeting_time}</h3>
                        <p>Current Movie: {props.club.movies[props.club.movies.length - 1].title}</p>
                        <p>Club Description: {props.club.description}</p>
                        {props.removeClub ?
                            <>
                                <p>Reviews:</p>
                                <ul>
                                    {renderReviews()}
                                </ul>
                            </>
                            :
                            null}
                        {props.removeClub ? clubButton() : null}
                        {props.removeClub ? deleteButton() : null}
                        {props.removeClub ? reviewButton() : null}
                        {props.removeClub ? meetingButton() : null}
                        {props.removeClub ? leaveButton() : null}
                        {props.removeClub ? messageBoard() : null}
                    </div>
                </Switch>
                {redirect ? <Redirect to='/clubs' /> : null}
            </div>
        </>
    )
}

export default MovieClub;