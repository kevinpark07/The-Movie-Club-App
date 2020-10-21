import React, { useState, useEffect } from 'react'
import MessageBoard from './MessageBoard';
import ReviewForm from './ReviewForm';
import NewMovieForm from './NewMovieForm';
import { NavLink, Route, Switch, Redirect } from 'react-router-dom';
import styled from 'styled-components';


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
            return <Button onClick={joinClub}>Join Club</Button>
        }
    }

    const deleteButton = () => {
        let memberships = props.members.filter(member => member.club.id === props.club.id)
        let user = memberships.find(member => member.user.id === props.user.id)
        if (user) {
            return <Button onClick={removeClubButton}>Delete</Button>
        }
    }

    const reviewButton = () => {
        let memberships = props.members.filter(member => member.club.id === props.club.id)
        let user = memberships.find(member => member.user.id === props.user.id)
        if (user) {
            return <Button onClick={reviewForm}>Write Group Review</Button>
        }
    }

    const meetingButton = () => {
        let memberships = props.members.filter(member => member.club.id === props.club.id)
        let user = memberships.find(member => member.user.id === props.user.id)
        if (user) {
            return <Button onClick={newMeeting}>New Meeting</Button>
        }
    }

    const leaveButton = () => {
        let memberships = props.members.filter(member => member.club.id === props.club.id)
        let user = memberships.find(member => member.user.id === props.user.id)
        if (user) {
            return <Button onClick={leaveClub}>Leave Club</Button>
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
        <div>
            {review ? <Redirect to={`/clubs/${props.club.id}/review`} /> : null}
            {meeting ? <Redirect to={`/clubs/${props.club.id}/newMeeting`} /> : null}
            <Switch>
                <Route path={`/clubs/${props.club.id}/newMeeting`} render={() => <NewMovieForm newMovie={newMovie} movies={props.movies} club={props.club} />} />
                <Route path={`/clubs/${props.club.id}/review`} render={() => <ReviewForm submit={props.reviewForm} club={props.club} reviews={props.reviews} />} />
                <Container>
                    <p><NavLink to={`/clubs/${props.club.id}`}>
                        <Image alt={props.club.image} src={props.club.image} />
                    </NavLink></p>
                    <ButtonContainer>
                        {props.removeClub ? clubButton() : null}
                        {props.removeClub ? deleteButton() : null}
                        {props.removeClub ? reviewButton() : null}
                        {props.removeClub ? meetingButton() : null}
                        {props.removeClub ? leaveButton() : null}
                    </ButtonContainer>
                    <Info>
                        <Title>{props.club.name}</Title>
                        <p><b>Upcoming Meeting: </b> {props.club.meeting_time}</p>
                        <p><b>Current Movie: </b> {props.club.movies[props.club.movies.length - 1].title}</p>
                        <p><b>Club Description: </b> {props.club.description}</p>
                    </Info>
                    <Review>
                        {props.removeClub ?
                            <>
                                <h1>Reviews:</h1>
                                <ul>
                                    {renderReviews()}
                                </ul>
                            </>
                            :
                            null}
                    </Review>
                    <Message>{props.removeClub ? messageBoard() : null}</Message>
                    {/* <Footer>
                        <p>Hi</p>
                    </Footer> */}
                </Container>
            </Switch>
            {redirect ? <Redirect to='/clubs' /> : null}
        </div>

    )
}

export default MovieClub;


const Container = styled.div`
    font-family: "Courier New",Courier,monospace;
    background-image: url(https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1525&q=80);
    background-repeat: no-repeat;
    background-size: auto;
`
const Image = styled.img`
    width: 750px;
    height: 550px;
    position: absolute;
    left: 6%;
    top: 20%;
    border-radius: 10px;
`

const Title = styled.h1`
    font-family: "Courier New",Courier,monospace;
`

const ButtonContainer = styled.div`
    position: absolute;
    top: 80%;
    left: 5.5%;
`


const Button = styled.button`
    float: left;
    display: inline-block;
    padding: 15px 25px;
    font-size: 12px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    outline: none;
    color: #fff;
    background-color: #4CAF50;
    border: none;
    border-radius: 15px;
    box-shadow: 0 4px #999;
    margin-left: 10px;
    margin-bottom: 10%

    &:hover {background-color: #3e8e41}
    
    &:active {
        background-color: #3e8e41;
        box-shadow: 0 5px #666;
        transform: translateY(4px);
    }

`
const Info = styled.div`
    position: absolute;
    top: 90%;
    width: 45%;
    left: 6%;
    background-color: #f5f8fa;
    border-radius: 10px;
`
const Review = styled.div`
    position: absolute;
    top: 50%;
    margin-top: 10%;
    right: 7.5%;
    text-align: center;
    background-color: #f5f8fa;
    border-radius: 10px;
    width: 670px;
    margin-left: 10%;
`

const Message = styled.div`
    width: 650px;
    border-radius: 10px;
    padding: 10px;
    position: absolute;
    right: 7.5%;
    top: 20%;
    background-color: #f5f8fa;
    margin-left: 10%;
`

// const Footer = styled.div`
//     position: absolute;
//     bottom: 0%;
//     height: 500px;
//     width: 100%;
//     color: white;
// `