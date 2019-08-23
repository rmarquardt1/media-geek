import React, {Component} from 'react';
import ActorMovie from '../ActorMovie/ActorMovie';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { goToAnchor } from 'react-scrollable-anchor'
import { configureAnchors } from 'react-scrollable-anchor'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Movie from '../../Movie/Movie';

import uiClasses from '../../UI/Layout/Layout.module.css';
import classes from './OpenActor.module.css';
import noImage from '../../../assets/images/no-image-person.png';


configureAnchors({offset: -60, scrollDuration: 100});

  class OpenActor extends Component {

    

    state = {


      bioOpen: false,
      bioFull: this.props.actorBio.bio,
      bioSubString: this.props.actorBio.bio.substr(0, 630),
      bioLength: this.props.actorBio.bio.length,
      bioString: this.props.actorBio.bio,
      









      sliceStart: 0,
      sliceEnd: null,
      pageSize: null,
      

    }


    constructor(props) {
      super(props);
      this.elementRef = React.createRef();
    }

    componentDidMount() {
      if (this.state.bioLength > 630) {
        this.setState({bioString: this.state.bioSubString + '...'});
      }



      this.resizeHandler();
      window.addEventListener('resize', this.resizeHandler);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.resizeHandler);
    }
    

    resizeHandler = () => {
      const windowW = window.innerWidth;
      if (this.elementRef.current) {
        const elWidth = this.elementRef.current.clientWidth;
        const thumbWidth = windowW < 769 ? 120 : windowW < 1367 ? 170 : 180;
        const elCount = Math.floor(elWidth / thumbWidth);
        if (windowW < 501) {
          this.setState({
            sliceEnd: (this.state.sliceStart + elCount) * 2, pageSize: elCount
          });
        } else {
          this.setState({
            sliceEnd: this.state.sliceStart + elCount, pageSize: elCount
          });
        } 
      }
    }

    onClick = (movie) => {
      window.scrollTo(0, 0);
      console.log('clicked');
      console.log(this.props.openMovieClick.bind(this, movie.id));
      this.props.openMovieClick(movie.id);
      this.props.close();
    }

    readMoreHandler = () => {

      // if (this.state.bioOpen) {
      //   goToAnchor('castSection');
      // }
      // this.setState({bioOpen: !this.state.bioOpen});

      if (!this.state.bioOpen) {
        this.setState({bioString: this.state.bioFull, bioOpen: !this.state.bioOpen});
      } else {
        this.setState({bioString: this.state.bioSubString + '...', bioOpen: !this.state.bioOpen});
        goToAnchor('castSection');
      }





    }


    render() {
      console.log(this.props.actorBio.pic);
      // const actorMovies =  this.props.movies.results.slice(this.state.sliceStart, this.state.sliceEnd).map(movie => {
      //   return (
      //     <ActorMovie
      //       key={movie.id}
      //       title={movie.title}
      //       poster={movie.poster_path}
      //       release={movie.releaseDate}
      //       id={movie.id}
      //       clicked={this.onClick.bind(this, movie)}
      //     />
      //   )
      // });

      const actorPic = this.props.actorBio.pic ? this.props.actorInfo.profilePic : noImage;

      return (
        <div style={{width: '100%'}}>
        <div className={classes.OpenActor}>
          <div className={uiClasses.Close} style={{right:'10px', top: '7px'}} onClick={this.props.close}>
            <FontAwesomeIcon icon={faTimesCircle} className={uiClasses.CloseIcon} />
          </div>
          
    
          <div className={classes.ProfilePic}>
           
            <img src={actorPic} className={uiClasses.BoxShadow} style={{width: '100%', maxWidth:'240px'}} />
          </div>
          <div className={classes.ActorInfo}>
            <h2>{this.props.actorInfo.actorName}</h2>
            <div className={classes.CharacterName}>({this.props.character})</div>
            <hr className={classes.Divider} />
          <div>



            <p className={classes.ActorBioOpen}>{this.state.bioString}</p>

            {this.state.bioLength > 630 && !this.state.bioOpen ?
            <p className={classes.ShowHide} onClick={this.readMoreHandler}>Read More...</p>
            : this.state.bioLength > 630 && this.state.bioOpen ?
            <p className={classes.ShowHide} onClick={this.readMoreHandler}>Read Less...</p>
            : null
          }









            {/* {this.state.bioOpen ? 
              <Aux>
              <p className={classes.ActorBioOpen}>{this.props.actorBio.bio}</p>
              <div className={classes.ShowHide} onClick={this.readMoreHandler}>Read Less...</div>
              </Aux>
              : 
              <Aux>
              <p className={classes.ActorBioClosed}>{this.props.actorBio.bio}</p>
              <div className={classes.ShowHide} onClick={this.readMoreHandler} >Read More...</div>
              </Aux>
            } */}







          </div>
        </div>
    
        </div>
    
    
        <h2 style={{marginLeft:'10px'}}>Other Movies with {this.props.actorInfo.actorName}</h2>
        <div ref={this.elementRef} className={classes.ActorMovies}>
          {/* {actorMovies} */}
        </div>
        </div>
    
      );

    }

  }



export default OpenActor;