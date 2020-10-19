import React, {useState} from 'react';
import { Redirect } from 'react-router-dom'

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
        <div>
        {redirect ? <Redirect to={`/clubs/${props.club.id}/`}/> : null }
        {clubRedirect ? <Redirect to={`/clubs/${props.club.id}/`}/> : null }
           <h1>Review Form</h1>
           <form onSubmit={submitHandle} >
            <label>Club Review for: {props.club.movies[props.club.movies.length - 1].title}</label>
               <p><textarea type="text" name="review" placeholder="Write Review Here" value={description} onChange={changeHandle} /></p>
               <label>Choose Rating (1-5)</label>
               <br></br>
               <select name="rating" value={rating} onChange={changeHandle} >
                    <option value={0}>Choose Rating</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
               </select>
               <p><button type="submit">Submit</button></p>
               <p><button onClick={clubPage}>Return to Club Page</button></p>
           </form>
       </div>
        
    )
}

export default ReviewForm;