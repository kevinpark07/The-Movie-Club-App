import React, {useState} from 'react';

const ReviewForm = (props) => {
    
    const [description, setDescription] = useState("")
    const [rating, setRating] = useState("")

    const changeHandle = event => {   
        if (event.target.name === "review") {
            setDescription(event.target.value)
        } else if (event.target.name === "rating") {
            setRating(event.target.value)
        }
    }

    const submitHandle = event => {
        
        event.preventDefault();
        let review = props.club.reviews.find(review => review.movie.title === props.club.movies);
        let reviewObj = {
            description: description,
            rating: rating
        }

        if (review.description === "") { 
            props.submit(reviewObj, review.id); 
            setDescription("");
            setRating("");
        } else {
            alert("A REVIEW HAS ALREADY BEEN SUBMITTED.");
            setDescription("");
            setRating("");
        }

    }
    
    
    return (
       <div>
           <h1>Review Form</h1>
           <form onSubmit={submitHandle} >
               <label>Club Review</label>
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
           </form>
       </div>
        
    )
}

export default ReviewForm;