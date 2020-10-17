import React, {useState} from 'react'

const Movie = (props) => {

    const [reviewClicked, setReviewClicked] = useState(false)

    const click = () => {
        setReviewClicked(!reviewClicked)  
    }
    
    return (
        <div>
            <img alt={props.movie.title} src={props.movie.image}/>
            <h1>{props.movie.title}</h1>
            <h2>{props.movie.year}</h2>
            <h3>{props.movie.director}</h3>
            <p>{props.movie.description}</p>
            <button onClick={click}>Reviews</button> 
            {reviewClicked ? 
                props.movie.reviews.map(review => {
                 return ( 
                 <div>
                    <p>{review.description}</p>
                    <p>{review.rating}</p>
                    <p>{review.club.name}</p>
                </div>
                )}) : null
            }
        </div>
    )
}

export default Movie;