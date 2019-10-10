import React, { Component } from 'react';
import Genre from '../Genre/Genre';

import classes from './ChooseTvGenres.module.css';
import Axios from 'axios';

class ChooseTvGenres extends Component {
  state = {
    selectedGenres: [],
    genreList: null
  };

  componentDidMount() {
    this.getGenresHandler();
  }

  getGenresHandler = () => {
    Axios.get('https://api.themoviedb.org/3/genre/tv/list', {
      params: {
        api_key: '4c7294000365c14a8e42109c863ff772',
        language: 'en-US'
      }
    })
      .then(response => {
        this.setState({ genreList: response.data.genres });
      })
      .catch(error => {
        console.log('error: ' + error);
      });
  };

  genreClickHandler = id => {
    let newGenres = null;
    const genresCopy = [...this.state.selectedGenres];
    const exists = genresCopy.some(el => {
      return el === id;
    });
    if (exists) {
      newGenres = genresCopy.filter(genreId => genreId !== id);
    } else {
      newGenres = this.state.selectedGenres.concat(id);
    }
    this.setState({ selectedGenres: newGenres });
  };

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
      <div className={classes.ChooseTvGenres}>
        <div className={classes.InnerContainer}>
          <h1>Choose your favorite Television genres</h1>
          <div className={classes.TvGenresList}>{genres}</div>
          <button
            onClick={this.props.clickNext.bind(
              genres,
              this.state.selectedGenres
            )}
            className={classes.ButtonRed}
          >
            Finish
          </button>
        </div>
      </div>
    );
  }
}

export default ChooseTvGenres;
