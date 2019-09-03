import React , {Component} from 'react';
import Genre from '../Genre/Genre';
import axios from 'axios';

import classes from './ChooseMovieGenres.module.css';
import Axios from 'axios';

class ChooseMovieGenres extends Component {
  state = {
    selectedGenres: [],
    genreList: null
  }

  componentDidUpdate() {
    console.log(this.state.selectedGenres);
    // console.log(this.state.genreList);
  }

  componentDidMount() {
    this.getGenresHandler();
  }

  getGenresHandler = () => {
    Axios.get('https://api.themoviedb.org/3/genre/movie/list', {
      params: {
        api_key: '4c7294000365c14a8e42109c863ff772',
        language: 'en-US'
      }
    })
    .then(response => {
      // console.log(response);
      this.setState({genreList: response.data.genres});

    }).catch(error => {
      console.log('error: ' + error);
    });
  }


  genreClickHandler = (id) => {
    let newGenres = null;
    const genresCopy = [...this.state.selectedGenres];
    const exists = genresCopy.some((el) => {
      return el === id;
    });
    if (exists) {
      newGenres = genresCopy.filter(genreId => genreId !== id);
    } else {
      newGenres = this.state.selectedGenres.concat(id);
    }
    this.setState({selectedGenres: newGenres});
  }


  onSubmitHandler = () => {
    const uid = localStorage.userId;
    const networks = [...this.state.selectedGenres];
    axios.put('https://mediageek-650c6.firebaseio.com/users/' + uid + '/favMovieGenres.json', networks).then(response => {
      console.log(response);
    }).catch(error => {
      console.log('error ' + error);
    });

    this.props.next();
  }

  render() {
    let genres = null;

    if (this.state.genreList) {
      genres = this.state.genreList.map(gen => {
        return (
          <Genre
            key={gen.id}
            name={gen.name}
            id={gen.id}
            click={this.genreClickHandler}
          />
        );
      });
    }

    return (

      <div className={classes.ChooseMovieGenres}>
        <div className={classes.InnerContainer}>
          <h1>Choose your favorite movie genres</h1>
          <div className={classes.MovieGenresList}>
            {genres}
          </div>
          <button onClick={this.onSubmitHandler} className={classes.ButtonRed}>Next</button>
        </div>
      </div>

    );

  }

}




export default ChooseMovieGenres;