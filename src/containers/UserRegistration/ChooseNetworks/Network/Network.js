import React, { useState, useEffect } from "react";

import uiClasses from "../../../../components/UI/Layout/Layout.module.css";
import classes from "./Network.module.css";

const Network = props => {
  const [fav, setFav] = useState(props.favorite ? true : false);
  let networkRef = React.createRef();
  const bgColor = "#262f3d";
  let networkClass = null;
  let favs = null;

  useEffect(() => {
    networkRef.current.addEventListener("mouseenter", event => {
      if (props.showAll || window.location.pathname === "/registration") {
        event.target.classList.add(classes.NetworkHover);
      } else {
        event.target.classList.remove(classes.NetworkHover);
      }
    });
  });

  const clickHandler = event => {
    if (!fav) {
      setFav(true);
      event.target.style.border = "3px solid #1a8cff";
    }
    if (fav) {
      setFav(false);
      event.target.classList.remove(classes.NetworkHover);
      event.target.style.border = "3px solid transparent";
    }
    const favorite =
      event.target.getAttribute("favorite") === "true" ? true : false;
    event.target.setAttribute("favorite", !favorite);
  };

  if (props.page === "account" && !props.favorite) {
    networkClass =
      classes.Network +
      " " +
      uiClasses.BoxShadow +
      " " +
      classes.Hide +
      " Hide";
    favs = "false";
  } else {
    networkClass = classes.Network + " " + uiClasses.BoxShadow;
    favs = "true";
  }

  return (
    <div
      className={networkClass}
      ref={networkRef}
      favorite={favs}
      itemType="network"
      style={
        props.page === "account"
          ? {
              backgroundImage: "url(" + props.image + ")",
              backgroundColor: bgColor,
              margin: "5px",
              borderRadius: "3px",
              height: "70px",
              width: "120px"
            }
          : {
              backgroundImage: "url(" + props.image + ")",
              backgroundColor: bgColor
            }
      }
      onClick={event => {
        clickHandler(event);
        props.click(props.id);
      }}
    >
      {props.name}
    </div>
  );
};

export default Network;
