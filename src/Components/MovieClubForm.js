import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Redirect} from 'react-router-dom'

const MovieClubForm = (props) => {

    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")
    const [movie, setMovie] = useState("")
    const [meetingTime, setMeetingTime] = useState("")
    const [inputValue, setInputValue] = useState("");
    const [redirect, setRedirect] = useState(false)


    const changeHandle = event => {
        if (event.target.name === "name") {
            setName(event.target.value)
        } else if (event.target.name === "image") {
            setImage(event.target.value)
        } else if (event.target.name === "description") { 
            setDescription(event.target.value)
        } else if (event.target.name === "movie") {
            setMovie(event.target.value)
        } else if (event.target.name === "meetingTime") {
            setMeetingTime(event.target.value)
        } 
    }

    const submitHandle = event => {
        event.preventDefault();
        let foundMovie = props.movies.find(mov=> mov.title === movie)
        let newClub = {
            name: name,
            meeting_time: meetingTime,
            description: description, 
            image: image,
            movies: foundMovie
        };
        
        props.newClub(newClub);
        
        setName("");
        setImage("");
        setDescription("");
        setMovie("");
        setMeetingTime("");
        setInputValue("");
        setRedirect(!redirect)
    }


    return (
        <div>
            {redirect ? <Redirect to='/clubs' /> : null}
            <form onSubmit={submitHandle} >
                <h1>Start A Movie Club!</h1>
                <input type="text" name="name" placeholder="Insert Club Name Here" value={name} onChange={changeHandle} />
                <input type="text" name="image" placeholder="Insert Club Image URL Here" value={image} onChange={changeHandle} />
                <textarea type="text" name="description" placeholder="Insert Club Description Here" value={description} onChange={changeHandle} />
                <input type="text" name="meetingTime" placeholder="Date of First Meeting" value={meetingTime} onChange={changeHandle} />
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
                <button type="submit">Create Club</button>
            </form>
        </div>
    )
}

export default MovieClubForm;