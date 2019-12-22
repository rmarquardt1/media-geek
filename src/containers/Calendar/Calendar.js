import React, { Component } from "react";
import axios from "axios";
import BigCalendar from "react-big-calendar/lib";
import moment from "moment";
import SideBar from "../UI/SideBar/SideBar";
import AddEvent from "./AddEvent/AddEvent";
import EventDetails from "../../components/Calendar/EventDetails/EventDetails";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../assets/style/calendar-style-override.css";
import classes from "./Calendar.module.css";

moment.locale("en");
BigCalendar.momentLocalizer(moment);

// const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

const allViews = ["month", "week", "day"];

class Calendar extends Component {
  // state = {
  //   view: "month",
  //   date: new Date(),
  //   events: [],
  //   showAddEvent: false,
  //   eventDate: null
  // };

  state = {
    view: "month",
    date: new Date(),
    events: [],
    showAddEvent: false,
    showEventDetails: false,
    eventTitle: null,
    eventDescription: null,
    eventStartDate: null,
    eventDate: null,
    eventPoster: null,
    eventId: null
  };

  constructor(props) {
    super(props);
    this.closeDetailsTimeout = null;
  }

  componentDidMount() {
    this.loadEventsHandler();
  }

  componentWillUnmount() {
    clearTimeout(this.closeDetailsTimeout);
  }

  // addEventHandler = async () => {
  //   await axios
  //     .post(
  //       // "https://mediageek-650c6.firebaseio.com/users/pHjVkIvYBoac9lI7UMX10aecb5T2/events.json",
  //       "https://mediageek-650c6.firebaseio.com/users/" +
  //         this.state.uid +
  //         "/events.json",
  //       {
  //         title: "Another Test Event",
  //         start: new Date(2019, 11, 13, 11, 0, 0, 0),
  //         end: new Date(2019, 11, 13, 12, 0, 0, 0),
  //         desc: "This is another test event."
  //       }
  //     )
  //     .then(response => {
  //       console.log(response);
  //     })
  //     .catch(error => {
  //       console.log("error " + error);
  //     });

  //   this.loadEventsHandler();
  // };

  loadEventsHandler = () => {
    let eventArr = [];
    axios
      .get(
        "https://mediageek-650c6.firebaseio.com/users/" +
          localStorage.getItem("userId") +
          "/events.json"
      )
      .then(response => {
      //  console.log(response.data);
        Object.keys(response.data).map(key => {
          eventArr.push({
            id: key,
            title: response.data[key].title,
            desc: response.data[key].desc,
            start: new Date(response.data[key].start),
            end: new Date(response.data[key].end),
            mediaId: response.data[key].mediaId,
            poster: response.data[key].poster
          });

          // eventArr.push(response.data[key]);
          return null;
        });

        this.setState({ events: eventArr });
      })
      .catch(error => {
        console.log("error " + error);
      });
  };

  showAddEventHandler = (currentDate) => {
    this.setState({
      showAddEvent: true,
      eventDate: currentDate
    });
  };

  closeAddEventHandler = () => {
    this.setState({
      showAddEvent: false,
      eventDate: null
    });
  };

  closeEventDetailsHandler = () => {
    this.closeDetailsTimeout = setTimeout(() => {
      this.setState({
        showEventDetails: false,
        eventTitle: null,
        eventDescription: null,
        eventStartDate: null,
        eventPoster: null,
        eventId: null
      });
    }, 300);
  };

  showEventDetailsHandler = event => {
    this.setState({
      showEventDetails: true,
      eventTitle: event.title,
      eventDescription: event.desc,
      eventStartDate: event.start,
      eventPoster: event.poster,
      eventId: event.id
    });
  };

  // addEventHandler = async () => {
  //   await axios
  //     .post(
  //       "https://mediageek-650c6.firebaseio.com/users/" +
  //         this.state.uid +
  //         "/events.json",
  //       {
  //         title: "Another Test Event",
  //         start: new Date(2019, 11, 13, 11, 0, 0, 0),
  //         end: new Date(2019, 11, 13, 12, 0, 0, 0),
  //         desc: "This is another test event."
  //       }
  //     )
  //     .then(response => {
  //       console.log(response);
  //     })
  //     .catch(error => {
  //       console.log("error " + error);
  //     });

  //   this.loadEventsHandler();
  // };

  render() {
    return (
      <React.Fragment>
        <SideBar isAuth={this.props.isAuth} />

        <div className={classes.CalendarContainer}>
        {this.state.showEventDetails ? (
            <EventDetails
              title={this.state.eventTitle}
              description={this.state.eventDescription}
              startDate={this.state.eventStartDate}
              close={this.closeEventDetailsHandler}
              poster={this.state.eventPoster}
              id={this.state.eventId}
              reloadCalendar={this.loadEventsHandler}
            />
          ) : null}


          {this.state.showAddEvent ? (
            // <div className={classes.CalendarOverlay}>
              <AddEvent
                eventDate={this.state.eventDate}
                close={this.closeAddEventHandler}
                reloadCalendar={this.loadEventsHandler}
              />
            // </div>
          ) : null}

          {/* <button onClick={this.addEventHandler}>Add Event</button> */}

          {/* <button onClick={() => this.setState({ view: "day" })}>Day</button>
          <button onClick={() => this.setState({ view: "month" })}>
            Month
          </button> */}

          {this.props.isAuth ? (
            this.state.events ? (
              // <BigCalendar
              //   selectable={"ignoreEvents"}
              //   popup={true}
              //   events={this.state.events}
              //   step={60}
              //   views={allViews}
              //   defaultDate={moment().toDate()}
              //   onSelectEvent={() => {
              //     console.log("clicked");
              //   }}
              //   onSelectSlot={slot => this.showAddEventHandler(slot.start)}
              //   onSelecting={false}

              //   //view={this.state.view}

              //   //drilldownView="day"
              //   //toolbar={false}
              //   //onView={() => {}}
              //   //date={new Date()}

              //   //onNavigate={date => this.setState({ date: date })}

              //   //onDrillDown={date => this.setState({ date: date, view: "day" })}
              // />

              <BigCalendar
                selectable={"ignoreEvents"}
                popup={true}
                events={this.state.events}
                step={60}
                views={allViews}
                defaultDate={moment().toDate()}
                onSelectEvent={event => {
                  this.showEventDetailsHandler(event);
                }}
                onSelectSlot={slot => this.showAddEventHandler(slot.start)}
                //onSelecting={false}

                //view={this.state.view}

                //drilldownView="day"
                //toolbar={false}
                //onView={() => {}}
                //date={new Date()}

                //onNavigate={date => this.setState({ date: date })}

                //onDrillDown={date => this.setState({ date: date, view: "day" })}
              />


            ) : null
          ) : (
            <p>Not Logged In</p>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Calendar;

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
