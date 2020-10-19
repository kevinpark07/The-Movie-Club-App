import React, {useState, useEffect} from 'react'
import MovieClub from '../Components/MovieClub';
import MovieClubForm from '../Components/MovieClubForm';
import Search from '../Components/Search';
import ClubList from './ClubList'
import { Route, Switch, Redirect } from 'react-router-dom'

const CLUBS_URL = "http://localhost:3000/clubs/";
const MESSAGES_URL = "http://localhost:3000/messages/";

const MovieClubsContainer = (props) => {

    const [clubApi, setClubApi] = useState([]);
    const [messaged, setMessaged] = useState(false)
    

    useEffect (() => {
        fetch(CLUBS_URL)
        .then(res => res.json())
        .then(clubData => setClubApi(clubData))
      }, [])


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
        }).then(resp => resp.json()).then(mess => {
            setMessaged(!messaged)
        })
    }

    return (
       <div>
           {/* {props.user ?  */}
            <Switch>
                <Route path={'/clubs/create'} render={() => <MovieClubForm newClub={newClub} movies={props.movies} /> } />
                <Route path={'/clubs/:id'} render={(routerProps) => {
                    let id = parseInt(routerProps.match.params.id);
                    if (clubApi.length > 0) {
                        let foundClub = clubApi.find(club => club.id === id);
                        return (<MovieClub movies={props.movies} user={props.user} submitMessage={submitMessage} removeClub={removeClub} key={foundClub.id} club={foundClub} />)
                    }}}/>
                <Route path={'/clubs'} render={() => <ClubList clubs={clubApi} />} />
            </Switch>
           {/* : 
            <Redirect to='/home' />
           } */}
       </div> 
    )
}

export default MovieClubsContainer;