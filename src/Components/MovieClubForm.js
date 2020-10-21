import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Redirect} from 'react-router-dom'
import styled from 'styled-components'

const BACKGROUND_URL = "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=925&q=80";

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
        <Container>
            <Image alt="" src={BACKGROUND_URL} />
            {redirect ? <Redirect to='/clubs' /> : null}
            <Form onSubmit={submitHandle} >
                <h1>Start A Movie Club!</h1>
                <Input type="text" name="name" placeholder="Insert Club Name Here" value={name} onChange={changeHandle} />
                <Input type="text" name="image" placeholder="Insert Club Image URL Here" value={image} onChange={changeHandle} />
                <Input type="text" name="meetingTime" placeholder="Date of First Meeting" value={meetingTime} onChange={changeHandle} />
                <Textarea type="text" name="description" placeholder="Insert Club Description Here" value={description} onChange={changeHandle} />
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
                    renderInput={(params) => <TextField {...params} label="Search Movie" variant="outlined" />}
                />
                <Button type="submit">Create Club</Button>
            </Form>
        </Container>
    )
}

export default MovieClubForm;

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
    background-radius: 10px;
    text-align: center;

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

const Textarea = styled.textarea`
    width: 85%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    font: 15px monospace;
    margin-bottom: 3%;
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
    margin-bottom: 4%;
`
const StyledAutocomplete = styled(Autocomplete)`
    margin-left: 7.5%;
    width: 85%;
    font-family: monospace;
`
