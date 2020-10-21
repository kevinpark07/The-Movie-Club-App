import React, { useState, useEffect } from 'react'
import MovieClub from '../Components/MovieClub';
import MovieClubForm from '../Components/MovieClubForm';
import Search from '../Components/Search';
import ClubList from './ClubList'
import { Route, Switch, Redirect } from 'react-router-dom'

const CLUBS_URL = "http://localhost:3000/clubs/";
const MESSAGES_URL = "http://localhost:3000/messages/";
const REVIEW_URL = 'http://localhost:3000/reviews/'


const MovieClubsContainer = (props) => {

    const [clubApi, setClubApi] = useState([]);
    const [reviewApi, setReviewApi] = useState(false);
    const [messageApi, setMessageApi] = useState([]);


    useEffect(() => {
        fetch(CLUBS_URL)
            .then(res => res.json())
            .then(clubData => setClubApi(clubData))
    }, [])

    useEffect(() => {
        fetch(REVIEW_URL)
            .then(res => res.json())
            .then(reviewData => setReviewApi(reviewData))
    }, [])

    useEffect(() => {
        fetch(MESSAGES_URL)
            .then(res => res.json())
            .then(messageData => setMessageApi(messageData))
    }, [])

    const reviewSubmit = (review, id) => {
        fetch(REVIEW_URL + id, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                accepts: "application/json"
            },
            body: JSON.stringify(review)
        }).then(resp => resp.json()).then(updatedReview => {
            console.log(updatedReview)
            let reviews = reviewApi.filter(review => review.id !== updatedReview.id)
            setReviewApi([...reviews, updatedReview]);
        })
    }

    const newClub = (clubObj) => {
        fetch(CLUBS_URL, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                accepts: "application/json"
            },
            body: JSON.stringify(clubObj)
        }).then(resp => resp.json()).then(newClub => {
            setClubApi([...clubApi, newClub])
            setReviewApi([...reviewApi, newClub.reviews[0]])
        })
    }

    const removeClub = clubId => {
        fetch(CLUBS_URL + clubId, {
            method: "DELETE"
        }).then(resp => resp.json()).then(newClub => {
            console.log(newClub)
            let newArray = clubApi.filter(club => club.id !== clubId);
            setClubApi(newArray);
        })
    }


    const submitMessage = (club, user, content) => {

        fetch(MESSAGES_URL, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                accepts: "application/json"
            },
            body: JSON.stringify({
                content: content,
                club: club,
                user: user
            })
        }).then(resp => resp.json()).then(newMessage => {
            setMessageApi([...messageApi, newMessage])
        })
    }

    const newMovie = (meeting, movie, clubId) => {
        let club = clubApi.find(club => club.id === clubId);

        fetch(REVIEW_URL, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                accepts: "application/json"
            },
            body: JSON.stringify({
                club: club,
                movie: movie
            })
        }).then(resp => resp.json()).then(newReview =>
            setReviewApi([...reviewApi, newReview])
        )

        postReview(meeting, clubId)

    }

    const postReview = (meeting, id) => {

        fetch(CLUBS_URL + id, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                accepts: 'application/json'
            },
            body: JSON.stringify(meeting)
        }).then(res => res.json()).then(updatedClub => {
            // let club = clubApi.find(club => club.id === updatedClub.id);
            // let index = clubApi.indexOf(club)
            // clubApi.splice(index, 1, updatedClub)
            // setMeeting(!meeting);
            console.log(updatedClub)
            let newClubs = clubApi.filter(club => club.id !== updatedClub.id)
            setClubApi([...newClubs, updatedClub]);
        })
    }

    return (
        <div>
            { props.user ?
                <Switch>
                    <Route path={'/clubs/create'} render={() => <MovieClubForm newClub={newClub} movies={props.movies} />} />
                    <Route path={'/clubs/:id'} render={(routerProps) => {
                        let id = parseInt(routerProps.match.params.id);
                        if (clubApi.length > 0) {
                            let foundClub = clubApi.find(club => club.id === id);
                            return (<MovieClub leaveClub={props.leaveClub} members={props.members} joinClub={props.joinClub} messages={messageApi} reviewForm={reviewSubmit} newMovie={newMovie} movies={props.movies} user={props.user} submitMessage={submitMessage} removeClub={removeClub} key={foundClub.id} club={foundClub} reviews={reviewApi} />)
                        }
                    }} />
                    <Route path={'/clubs'} render={() => <ClubList clubs={clubApi} />} />
                </Switch>
                :
                <Redirect to='/home' />
            }
        </div>
    )
}

export default MovieClubsContainer;