import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components'

const BACKGROUND_URL = "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=925&q=80";

const NewMovieForm = (props) => {

    const [movie, setMovie] = useState("")
    const [meetingTime, setMeetingTime] = useState("")
    const [inputValue, setInputValue] = useState("")
    const [redirect, setRedirect] = useState(false)

    const changeHandler = event => {
        setMeetingTime(event.target.value)
    }

    const submitHandle = e => {
        e.preventDefault();
        let foundMovie = props.movies.find(mov => mov.title === movie)
        let newMeeting = {
            meeting_time: meetingTime
        }
        console.log(foundMovie)
        props.newMovie(newMeeting, foundMovie)
        setRedirect(!redirect)
    }



    return (
        <Container>
            <Image alt="" src={BACKGROUND_URL} />
            {redirect ? <Redirect to={`/clubs/${props.club.id}/`} /> : null}
            {redirect ? <Redirect to={`/clubs/${props.club.id}/`} /> : null}
           <Form onSubmit={submitHandle} >
                <h1>Choose a New Movie & Meeting Time!</h1>
                <Input type="text" name="meetingTime" placeholder="Date of Meeting" value={meetingTime} onChange={changeHandler} />
                <StyledAutocomplete
                    value={movie}
                    onChange={(event, newMovie) => {
                    setMovie(newMovie);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                    }}
                    id="controllable-states-demo"
                    options={props.movies.map(movie => movie.title)}
                    style={{ width: 760 }}
                    renderInput={(params) => <TextField {...params} label="Search Movie" variant="outlined" />}
                />
                <Button type="submit">Create Meeting</Button>
            </Form>
        </Container>
    )

}

export default NewMovieForm;

const Container = styled.div`
    position: relative;
    text-align: center;
    overflow: scroll;
`

const Form = styled.form`
    top: 15%;
    left: 27%;
    position: absolute;
    margin: auto;
    width: 50%;
    font: bold 15px monospace;
    background-color: #f5f8fa;
    border-radius: 10px;
    text-align: center;
    padding-bottom: 1%;

`

const Image = styled.img`
    width: 100%;
`

const Input = styled.input`
    width: 85%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    font: 15px monospace;
`

const StyledAutocomplete = styled(Autocomplete)`
    margin-left: 7.5%;
    font-family: monospace;
`

const Button = styled.button`
    height: 40px;
    width: 150px;
    background: #0066A2;
    text-shadow:none;
    margin-top: 4%;
    border-radius: 10px;
    font: bold 15px monospace;
    display: block;
    margin-left: auto;
    margin-right: auto;
    color: white;
`