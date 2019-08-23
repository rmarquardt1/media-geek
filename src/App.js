import React, {Component} from 'react';
import {Route, NavLink} from 'react-router-dom';
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

import mgIcon from '../src/assets/images/mg-icon.png';
import classes from './components/UI/NavLink/NavLink.module.css';

class App extends Component {



  // componentDidMount() {
  //   const script = document.createElement("script");
  //   script.src = 'https://e-cdns-files.dzcdn.net/js/min/dz.js';
  //   script.async = true;
  //   script.onload = () => this.scriptLoaded();
  //   document.body.appendChild(script);
  // }


  //  scriptLoaded() {
  //   document.window.A.sort();
  // }

  render() {

    return (
        
<Aux>
          {/* {this.props.location.pathname !== '/' ? <NavBar /> : null} */}

          

          {this.props.location.pathname === '/' ? 
          

          <div style={{height:'100%', width:'100%', position:'absolute', margin:'auto'}}>
          <div className={classes.HomeLinksContainer} style={{
            display:'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            position:'absolute', 
            margin:'auto', 
            height:'200px'}}>
              <div style={{display:'flex', alignItems: 'center', justifyContent: 'center'}}>
              <img style={{height:'40px', marginRight: '10px'}} src={mgIcon} />
          <h1>
            
            
            <span style={{fontWeight:'200'}}>media</span><span style={{fontWeight:'600'}}>Geek</span></h1>



              </div>
              
          <div className={classes.HomeLinks}>

           
            
          {/* <NavLink className={classes.HomeLink} to="/Games">Games</NavLink> */}
          <NavLink className={classes.HomeLink} to="/Movies">Movies</NavLink>
          <NavLink className={classes.HomeLink} to="/Music">Music</NavLink>
          <NavLink className={classes.HomeLink} to="/Tv">TV</NavLink>
          </div> 
          </div>
         </div>
          
          
          : null}

          <Route path="/Games" exact component={Games}/> 
          <Route path="/Movies" exact component={MediaProject}/> 
          <Route path="/Music" exact component={Music}/> 
          <Route path="/Tv" exact component={Tv}/> 
          <Route path="/Movies/SearchResults/:search" component={MovieSearchResults} />
          <Route path="/Movies/:id" component={OpenMovie} />
          <Route path="/Music/SearchResults/:search" component={MusicSearchResults} />
          <Route path="/Music/Artist/:id" exact component={OpenMusic} />
          <Route path="/Tv/SearchResults/:search" component={TvSearchResults} />
          <Route path="/Tv/:id" exact component={OpenTv} />


          


          </Aux> 
      
    );
  } 

}

export default App;
