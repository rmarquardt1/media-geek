import React, { useState, useEffect } from "react";
import Genre from "../Genre/Genre";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faCheck } from "@fortawesome/free-solid-svg-icons";
import classes from "./ChooseMovieGenres.module.css";
import genreClasses from "../Genre/Genre.module.css";

const ChooseMovieGenres = props => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genreList, setGenreList] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    getGenresHandler();
  }, []);

  useEffect(() => {
    if (props.reload) {
      reloadGenresHandler();
      props.reloaded();
    }
  });

  let genresRef = React.createRef();
  let editRef = React.createRef();
  let confirmRef = React.createRef();

  const getGenresHandler = () => {
    axios
      .get("https://api.themoviedb.org/3/genre/movie/list", {
        params: {
          api_key: "4c7294000365c14a8e42109c863ff772",
          language: "en-US"
        }
      })
      .then(response => {
        setGenreList(response.data.genres);
      })
      .catch(error => {
        console.log("error: " + error);
      });
  };

  const reloadGenresHandler = () => {
    const favFalse = genresRef.current.querySelectorAll("div[favorite=false]");
    const favTrue = genresRef.current.querySelectorAll("div[favorite=true]");
    for (let i = 0; i < favFalse.length; i++) {
      favFalse[i].style.display = "none";
      favFalse[i].classList.remove(genreClasses.GenreHover);
    }
    for (let i = 0; i < favTrue.length; i++) {
      favTrue[i].style.border = "0px solid rgba(0,0,0,0.5)";
      favTrue[i].style.transition = "none";
      favTrue[i].classList.remove(genreClasses.GenreHover);
    }
    editRef.current.style.display = "block";
    confirmRef.current.style.display = "none";
    setShowAll(false);
  };

  const showHideGenresHandler = event => {
    const favGenres = genresRef.current.querySelectorAll("div[favorite=true]");
    const genres = genresRef.current.querySelectorAll("div[favorite=false]");

    Object.keys(favGenres).map(k => {
      favGenres[k].style.border = "3px solid #1a8cff";
    });

    if (event.currentTarget.id === "edit") {
      editRef.current.style.display = "none";
      confirmRef.current.style.display = "block";
    }
    if (event.currentTarget.id === "confirm") {
      editRef.current.style.display = "block";
      confirmRef.current.style.display = "none";
    }
    if (!showAll) {
      Object.keys(favGenres).map(k => {
        favGenres[k].classList.add(genreClasses.GenreHover);
      });
      for (let i = 0; i < genres.length; i++) {
        genres[i].style.display = "flex";
        genres[i].classList.add(genreClasses.GenreHover);
      }
      setShowAll(!showAll);
    } else {
      for (let i = 0; i < genres.length; i++) {
        genres[i].style.display = "none";
        Object.keys(favGenres).map(k => {
          favGenres[k].style.border = "0px solid rgba(0,0,0,0.5)";
          favGenres[k].style.transition = "none";
          favGenres[k].classList.remove(genreClasses.GenreHover);
        });
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
    console.log(newGenres);
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
          genreType="movies"
          click={
            props.page === "account" && showAll
              ? () => props.updateGenres(gen.id)
              : genreClickHandler
          }
          page={props.page}
          favorite={
            props.page === "account"
              ? JSON.parse(
                  localStorage.getItem("userData")
                ).favMovieGenres.includes(gen.id)
                ? true
                : false
              : null
          }
        />
      );
    });
  }

  return (
    <div
      className={classes.ChooseMovieGenres}
      style={
        props.page === "account"
          ? {
              paddingLeft: 0,
              paddingTop: 0,
              justifyContent: "flex-start",
              marginBottom: "30px"
            }
          : null
      }
    >
      <div
        className={classes.InnerContainer}
        style={
          props.page === "account"
            ? {
                alignItems: "flex-start"
              }
            : null
        }
      >
        {props.page === "account" ? (
          <div style={{ display: "flex", width: "100%" }}>
            <h1
              style={
                props.page === "account"
                  ? {
                      fontSize: "24px",
                      fontWeight: "normal",
                      marginBottom: "10px"
                    }
                  : null
              }
            >
              {props.page === "account"
                ? "Favorite Movie Genres"
                : "Choose your favorite movie genres"}
            </h1>
            {props.page === "account" ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexGrow: "1"
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
            props.page === "account"
              ? {
                  justifyContent: "flex-start"
                }
              : null
          }
        >
          {genres}
        </div>

        {props.page !== "account" ? (
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
