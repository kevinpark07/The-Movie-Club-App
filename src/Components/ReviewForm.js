import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'
import styled from 'styled-components';

const BACKGROUND_URL = "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=925&q=80";

const ReviewForm = (props) => {

    const [description, setDescription] = useState("")
    const [rating, setRating] = useState("")
    const [redirect, setRedirect] = useState(false)
    const [clubRedirect, setClubRedirect] = useState(false)

    const changeHandle = event => {
        if (event.target.name === "review") {
            setDescription(event.target.value)
        } else if (event.target.name === "rating") {
            setRating(event.target.value)
        }
    }

    const submitHandle = event => {
        event.preventDefault();

        let movieTitle = props.club.movies[props.club.movies.length - 1].title
        let review = props.reviews.find(review => review.movie.title === movieTitle && review.club.id === props.club.id);
        let reviewObj = {
            description: description,
            rating: rating
        }

        if (review.description === null) {
            console.log(review.description)
            props.submit(reviewObj, review.id);
            setDescription("");
            setRating("");
            setRedirect(!redirect)
        } else {
            alert("A REVIEW HAS ALREADY BEEN SUBMITTED.");
            setDescription("");
            setRating("");
        }

    }

    const clubPage = () => {
        setClubRedirect(!clubRedirect)
    }


    return (
        <Container>
            <Image alt="" src={BACKGROUND_URL} />
            {redirect ? <Redirect to={`/clubs/${props.club.id}/`} /> : null}
            {clubRedirect ? <Redirect to={`/clubs/${props.club.id}/`} /> : null}
            <h1>Review Form</h1>
            <Form onSubmit={submitHandle} >
                <label><b>Club Review for:</b> {props.club.movies[props.club.movies.length - 1].title}</label>
                <p><Textarea type="text" name="review" placeholder="Write Review Here" value={description} onChange={changeHandle} /></p>
                <label><b>Choose Rating (1-5)</b></label>
                <br></br><br></br>
                <select name="rating" value={rating} onChange={changeHandle} >
                    <option value={0}>Choose Rating</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
                <p><Button type="submit">Submit</Button></p>
                <p><Button onClick={clubPage}>Return to Club Page</Button></p>
            </Form>
        </Container>

    )
}

export default ReviewForm;

const Container = styled.div`
    position: relative;
    text-align: center;
    overflow: scroll;
`
const Image = styled.img`
    width: 100%;
`

const Form = styled.form`
    top: 17%;
    left: 27%;
    position: absolute;
    margin: auto;
    width: 50%;
    font: bold 15px monospace;
    background-color: #f5f8fa;
    border-radius: 10px;
    text-align: center;
    padding-top: 1%;
`

const Textarea = styled.textarea`
    width: 85%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    font: 15px monospace;
    margin-bottom: 2%;
`

const Button = styled.button`
    height: 40px;
    width: 200px;
    background: #0066A2;
    text-shadow:none;
    border-radius: 10px;
    font: bold 15px monospace;
    display: block;
    margin-left: auto;
    margin-right: auto;
    color: white;
`