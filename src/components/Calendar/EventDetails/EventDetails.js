import React, { useState } from 'react';
import EditEvent from '../../../containers/Calendar/EditEvent/EditEvent';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPencilAlt,
  faCalendarTimes
} from '@fortawesome/free-solid-svg-icons';
import classes from './EventDetails.module.css';

const EventDetails = props => {
  const [editEvent, showEditEvent] = useState(false);

  const [description, setDescription] = useState(props.description);
  const [title, setTitle] = useState(props.title);
  const [startDate, setStartDate] = useState(props.startDate);

  

  window.addEventListener('click', event => {
    if (event.target.id === 'eventDetailsContainer') {
      event.target.classList.add(classes.EventDetailsFadeOut);
      props.close();
    }
  });

  const formatAMPM = date => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  };

  const getEventDateTime = date => {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

    const dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];

    const month = monthNames[date.getMonth()];
    const weekday = dayNames[date.getDay()];
    const day = date.getDate();
    const year = date.getFullYear();
    const time = formatAMPM(date);
    return weekday + ' ' + month + ' ' + day + ', ' + year + ' - ' + time;
  };


  const eventOnUpdate = (desc) => {

    setDescription(desc);

  }

  return (
    <div className={classes.EventDetailsContainer} id="eventDetailsContainer">
      <div className={classes.EventDetails}>
        {props.poster ? (
          <img className={classes.PosterImage} src={props.poster} alt="" />
        ) : null}

        <div className={classes.EventInfo}>
          <h1>{title}</h1>
          <h3>{getEventDateTime(startDate)}</h3>
          {/* <p>{props.description}</p> */}
          <p>{description}</p>

          {editEvent ? (
            <EditEvent
              eventDate={startDate}
              title={title}
              description={description}
              id={props.id}
              cancel={() => showEditEvent(false)}
              reloadCalendar={props.reloadCalendar}
              update={eventOnUpdate}
            />
          ) : (
            <div className={classes.EditDelete}>
              <div className={classes.Edit} onClick={() => showEditEvent(true)}>
                <span>Edit</span>
                <FontAwesomeIcon
                  icon={faPencilAlt}
                  className={classes.PencilIcon}
                />
              </div>
              <div className={classes.Remove}>
                <span>Remove</span>
                <FontAwesomeIcon
                  icon={faCalendarTimes}
                  className={classes.RemoveIcon}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
