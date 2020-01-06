import React from "react";

// import ThorPoster from "../../../assets/images/thor_poster.jpg";
import mgLogo from "../../../assets/images/mg-icon.png";
import classes from "./AllEvents.module.css";

const allEvents = props => {
  const formatAMPM = date => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'l.
    minutes = minutes < 10 ? "0" + minutes : minutes;
    const strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };

  const getEventDateTime = date => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec"
    ];
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    const month = monthNames[date.getMonth()];
    const weekday = dayNames[date.getDay()];
    const day = date.getDate();
    const year = date.getFullYear();
    const time = formatAMPM(date);
    return weekday + " " + month + " " + day + ", " + year + " - " + time;
  };

  const sortedEvents = props.events
    .slice()
    .sort((a, b) => b.start - a.start)
    .reverse();
  const events = sortedEvents.map((ev, key) => {
    const currentTime = new Date(Date.now());
    const currentDate = new Date(
      currentTime.getFullYear(),
      currentTime.getMonth(),
      currentTime.getDate()
    );

    const eventDate = new Date(
      ev.start.getFullYear(),
      ev.start.getMonth(),
      ev.start.getDate()
    );

    if (eventDate.getTime() >= currentDate.getTime()) {
      return (
        <div
          className={classes.Event}
          key={key}
          onClick={() => props.showDetails(ev)}
        >
          <div
            className={
              ev.poster
                ? classes.PosterContainer
                : classes.PosterContainerNoImage
            }
          >
            {!ev.poster ? <div className={classes.Overlay} /> : null}
            <img
              className={classes.PosterImage}
              src={ev.poster ? ev.poster : mgLogo}
              alt=""
            />
            {/* <img className={classes.PosterImage} src={ThorPoster} alt="" /> */}
          </div>
          <div className={classes.EventInfo}>
            <div className={classes.Date}>{getEventDateTime(ev.start)}</div>
            <div className={classes.Title}>{ev.title}</div>
            <div className={classes.Description}>{ev.desc}</div>
          </div>
        </div>
      );
    }
  });

  return <div className={classes.AllEvents}>{events}</div>;
};

export default allEvents;










// import React from 'react';

// import mgLogo from '../../../assets/images/mg-icon.png';
// import classes from './AllEvents.module.css';

// const allEvents = props => {
//   const formatAMPM = date => {
//     let hours = date.getHours();
//     let minutes = date.getMinutes();
//     const ampm = hours >= 12 ? 'PM' : 'AM';
//     hours = hours % 12;
//     hours = hours ? hours : 12; // the hour '0' should be '12'l.
//     minutes = minutes < 10 ? '0' + minutes : minutes;
//     const strTime = hours + ':' + minutes + ' ' + ampm;
//     return strTime;
//   };

//   const getEventDateTime = date => {
//     const monthNames = [
//       'Jan',
//       'Feb',
//       'Mar',
//       'Apr',
//       'May',
//       'June',
//       'July',
//       'Aug',
//       'Sept',
//       'Oct',
//       'Nov',
//       'Dec'
//     ];
//     const dayNames = [
//       'Sunday',
//       'Monday',
//       'Tuesday',
//       'Wednesday',
//       'Thursday',
//       'Friday',
//       'Saturday'
//     ];
//     const month = monthNames[date.getMonth()];
//     const weekday = dayNames[date.getDay()];
//     const day = date.getDate();
//     const year = date.getFullYear();
//     const time = formatAMPM(date);
//     return weekday + ' ' + month + ' ' + day + ', ' + year + ' - ' + time;
//   };

//   const sortedEvents = props.events
//     .slice()
//     .sort((a, b) => b.start - a.start)
//     .reverse();
//   const events = sortedEvents.map((ev, key) => {
//     const currentTime = new Date(Date.now());
//     const currentDate = new Date(
//       currentTime.getFullYear(),
//       currentTime.getMonth(),
//       currentTime.getDate()
//     );

//     const eventDate = new Date(
//       ev.start.getFullYear(),
//       ev.start.getMonth(),
//       ev.start.getDate()
//     );

//     if (eventDate.getTime() >= currentDate.getTime()) {
//       return (
//         <div
//           className={classes.Event}
//           key={key}
//           onClick={() => props.showDetails(ev)}
//         >
//           <div
//             className={
//               ev.poster
//                 ? classes.PosterContainer
//                 : classes.PosterContainerNoImage
//             }
//           >
//             {!ev.poster ? <div className={classes.Overlay} /> : null}
//             <img
//               className={classes.PosterImage}
//               src={ev.poster ? ev.poster : mgLogo}
//               alt=""
//             />
//           </div>
//           <div className={classes.EventInfo}>
//             <div className={classes.Date}>{getEventDateTime(ev.start)}</div>
//             <div className={classes.Title}>{ev.title}</div>
//             <div className={classes.Description}>{ev.desc}</div>
//           </div>
//         </div>
//       );
//     }
//   });

//   return <div className={classes.AllEvents}>{events}</div>;
// };

// export default allEvents;
