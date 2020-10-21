import React, {useState} from 'react'
import styled from 'styled-components'

const BACKGROUND_URL = "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=925&q=80";

const Movie = (props) => {

    const [reviewClicked, setReviewClicked] = useState(false)

    const click = () => {
        setReviewClicked(!reviewClicked)  
    }
    
    return (
        <Container>
            <Image alt={props.movie.title} src={props.movie.image}/>
            <Header>
            <h1>{props.movie.title}</h1>
            <h2>{props.movie.year}</h2>
            <h3>{props.movie.director}</h3>
            <p>{props.movie.description}</p>
            <button onClick={click}>Reviews</button> 
            {reviewClicked ? 
                props.movie.reviews.map(review => {
                    return ( 
                        <Review>
                            <p><b>Review: </b> {review.description}</p>
                            <p><b>Rating: </b> {review.rating}</p>
                            <p><b>Club: </b> {review.club.name}</p>
                        </Review>
                )}) : null
            }
            </Header>
        </Container>
    )
}

export default Movie;

const Container = styled.div`
    float: left;
    width: 22.3%;
    height: auto;
    margin-top: 15px;
    margin-bottom: 16px;
    margin-left: 19px;
    padding: 0 8px;
    display: block;
    font-family: "Courier New",Courier,monospace;
    border: 1px solid gray;
    border-radius: 10px;
    background-color: #1c1f1f;
    overflow: scroll;
`


const Image = styled.img`
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10%;
    width: 300px;
    height: 315px;
    border-radius: 10px;
`

const Header = styled.p`
    text-align: center;
    color: white;
    height: 500px;
`

const Review = styled.div`
    border-color: white;
    border-style: solid;
    border-radius: 5px;
    border-width: 1px;
    text-align: left;
    margin-top: 5%;
    margin-bottom: 5%;
`

// const Button = styled.button`
// float: left;
// display: inline-block;
// padding: 15px 25px;
// font-size: 12px;
// cursor: pointer;
// text-align: center;
// text-decoration: none;
// outline: none;
// color: #fff;
// background-color: #4CAF50;
// border: none;
// border-radius: 15px;
// box-shadow: 0 4px #999;
// margin-left: 10px;
// margin-bottom: 10%

// &:hover {background-color: #3e8e41}

// &:active {
//     background-color: #3e8e41;
//     box-shadow: 0 5px #666;
//     transform: translateY(4px);
// }
// `