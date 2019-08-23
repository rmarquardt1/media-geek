import React, {Component} from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';
import MusicDetails from '../../../components/Music/MusicDetails/MusicDetails';
import Loader from '../../../components/UI/Loader/Loader';

import classes from './MusicComp.module.css';

class MusicComp extends Component {
  state = {
    imgLoaded: false,
    artistPoster: this.props.poster,
    show: false
  }


  // componentDidUpdate() {
  //   console.log('componentDidUpdate');
  // }

  componentDidMount() {
    // console.log(this.state.artistPoster);
    
    if (this.state.artistPoster === 'https://e-cdns-images.dzcdn.net/images/artist//500x500-000000-80-0-0.jpg') {
      // console.log('triggered');
      this.checkImageHandler();
    }
    if (this.state.artistPoster === 'https://cdns-images.dzcdn.net/images/artist//500x500-000000-80-0-0.jpg') {
      this.checkImageHandler();
    } else {
      this.setState({show: true});
    }
 
  }

  


  
  checkImageHandler = () => {
    
    // console.log(this.state.artistPoster);
    // const poster = this.state.artistPoster;


    // if (poster === 'https://cdns-images.dzcdn.net/images/artist//500x500-000000-80-0-0.jpg' || 'https://e-cdns-images.dzcdn.net/images/artist//500x500-000000-80-0-0.jpg') {
    
    axios.get('https://api.deezer.com/artist/' + this.props.id + '/albums',{
      params: {
        limit: 1
      }
    })
    .then(response => {
      
      if (response.data.data[0].cover_big) {
        
        this.setState({artistPoster: response.data.data[0].cover_big, show: true});
      }
      
      
      // this.setState({albumResults: response.data, albumsNext: response.data.next, albumsLoaded: true});
      // console.log(this.state.albumResults);
    }).catch(error => {
      this.setState({artistPoster: null, show:false});
      // console.log('error: ' + error);
    });
  // }
  }



render() {

  // console.log(this.props);


  






  return (



    this.state.show ? 
    <NavLink style={{color:'#fff', textDecoration: 'none'}} to={'/Music/Artist/' + this.props.id}>
    <div 
    className={classes.Movie} 
    
    
    >
      {/* <div 
      style={{background: posterImg + 'no-repeat', backgroundSize: 'cover', backgroundColor:'rgba(0,0,0,0.3)', backgroundPosition: 'center', position: 'relative'}} */}
      
      <div 
      style={{position: 'relative'}}
      className={classes.Poster}>

        <div style={{background:'rgba(0,0,0,0.85)', position:'absolute', height:'100%', width:'100%'}} />

        {this.state.imgLoaded ? null : <Loader addStyle={{margin: 'auto'}} />}

        <img alt=""
            style={this.state.imgLoaded ? {} : {display: 'none'}}
            // src={this.state.altPoster ? this.state.altPoster : this.props.poster}
            src={this.state.artistPoster}
            onLoad={() => this.setState({imgLoaded: true})}
            onError={() => this.setState({imgLoaded: true})}
          />

          

      </div>

      <MusicDetails
        title={this.props.title}
        release={this.props.release}
        artistId={this.props.id}
        // deck={this.props.deck}
      />
      


    </div>
    </NavLink>
   : null
  )
}
}

export default MusicComp;