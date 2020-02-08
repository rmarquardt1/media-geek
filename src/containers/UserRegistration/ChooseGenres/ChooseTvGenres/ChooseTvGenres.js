import React, { useState, useEffect } from "react";
import Genre from "../Genre/Genre";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faCheck } from "@fortawesome/free-solid-svg-icons";
import classes from "./ChooseTvGenres.module.css";
import axios from "axios";

// class ChooseTvGenres extends Component {
const ChooseTvGenres = props => {
  // state = {
  //   selectedGenres: [],
  //   genreList: null
  // };

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genreList, setGenreList] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    getGenresHandler();
  }, []);

  let genresRef = React.createRef();
  let editRef = React.createRef();
  let confirmRef = React.createRef();

  // componentDidMount() {
  //   this.getGenresHandler();
  // }

  const getGenresHandler = () => {
    axios
      .get("https://api.themoviedb.org/3/genre/tv/list", {
        params: {
          api_key: "4c7294000365c14a8e42109c863ff772",
          language: "en-US"
        }
      })
      .then(response => {
        // this.setState({ genreList: response.data.genres });
        setGenreList(response.data.genres);
      })
      .catch(error => {
        console.log("error: " + error);
      });
  };

  const showHideGenresHandler = event => {
    const genres = genresRef.current.querySelectorAll("div[favorite=false]");

    if (event.currentTarget.id === "edit") {
      editRef.current.style.display = "none";
      confirmRef.current.style.display = "block";
    }
    if (event.currentTarget.id === "confirm") {
      editRef.current.style.display = "block";
      confirmRef.current.style.display = "none";
    }
    if (!showAll) {
      for (let i = 0; i < genres.length; i++) {
        genres[i].style.display = "flex";
      }
      setShowAll(!showAll);
    } else {
      for (let i = 0; i < genres.length; i++) {
        genres[i].style.display = "none";
      }
      setShowAll(!showAll);
    }
  };

  const genreClickHandler = id => {
    let newGenres = null;
    const genresCopy = [...this.state.selectedGenres];
    const exists = genresCopy.some(el => {
      return el === id;
    });
    if (exists) {
      newGenres = genresCopy.filter(genreId => genreId !== id);
    } else {
      newGenres = selectedGenres.concat(id);
    }
    // this.setState({ selectedGenres: newGenres });
    setSelectedGenres(newGenres);
  };

  // render() {
  let genres = null;

  if (genreList) {
    genres = genreList.map(gen => {
      return (
        <Genre
          key={gen.id}
          name={gen.name}
          id={gen.id}
          showAll={showAll}
          genreType="tv"
          click={
            props.page === "account" && showAll
              ? () => props.updateGenres(gen.id)
              : genreClickHandler
          }
          page={props.page}
          favorite={
            JSON.parse(localStorage.getItem("userData")).favTvGenres.includes(
              gen.id
            )
              ? true
              : false
          }
        />
      );
    });
  }

  // if (this.state.genreList) {
  //   genres = this.state.genreList.map(gen => {
  //     return (
  //       <Genre
  //         key={gen.id}
  //         name={gen.name}
  //         id={gen.id}
  //         click={this.genreClickHandler}
  //       />
  //     );
  //   });
  // }
  return (
    <div
      className={classes.ChooseTvGenres}
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
                ? "Favorite Television Genres"
                : "Choose your favorite television genres"}
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
          className={classes.TvGenresList}
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

        {!props.page === "account" ? (
          <button
            onClick={
              props.clickNext
                ? props.clickNext.bind(genres, selectedGenres)
                : null
            }
            className={classes.ButtonRed}
          >
            Finish
          </button>
        ) : null}
      </div>
    </div>

    // <div className={classes.ChooseTvGenres}>
    //   <div className={classes.InnerContainer}>
    //     <h1>Choose your favorite Television genres</h1>
    //     <div className={classes.TvGenresList}>{genres}</div>
    //     <button
    //       onClick={this.props.clickNext.bind(
    //         genres,
    //         this.state.selectedGenres
    //       )}
    //       className={classes.ButtonRed}
    //     >
    //       Finish
    //     </button>
    //   </div>
    // </div>
  );
  // }
};

export default ChooseTvGenres;
