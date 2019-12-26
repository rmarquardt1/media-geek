import React from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBan,
  faCalendarCheck
} from '@fortawesome/free-solid-svg-icons';
import classes from './RemoveEvent.module.css';

const RemoveEvent = props => {

  const removeEventHandler = () => {
    const uid = localStorage.getItem('userId');
    axios
    .delete(
      "https://mediageek-650c6.firebaseio.com/users/" +
        uid +
        "/events/" +
        props.id +
        ".json"
    )
      .then(() => {
        props.reloadCalendar();
        props.close();
      })
      .catch(error => {
        console.log('error ' + error);
      });
  }

  return (
    <div className={classes.RemoveEvent}>
      <h2>The following event will be removed from your calendar</h2>
      <p className={classes.EventInfo}>
        <span className={classes.Title}>{props.title}</span><br />
        <span className={classes.Date}>{props.eventDate}</span>
        </p>
      <div className={classes.RemoveCancel}>
      <p className={classes.Proceed} >Would you like to proceed?</p>
        <div 
        className={classes.Remove} 
        onClick={removeEventHandler}
        >
          <span>Yes. Remove Event</span>
          <FontAwesomeIcon
            icon={faCalendarCheck}
            className={classes.RemoveIcon}
          />
        </div>
        <div 
        className={classes.Cancel} 
        onClick={props.cancel}
        >
          <span>Cancel</span>
          <FontAwesomeIcon
            icon={faBan}
            className={classes.CancelIcon}
          />
        </div>
      </div>
    </div>
  );
}

export default RemoveEvent;