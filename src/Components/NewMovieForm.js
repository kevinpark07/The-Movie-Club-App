import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Redirect } from 'react-router-dom';

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
    }



    return (
        <div>
           <form onSubmit={submitHandle} >
                <h1>Choose a New Movie & Meeting Time!</h1>
                <input type="text" name="meetingTime" placeholder="Date of First Meeting" value={meetingTime} onChange={changeHandler} />
                <Autocomplete
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
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Search Movie" variant="outlined" />}
                />
                <button type="submit">Create Meeting</button>
            </form>
        </div>
    )

}

export default NewMovieForm;