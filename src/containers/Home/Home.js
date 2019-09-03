import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import InTheatres from './InTheatres/InTheatres';
import UpcomingMovies from './UpcomingMovies/UpcomingMovies';
import PopularMovies from './PopularMovies/PopularMovies';
import TopRatedMovies from './TopRatedMovies/TopRatedMovies';
import PopularTv from './PopularTv/PopularTv';
import OnTheAirTv from './OnTheAirTv/OnTheAirTv';
import AiringTodayTv from './AiringTodayTv/AiringTodayTv';
import TopRatedTv from './TopRatedTv/TopRatedTv';
import PickedForYouMovies from './PickedForYouMovies/PickedForYouMovies';
import PickedForYouTv from './PickedForYouTv/PickedForYouTv';
import SideBar from './SideBar/SideBar';
import UserRegistration from '../UserRegistration/UserRegistration';

import ChooseNetworks from '../ChooseNetworks/ChooseNetworks';
import ChooseMovieGenres from '../ChooseGenres/ChooseMovieGenres/ChooseMovieGenres';
import ChooseTvGenres from '../ChooseGenres/ChooseTvGenres/ChooseTvGenres';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import NavSearch from '../../components/Search/NavSearch/NavSearch';
import uiClasses from '../../components/UI/Layout/Layout.module.css';
import classes from './Home.module.css';

class Home extends Component {

  state = {
    inTheatres: null,
    popularMovies: null,
    topRatedMovies: null,
    upcomingMovies: null,
    showRegistration: false,
    showNetworks: false,
    showMovieGenres: false,
    showTvGenres: false,
    dataLoaded: false
  }

  registrationHandler = () => {
    this.setState({
      showRegistration: true,
      showNetworks: false,
      showMovieGenres: false,
      showTvGenres: false
    });
  }

  showNetworksHandler = () => {
    this.setState({
      showRegistration: false,
      showNetworks: true,
      showMovieGenres: false,
      showTvGenres: false
    });
  }

  showMovieGenresHandler = () => {
    this.setState({
      showRegistration: false,
      showNetworks: false,
      showMovieGenres: true,
      showTvGenres: false
    });
  }

  showTvGenresHandler = () => {
    this.setState({
      showRegistration: false,
      showNetworks: false,
      showMovieGenres: false,
      showTvGenres: true
    });
  }

  showHomeHandler = () => {
    this.setState({
      showRegistration: false,
      showNetworks: false,
      showMovieGenres: false,
      showTvGenres: false
    });
  }


  



  render() {
    // console.log('isAuth: ' + this.props.isAuth);

    
    // console.log(JSON.parse(localStorage.userData));
    return (

      <Aux>
        <SideBar clickCreate={this.registrationHandler} isAuth={this.props.isAuth} />



        {this.state.showRegistration ? <UserRegistration next={this.showNetworksHandler} /> 
          : this.state.showNetworks ? <ChooseNetworks next={this.showMovieGenresHandler} />
          : this.state.showMovieGenres ? <ChooseMovieGenres next={this.showTvGenresHandler} /> 
          : this.state.showTvGenres ? <ChooseTvGenres next={this.showHomeHandler} /> : <div className={classes.Home}>









            <Aux>
            {this.props.isAuth ? 
            <Aux>
            <div style={{marginBottom: '10px'}} className={uiClasses.SectionHeader}>
              <h2 >Just For You</h2>
            </div>
            <PickedForYouMovies />
            <PickedForYouTv />
              </Aux>
          
            : null}

            {/* <PickedForYouMovies /> */}
            



            <div className={uiClasses.SectionHeader + ' ' + classes.SectionHeaderSearch}>
            <h2>Movies<NavSearch placeholder="Search Movies" searchType='movies' /></h2>
            </div>
            <InTheatres />
            <UpcomingMovies />
            <PopularMovies />
            <TopRatedMovies />
            <div className={uiClasses.SectionHeader + ' ' + classes.SectionHeaderSearch}>
              <h2>Television<NavSearch placeholder="Search Television" searchType='tv' /></h2>
            </div>
            <PopularTv />
            <TopRatedTv />
            <OnTheAirTv />
            <AiringTodayTv />
            </Aux>





          
          
        </div>
        } 

        </Aux>
      




    );




  }

}

const mapStateToProps = state => {
  return {
    tokenId: state.tokenId,
    // userDataLoaded: state.userData
  };
}

export default connect(mapStateToProps)(Home);