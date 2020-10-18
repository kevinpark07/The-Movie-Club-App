import React, {useState, useEffect} from 'react'
import MovieClub from '../Components/MovieClub';
import MovieClubForm from '../Components/MovieClubForm';
import Search from '../Components/Search';
import ClubList from './ClubList'
import { Route, Switch } from 'react-router-dom'


const MovieClubsContainer = (props) => {

    const [clubApi, setClubApi] = useState([]); 

    useEffect (() => {
        fetch("http://localhost:3000/clubs/")
        .then(res => res.json())
        .then(clubData => setClubApi(clubData))
      }, [])


    const newClub = (clubObj) => {
        fetch("http://localhost:3000/clubs/", {
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
        fetch("http://localhost:3000/clubs/" + clubId, {
            method: "DELETE"
            }).then(resp => resp.json()).then(newClub => {
                console.log(newClub)
                let newArray = clubApi.filter(club => club.id !== clubId);
                setClubApi(newArray);
            })
    }

    return (
       <div>
           <Switch>
                <Route path={'/clubs/create'} render={() => <MovieClubForm newClub={newClub} movies={props.movies} /> } />
                <Route path={'/clubs/:id'} render={(routerProps) => {
                    let id = parseInt(routerProps.match.params.id);
                    if (clubApi.length > 0) {
                        let foundClub = clubApi.find(club => club.id === id);
                        return (<MovieClub removeClub={removeClub} key={foundClub.id} club={foundClub} />)
                    }}}/>
                <Route path={'/clubs'} render={() => <ClubList clubs={clubApi} />} />
           </Switch>
       </div> 
    )
}

export default MovieClubsContainer;