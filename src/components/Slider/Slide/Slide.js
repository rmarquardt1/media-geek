import React, { Component } from 'react';
// import LazyLoad from 'react-lazy-load';
import axios from 'axios';

import classes from './Slide.module.css';

class Slide extends Component {
  state = {
    showTitle: false,
    logoUrl: null,

    mobile: false
  };

  componentDidMount() {

    if (window.innerWidth <= 500) {
      this.setState({mobile: true});
    }

    window.addEventListener('resize',() => {

      if (window.innerWidth <= 500) {
        this.setState({mobile: true});
      } else {
        this.setState({mobile: false});
      }


    })


    //this.getLogoHandler();
  }

  // componentDidMount() {
  //   this.getLogoHandler();
  //   this.imageRef.parentElement.addEventListener('scroll', () => {
  //     const slidePos = this.imageRef.clientWidth * this.props.titleId;
  //     if (slidePos === this.props.scrollLeft) {
  //       console.log('triggered: ' + this.props.position);
  //       this.setState({ showTitle: true });
  //     } else {
  //       this.setState({ showTitle: false });
  //     }
  //   });
  // }

  getLogoHandler = () => {
    axios
      .get('http://webservice.fanart.tv/v3/movies/' + this.props.imdbId, {
        params: {
          api_key: 'c3f4fba1e26da407177b194566ca2d3f'
        }
      })
      .then(response => {
        console.log(response.data);
        if (response.data.hdmovielogo[0].url)
          this.setState({
            logoUrl: response.data.hdmovielogo[0].url
          });
      })
      .catch(error => {
        console.log('error ' + error);
      });
  };

  render() {
    return (
      <div 
      className={classes.SliderContainer} 
      style={
        
        this.state.mobile
        ? {backgroundImage: 'url("' + 'http://image.tmdb.org/t/p/w780/' + this.props.bgImage  + '")', backgroundSize: 'cover'}
        : null}>
        <div className={classes.SlideInfo}>
          {this.props.logoUrl ?
          
          
          
          
          (
            <div className={classes.LogoImg}>
              <img src={this.props.logoUrl} alt="" />
            </div>
          ) : (
            <div className={classes.Title}>
              <h1>{this.props.title}</h1>
            </div>
          )}

            {this.props.caption
            ? <div className={classes.CaptionContainer}><h2 className={classes.Caption}>{this.props.caption}</h2></div>
            : <div className={classes.CaptionContainer}></div>
            
            }


{this.props.overview
            ? <div className={classes.Overview}>
            <p>{this.props.overview}</p>
            </div>
            : null}



        </div>

        <img
          className={classes.SliderImage}
          src={'http://image.tmdb.org/t/p/w780/' + this.props.bgImage}
        />
      </div>
    );
  }
}

export default Slide;
