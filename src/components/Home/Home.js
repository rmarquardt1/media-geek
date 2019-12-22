import React from 'react';
import List from '../../containers/List/List';

import Slider from '../../containers/Slider/Slider';
import Aux from '../../hoc/Auxiliary/Auxiliary';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faTv, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import uiClasses from '../../components/UI/Layout/Layout.module.css';
import classes from './Home.module.css';

const Home = props => (
  <Aux>
    <div className={classes.Home}>

  <Slider />

      <Aux>
        {props.isAuth && localStorage.getItem('userData') ? (
          <Aux>
            <div
              className={uiClasses.SectionHeader + ' ' + uiClasses.PageHeader}
            >
              <div className={uiClasses.PageTitle}>
                <FontAwesomeIcon
                  icon={faUserCircle}
                  className={classes.MoviesIcon}
                />
                <h2 style={{left: '46px'}}>Just For You</h2>
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
        <div className={uiClasses.SectionHeader + ' ' + uiClasses.PageHeader}>
          <div className={uiClasses.PageTitle}>
            <FontAwesomeIcon icon={faFilm} className={classes.MoviesIcon} />
            <h2>Movies</h2>
          </div>
        </div>
        <List listType="inTheatres" mediaType="movies" heading="In Theatres" />
        <List
          listType="upcomingReleases"
          mediaType="movies"
          heading="Upcoming Releases"
        />
        <div className={uiClasses.SectionHeader + ' ' + uiClasses.PageHeader}>
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

export default Home;
