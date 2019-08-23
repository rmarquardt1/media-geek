import React, {Component} from 'react';
import MovieDetails from '../MovieDetails/MovieDetails';
import axios from 'axios';

import uiClasses from '../UI/Layout/Layout.module.css';
import classes from './Movie.module.css';

class Movie extends Component {

  state = {
    posterHeight: null,
    rating: null,
    imdbScore: null,
    rtScore: null,
    mcScore: null
  }

  constructor(props) {
    super(props);
    this.posterRef = React.createRef();
  }

 

  componentDidMount() {
    window.addEventListener('resize', this.resizeHandler);
    this.resizeHandler();
    axios.get(('https://api.themoviedb.org/3/movie/' + this.props.id + '/release_dates'),
    {params: {
      api_key: '4c7294000365c14a8e42109c863ff772'
    }}
    ).then(response => {
      const rated = response.data.results.find(rating => rating.iso_3166_1 === 'US').release_dates[0].certification;
      this.setState({rating: rated});
      this.getRatingsHandler();

    }).catch(error => {
      console.log('error ' + error);
    });

    

  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
  }


  getRatingsHandler = () => {
    axios.get('http://www.omdbapi.com/',
    {params: {
      apikey: 'ec2bd2c4',
      t: this.props.title,
      type: 'movie'
    }}
    ).then(response => {
      // console.log(response.data.Ratings)
      response.data.Ratings.map(rating => {
        console.log(rating.Value);
        if (rating.Source === 'Internet Movie Database') {
          this.setState({imdbScore: rating.Value});
        }
        if (rating.Source === 'Rotten Tomatoes') {
          this.setState({rtScore: rating.Value});
        }
        if (rating.Source === 'Metacritic') {
          this.setState({mcScore: rating.Value});
        }
      });
    }).catch(error => {
      console.log('error ' + error);
    });
  
}







  resizeHandler = () => {
    if (this.posterRef.current) {
      this.setState({posterHeight: this.posterRef.current.clientWidth / 2 + this.posterRef.current.clientWidth}); 
    }
    
  }

  render() {

    // console.log(this.props);
    
    const posterImg = 'url(http://image.tmdb.org/t/p/original/' + this.props.poster + ')';

    return (
      <div className={classes.Movie} onClick={this.props.clicked} >

      {!this.props.poster ? <div><h1>No Image</h1></div> : 
        // <div 
        // style={{background: posterImg + 'no-repeat', backgroundSize: 'cover', backgroundColor:'#000'}}
        // className={classes.Poster}>
        <div 
        className={classes.Poster} 
        ref={this.posterRef}
        style={{minHeight: this.state.posterHeight}}
        >
        <img src={'http://image.tmdb.org/t/p/w342/' + this.props.poster} className={uiClasses.BoxShadow} />
        </div> 
      }
        <MovieDetails
          title={this.props.title}
          release={this.props.release}
          movieId={this.props.id}
          rating={this.state.rating}
          imdb={this.state.imdbScore ? this.state.imdbScore : null} 
          rt={this.state.rtScore ? this.state.rtScore : null} 
          mc={this.state.mcScore === '100/100' ? '100' : this.state.mcScore ? this.state.mcScore.substring(0,2) : null}
        />
      </div>
    );
  }
}

export default Movie;