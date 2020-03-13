import React, { Component } from "react";
import NavBar from "../UI/NavBar/NavBar";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import List from "../List/List";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTv } from "@fortawesome/free-solid-svg-icons";
import uiClasses from "../../components/UI/Layout/Layout.module.css";
import classes from "./Tv.module.css";

class Tv extends Component {
  render() {
    return (
      <Aux>
        <NavBar />
        <div className={classes.Tv}>
          <div className={uiClasses.SectionHeader + " " + uiClasses.PageHeader}>
            <div className={uiClasses.PageTitle}>
              <FontAwesomeIcon className={classes.TvIcon} icon={faTv} />
              <h2 style={{ left: "46px" }}>Television</h2>
            </div>
          </div>
          <List listType="popularTv" mediaType="tv" heading="Popular Shows" />
          <List
            listType="topRatedTv"
            mediaType="tv"
            heading="Top Rated Shows"
          />
          <List
            listType="airingThisWeek"
            mediaType="tv"
            heading="Airing This Week"
          />
          <List listType="airingToday" mediaType="tv" heading="Airing Today" />
        </div>
      </Aux>
    );
  }
}

export default Tv;
