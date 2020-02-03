import React, { useState, useEffect } from 'react';
import Genre from '../Genre/Genre';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faCheck } from '@fortawesome/free-solid-svg-icons';
import classes from './ChooseMovieGenres.module.css';

const ChooseMovieGenres = props => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genreList, setGenreList] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    getGenresHandler();
  }, []);

  let genresRef = React.createRef();
  let editRef = React.createRef();
  let confirmRef = React.createRef();

  const getGenresHandler = () => {
    axios
      .get('https://api.themoviedb.org/3/genre/movie/list', {
        params: {
          api_key: '4c7294000365c14a8e42109c863ff772',
          language: 'en-US'
        }
      })
      .then(response => {
        setGenreList(response.data.genres);
      })
      .catch(error => {
        console.log('error: ' + error);
      });
  };

  const showHideGenresHandler = event => {
    const genres = genresRef.current.querySelectorAll('div[favorite=false]');

    if (event.currentTarget.id === 'edit') {
      editRef.current.style.display = 'none';
      confirmRef.current.style.display = 'block';
    }
    if (event.currentTarget.id === 'confirm') {
      editRef.current.style.display = 'block';
      confirmRef.current.style.display = 'none';
    }
    if (!showAll) {
      for (let i = 0; i < genres.length; i++) {
        genres[i].style.display = 'flex';
      }
      setShowAll(!showAll);
    } else {
      for (let i = 0; i < genres.length; i++) {
        genres[i].style.display = 'none';
      }
      setShowAll(!showAll);
    }
  };

  const genreClickHandler = id => {
    let newGenres = null;
    const genresCopy = [...selectedGenres];
    const exists = genresCopy.some(el => {
      return el === id;
    });
    if (exists) {
      newGenres = genresCopy.filter(genreId => genreId !== id);
    } else {
      newGenres = selectedGenres.concat(id);
    }
    setSelectedGenres(newGenres);
  };

  let genres = null;

  if (genreList) {
    genres = genreList.map(gen => {
      return (
        <Genre
          key={gen.id}
          name={gen.name}
          id={gen.id}
          showAll={showAll}
          click={
            props.page === 'account' && showAll
              ? () => props.updateGenres(gen.id)
              : genreClickHandler
          }
          page={props.page}
          favorite={
            JSON.parse(
              localStorage.getItem('userData')
            ).favMovieGenres.includes(gen.id)
              ? true
              : false
          }
        />
      );
    });
  }

  return (
    <div
      className={classes.ChooseMovieGenres}
      style={
        props.page === 'account'
          ? {
              paddingLeft: 0,
              paddingTop: 0,
              justifyContent: 'flex-start'
            }
          : null
      }
    >
      <div
        className={classes.InnerContainer}
        style={
          props.page === 'account'
            ? {
                alignItems: 'flex-start'
              }
            : null
        }
      >
        {props.page === 'account' ? (
          <div style={{ display: 'flex', width: '100%' }}>
            <h1
              style={
                props.page === 'account'
                  ? {
                      fontSize: '24px',
                      fontWeight: 'normal',
                      marginBottom: '10px'
                    }
                  : null
              }
            >
              {props.page === 'account'
                ? 'Favorite Movie Genres'
                : 'Choose your favorite movie genres'}
            </h1>
            {props.page === 'account' ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexGrow: '1'
                }}
              >
                <div
                  onClick={event => showHideGenresHandler(event)}
                  className={classes.Edit}
                  id="edit"
                  ref={editRef}
                >
                  <FontAwesomeIcon icon={faPencilAlt} />
                </div>
                <div
                  onClick={event => showHideGenresHandler(event)}
                  className={classes.Confirm}
                  id="confirm"
                  ref={confirmRef}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
        <div
          ref={genresRef}
          className={classes.MovieGenresList}
          style={
            props.page === 'account'
              ? {
                  justifyContent: 'flex-start'
                }
              : null
          }
        >
          {genres}
        </div>

        {!props.page === 'account' ? (
          <button
            onClick={
              props.clickNext
                ? props.clickNext.bind(genres, selectedGenres)
                : null
            }
            className={classes.ButtonRed}
          >
            Next
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default ChooseMovieGenres;
