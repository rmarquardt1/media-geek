import React, { Component, useState, useEffect } from "react";
import axios from "axios";

import classes from "./AccountFavList.module.css";

const AccountFavList = props => {
  const [favGenres, setFavs] = useState(null);

  useEffect(() => {
    if (!favGenres) {
      getFavMovieGenres();
    }
  });

  const getFavMovieGenres = async () => {
    let favs = [];
    await axios
      .get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=4c7294000365c14a8e42109c863ff772&language=en-US"
      )
      .then(response => {
        const favGenres = JSON.parse(localStorage.getItem("userData"))
          .favMovieGenres;
        response.data.genres.map(genre => {
          if (favGenres.includes(genre.id)) {
            favs.push({
              id: genre.id,
              name: genre.name
            });
          }
          return null;
        });
      })
      .catch(error => {
        console.log(error);
      });
    setFavs(favs);
  };

  let genres = null;

  if (favGenres) {
    console.log(favGenres);
    genres = favGenres.map(genre => {
      return <div>{genre.name}</div>;
    });
  }

  return <div>{genres}</div>;
};

export default AccountFavList;
