import React from "react";

import classes from "./Event.module.css";
import calIcon from "../../../../assets/images/cal-icon.png";

const event = props => {
  const eDate = new Date(props.eventInfo.eventDate);
  const month = [];
  month[0] = "Jan";
  month[1] = "Feb";
  month[2] = "Mar";
  month[3] = "Apr";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "Aug";
  month[8] = "Sept";
  month[9] = "Oct";
  month[10] = "Nov";
  month[11] = "Dec";
  const eMonth = month[eDate.getMonth()];
  const eDay = eDate.getDate();

  return (
    <div className={classes.Event} onClick={props.eventClick}>
      <div
        className={classes.EventImage}
        style={{
          backgroundImage: "url(" + props.eventInfo.images[9].url + ")"
        }}
      ></div>
      <div className={event.Info}>
        <div className={classes.EventName}>{props.eventInfo.name}</div>
        <div className={classes.Venue}>{props.eventInfo.venueName}</div>
        <div className={classes.VenueLocation}>
          {props.eventInfo.venueCity}, {props.eventInfo.venueState}
        </div>
      </div>
      <div
        className={classes.CalIcon}
        style={{ backgroundImage: "url(" + calIcon + ")" }}
      >
        <span className={classes.Month}>{eMonth}</span>
        <span className={classes.Day}>{eDay}</span>
      </div>
    </div>
  );
};

export default event;
