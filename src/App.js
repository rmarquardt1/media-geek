import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import MediaProject from './containers/MediaProject/MediaProject';
import Games from './containers/Games/Games';
import Music from './containers/Music/Music';
import Tv from './containers/Tv/Tv';
import Aux from './hoc/Auxiliary/Auxiliary';
import NavBar from './components/UI/NavBar/NavBar';
import OpenMovie from './containers/OpenMovie/OpenMovie';
import OpenMusic from './containers/Music/OpenMusic/OpenMusic';
import OpenTv from './containers/Tv/OpenTv/OpenTv';
import MovieSearchResults from './containers/MediaProject/SearchResults/SearchResults';
import MusicSearchResults from './containers/Music/SearchResults/SearchResults';
import TvSearchResults from './containers/Tv/SearchResults/SearchResults';
import Home from './containers/Home/Home';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/auth';

// import mgIcon from '../src/assets/images/mg-icon.png';
// import classes from './components/UI/NavLink/NavLink.module.css';

class App extends Component {

  componentDidUpdate() {
    console.log(this.props.isAuthenticated);

  //   if (this.props.isAuthenticated && !localStorage.userData) {
  //     console.log('localData triggered');
  //     axios.get('https://mediageek-650c6.firebaseio.com/users/' + localStorage.userId + '/.json')
  //   .then(response => {
  //     localStorage.setItem('userData', JSON.stringify(response.data));
  //     this.setState({dataLoaded: true});


  //   }).catch(error => {
  //     console.log('error ' + error);
  //   });

  // }

  }

  componentDidMount() {
    this.props.onTryAutoSignup();

  //   if (this.props.isAuthenticated) {
  //     console.log('localData triggered');
  //     axios.get('https://mediageek-650c6.firebaseio.com/users/' + localStorage.userId + '/.json',
  //     {params: {
  //       limit: 20
  //     }}
  //     )
  //   .then(response => {
  //     localStorage.setItem('userData', JSON.stringify(response.data));
  //     this.setState({dataLoaded: true});


  //   }).catch(error => {
  //     console.log('error ' + error);
  //   });

  // }

  }

  render() {
    return (
      <Aux>
         <NavBar />
         {/* {this.props.location.pathname === '/' ?  <Home isAuth={this.props.isAuthenticated} /> : null} */}
         <Route path="/" exact 
        //  component={Home} 
         render={(props) => <Home {...props} isAuth={this.props.isAuthenticated} />}
         
         
         />
          <Route path="/Games" exact component={Games}/> 
          <Route path="/Movies" exact component={MediaProject}/> 
          <Route path="/Music" exact component={Music}/> 
          <Route path="/Tv" exact component={Tv}/> 


          {/* <Route path="/Movies/SearchResults/:search" component={MovieSearchResults} /> */}

          <Route path="/Home" 
            render={(props) => <Home {...props} isAuth={this.props.isAuthenticated} />}
          />

          <Route path="/Movies/SearchResults/:search" 
            render={(props) => <MovieSearchResults {...props} isAuth={this.props.isAuthenticated} />}
          />
          <Route 
          path="/Movies/:id" 
          // component={OpenMovie} 
          render={(props) => <OpenMovie {...props} isAuth={this.props.isAuthenticated} />}
          />



          
          <Route path="/Music/SearchResults/:search" component={MusicSearchResults} />
          <Route path="/Music/Artist/:id" exact component={OpenMusic} />
          <Route path="/Tv/SearchResults/:search" component={TvSearchResults} />
          <Route path="/Tv/:id" exact component={OpenTv} />
          <Route path="/logout" exact component={Logout} />
        </Aux> 
      
    );
  } 
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup:  () => dispatch(actions.authCheckState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
