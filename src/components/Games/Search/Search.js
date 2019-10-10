import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import classes from './Search.module.css';
import classesButton from '../../UI/Button/Button.module.css';

const search = props => {
  const searchStyle = !props.submitted
    ? [classes.Search]
    : [classes.Search, classes.Submitted];
  return (
    <div className={searchStyle.join(' ')}>
      <div style={{ position: 'absolute', left: 100 }}>
        <button
          className={
            props.itemOpen
              ? [classesButton.ButtonShow]
              : [classesButton.ButtonHide]
          }
          onClick={props.back}
        >
          Back
        </button>
      </div>
      <form className={classes.SearchForm} onSubmit={props.submit}>
        <input
          className={classes.Input}
          autoFocus={true}
          type="text"
          onChange={props.changed}
        />
        <FontAwesomeIcon
          className={classes.SearchIcon}
          icon={faSearch}
          onClick={props.submit}
        />
      </form>
    </div>
  );
};

export default search;
