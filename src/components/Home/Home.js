import React from "react";
import { connect } from "react-redux";
import List from "../../containers/List/List";

import Slider from "../../containers/Slider/Slider";
import Aux from "../../hoc/Auxiliary/Auxiliary";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faTv, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import uiClasses from "../../components/UI/Layout/Layout.module.css";
import classes from "./Home.module.css";

const Home = props => {
  console.log(props.emailId);
  return (
    <Aux>
      <div className={classes.Home}>
        <div className={classes.SliderContainer}>
          <Slider />
        </div>
        <Aux>
          {props.isAuth && localStorage.getItem("userData") ? (
            // {props.isAuth && props.userData ? (
            <Aux>
              <div
                // className={
                //   uiClasses.SectionHeader +
                //   " " +
                //   uiClasses.PageHeader
                // }
                className={
                  props.isAuth
                    ? uiClasses.SectionHeader +
                      " " +
                      uiClasses.PageHeader +
                      " " +
                      classes.PageHeaderFirst
                    : uiClasses.SectionHeader + " " + uiClasses.PageHeader
                }
              >
                <div className={uiClasses.PageTitle}>
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    className={classes.MoviesIcon}
                  />
                  <h2>Just For You</h2>
                </div>
              </div>
              <List
                listType="pickedMovies"
                mediaType="movies"
                heading="Your Movie Picks"
              />
              <List
                listType="pickedTv"
                mediaType="tv"
                heading="Your Television Picks"
              />
            </Aux>
          ) : null}
          {/* <div
            className={
              uiClasses.SectionHeader +
              " " +
              uiClasses.PageHeader +
              " " +
              classes.PageHeaderFirst
            }
          > */}
          <div
            className={
              !props.isAuth
                ? uiClasses.SectionHeader +
                  " " +
                  uiClasses.PageHeader +
                  " " +
                  classes.PageHeaderFirst
                : uiClasses.SectionHeader + " " + uiClasses.PageHeader
            }
          >
            <div className={uiClasses.PageTitle}>
              <FontAwesomeIcon icon={faFilm} className={classes.MoviesIcon} />
              <h2>Movies</h2>
            </div>
          </div>
          <List
            listType="inTheatres"
            mediaType="movies"
            heading="In Theatres"
          />
          <List
            listType="upcomingReleases"
            mediaType="movies"
            heading="Upcoming Releases"
          />
          <div
            className={
              uiClasses.SectionHeader +
              " " +
              uiClasses.PageHeader +
              " " +
              classes.Sect
            }
          >
            <div className={uiClasses.PageTitle}>
              <FontAwesomeIcon icon={faTv} className={classes.TvIcon} />
              <h2>Television</h2>
            </div>
          </div>
          <List
            listType="airingThisWeek"
            mediaType="tv"
            heading="Airing This Week"
          />
          <List listType="airingToday" mediaType="tv" heading="Airing Today" />
        </Aux>
      </div>
    </Aux>
  );
};
// export default Home;

const mapStateToProps = state => {
  return {
    userData: state.userData,
    emailId: state.email
  };
};

export default connect(mapStateToProps)(Home);
