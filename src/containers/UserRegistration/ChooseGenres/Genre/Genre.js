import React, { useState } from "react";
import genreImages from "../../../../references/genreImages";

import uiClasses from "../../../../components/UI/Layout/Layout.module.css";
import classes from "./Genre.module.css";

const Genre = props => {
  const [fav, setFav] = useState(props.favorite ? true : false);
  let bgImage = null;
  const imgArr =
    props.genreType === "movies"
      ? genreImages.movieGenres
      : props.genreType === "tv"
      ? genreImages.tvGenres
      : [];
  bgImage = imgArr
    .map(img => {
      if (img.id === props.id) {
        return img.image;
      } else {
        return null;
      }
    })
    .join("");

  const clickHandler = event => {
    if (!fav) {
      setFav(true);
      event.target.style.border = '3px solid #1a8cff';
    }
    if (fav) {
      setFav(false);
      event.target.style.border = '0px solid rgba(0,0,0,0.5) ';
    }
    const favorite =
      event.target.getAttribute("favorite") === "true" ? true : false;
    event.target.setAttribute("favorite", !favorite);
  };

  let genreClass = null;
  let favs = null;

  if (props.page === "account" && !props.favorite) {
    genreClass =
      classes.Genre + " " + uiClasses.BoxShadow + " " + classes.Hide + " Hide";
    favs = "false";
  } else {
    genreClass = classes.Genre + " " + uiClasses.BoxShadow;
    favs = "true";
  }

  return (
    <div
      className={genreClass}
      favorite={favs}
      style={
        props.page === "account"
          ? {
              backgroundImage: bgImage
                ? "radial-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(" +
                  bgImage +
                  ")"
                : null,
              margin: "5px",
              borderRadius: "3px",
              height: "70px",
              width: "120px"
            }
          : null
      }
      onClick={
        props.showAll
          ? event => {
              clickHandler(event);
              props.click(props.id);
            }
          : null
      }
    >
      {props.name}
    </div>
  );
};

export default Genre;
