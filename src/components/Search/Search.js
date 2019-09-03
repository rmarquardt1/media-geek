import React from 'react';
import SideBar from '../../containers/Home/SideBar/SideBar';
import Aux from '../../hoc/Auxiliary/Auxiliary';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilm, faHeadphones, faGamepad, faMask, faTv } from '@fortawesome/free-solid-svg-icons';
import classes from './Search.module.css';

  const search = (props) => {



    // const searchStyle = !props.submitted ? [classes.Search] : [classes.Search, classes.Submitted];


    const searchStyle = [classes.Search];

    const searchType = props.searchType === 'movie' ? 
      <div className={classes.SearchType}>
      <FontAwesomeIcon 
      className={classes.SearchTypeIcon}
      icon={faFilm}  />
      Movies
      </div> 

      : props.searchType === 'music' ? 
      <div className={classes.SearchType}>
      <FontAwesomeIcon 
      className={classes.SearchTypeIcon}
      icon={faHeadphones}  />
      Music
      </div>

      : props.searchType === 'tv' ? 
      <div className={classes.SearchType}>
      <FontAwesomeIcon 
      className={classes.SearchTypeIcon}
      icon={faTv}  />
      Television
      </div>

      : props.searchType === 'game' ? 
      <div className={classes.SearchType}>
      <FontAwesomeIcon 
      className={classes.SearchTypeIcon}
      icon={faGamepad}  />
      Games
      </div>

      : props.searchType === 'comics' ? 
      <div className={classes.SearchType}>
      <FontAwesomeIcon 
      className={classes.SearchTypeIcon}
      icon={faMask}  />
      Comics
      </div>
        
      : null;

      // const url = props.searchType === 'movie' ? '/Movies/SearchResults' 
      // : props.searchType === 'music' ? '/Music/SearchResults'
      // : props.searchType === 'game' ? '/Games/SearchResults'
      // : props.searchType === 'comics' ? '/Comics/SearchResults'
      // : null;

      return (
        <Aux>
          <SideBar />
          <div className={classes.SearchContainer}>
          <div  className={searchStyle.join(' ')}>
            {/* <div style={{position: 'absolute', left:100}}>
              <div 
              className={props.itemOpen ? [classes.BackIcon] : [classes.BackIconHide] }
              onClick={props.back}>
            <FontAwesomeIcon 
                  className={classes.BackIcon}
                  icon={faArrowAltCircleLeft}  />

              </div>
            </div> */}
            
            <form className={classes.SearchForm} onSubmit={props.submit}>
            {/* <form className={classes.SearchForm} onSubmit={'hello'}> */}
              {searchType}
              <div>
              <input 
                className={classes.Input}
                autoFocus={true} 
                type="text" 
                onChange={props.changed}
                placeholder={props.placeholder}  />
              <FontAwesomeIcon 
                className={classes.SearchIcon}
                icon={faSearch} 
                onClick={props.submit} />
                </div>
            </form>
            </div>
          </div>
          
          </Aux>
    );
  }

export default search;