import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import EditEvent from '../../../containers/Calendar/EditEvent/EditEvent';
import RemoveEvent from '../RemoveEvent/RemoveEvent';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPencilAlt,
  faCalendarTimes,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import classes from './EventDetails.module.css';

const EventDetails = props => {
  const [editEvent, showEditEvent] = useState(false);
  const [removeEvent, showRemoveEvent] = useState(false);
  const [description, setDescription] = useState(props.description);
  const [title, setTitle] = useState(props.title);
  const [startDate, setStartDate] = useState(props.startDate);
  let eventDetailsRef = React.createRef();

  window.addEventListener('click', event => {
    if (event.target.id === 'eventDetailsContainer') {
      closeWindow();
    }
  });

  const closeWindow = () => {
    if (eventDetailsRef.current) {
      eventDetailsRef.current.classList.add(classes.EventDetailsFadeOut);
    }
    props.close();
  };

  const formatAMPM = date => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'l.
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

  const eventOnUpdate = (title, desc, start) => {
    setTitle(title);
    setDescription(desc);
    setStartDate(start);
  };

  return (
    <div
      className={classes.EventDetailsContainer}
      id="eventDetailsContainer"
      ref={eventDetailsRef}
      style={props.style ? props.style : null}
    >
      <div className={classes.EventDetails}>
        {props.poster ? (
          <NavLink
            style={{ color: '#fff', textDecoration: 'none', height: '100%' }}
            to={'/Movies/' + props.mediaId}
          >
            <div className={classes.PosterContainer}>
              <img className={classes.PosterImage} src={props.poster} alt="" />
            </div>
          </NavLink>
        ) : null}

        <div className={classes.EventInfo}>
          {!removeEvent ? <h1>{title}</h1> : null}
          {!editEvent && !removeEvent ? (
            <React.Fragment>
              <h3>{getEventDateTime(startDate)}</h3>
              <p>{description}</p>
            </React.Fragment>
          ) : null}
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
          ) : removeEvent ? (
            <RemoveEvent
              eventDate={getEventDateTime(startDate)}
              title={title}
              description={description}
              id={props.id}
              cancel={() => showRemoveEvent(false)}
              close={closeWindow}
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
              <div
                className={classes.Remove}
                onClick={() => showRemoveEvent(true)}
              >
                <span>Remove</span>
                <FontAwesomeIcon
                  icon={faCalendarTimes}
                  className={classes.RemoveIcon}
                />
              </div>
              <div className={classes.Close} onClick={closeWindow}>
                <span>Close</span>
                <FontAwesomeIcon
                  icon={faTimesCircle}
                  className={classes.CloseIcon}
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
