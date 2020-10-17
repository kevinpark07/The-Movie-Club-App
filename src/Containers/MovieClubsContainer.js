import React, {useState, useEffect} from 'react'
import MovieClub from '../Components/MovieClub';
import MovieClubForm from '../Components/MovieClubForm';
import Search from '../Components/Search';
import ClubList from './ClubList'
import { Route, Switch } from 'react-router-dom'


const MovieClubsContainer = (props) => {

    const [clubApi, setClubApi] = useState([]); 

    useEffect (() => {
        fetch("http://localhost:3000/clubs")
        .then(res => res.json())
        .then(clubData => setClubApi(clubData))
      }, [])

    const renderClubs = () => {
        return clubApi.map(club => <MovieClub key={club.id} club={club} />)
    }


    return (
       <div>
           <Switch>
                <Route path={'/clubs/:id'} render={(routerProps) => {
                    let id = parseInt(routerProps.match.params.id);
                    if (clubApi.length > 0) {
                        let foundClub = clubApi.find(club => club.id === id);
                        console.log(foundClub)
                        return (<MovieClub key={foundClub.id} club={foundClub} />)
                }}}/>
                <Route path={'/clubs'} render={() => <ClubList clubs={clubApi} />} />
           </Switch>
       </div> 
    )
}

export default MovieClubsContainer;