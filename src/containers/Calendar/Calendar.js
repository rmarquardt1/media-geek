import React, { Component } from 'react';
import axios from 'axios';
import BigCalendar from 'react-big-calendar/lib';
import moment from 'moment';
import AddEvent from './AddEvent/AddEvent';
import EventDetails from '../../components/Calendar/EventDetails/EventDetails';
import AllEvents from '../../components/Calendar/AllEvents/AllEvents';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../assets/style/calendar-style-override.css';
import uiClasses from '../../components/UI/Layout/Layout.module.css';
import classes from './Calendar.module.css';

moment.locale('en');
BigCalendar.momentLocalizer(moment);

class Calendar extends Component {
  state = {
    view: 'month',
    views: ['month', 'week', 'day'],
    date: new Date(),
    events: [],
    showAddEvent: false,
    showEventDetails: false,
    showAllEvents: false,
    eventTitle: null,
    eventDescription: null,
    eventStartDate: null,
    eventDate: null,
    eventPoster: null,
    eventId: null,
    eventMediaId: null
  };

  constructor(props) {
    super(props);
    this.closeDetailsTimeout = null;
  }

  componentDidMount() {
    this.loadEventsHandler();
    window.addEventListener('resize', this.changeViewHandlerButtonHandler);
    if (window.innerWidth <= 500) {
      this.setState({ showAllEvents: true, views: ['month', 'day'] });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.closeDetailsTimeout);
  }

  changeViewHandlerButtonHandler = () => {
    const w = window.innerWidth;
    if (w <= 500) {
      this.setState({ views: ['month', 'day'], view: 'month' });
    } else {
      this.setState({ views: ['month', 'week', 'day'] });
    }
  };

  loadEventsHandler = () => {
    let eventArr = [];
    axios
      .get(
        'https://mediageek-650c6.firebaseio.com/users/' +
          localStorage.getItem('userId') +
          '/events.json'
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
        console.log('error ' + error);
      });
  };

  showAddEventHandler = currentDate => {
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
        eventId: null,
        eventMediaId: null
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
      eventId: event.id,
      eventMediaId: event.mediaId
    });
  };

  showAllEventsHandler = () => {
    this.setState({ showAllEvents: !this.state.showAllEvents });
  };

  changeViewHandler = view => {
    this.setState({ view: view });
    this.formatViewHandler();
  };

  formatViewHandler = () => {
    setTimeout(() => {
      let day = [];
      const dayEvents = document.getElementsByClassName('rbc-event');
      for (let i = 0; i < dayEvents.length; i++) {
        day.push(dayEvents[i]);
      }
      function compare(a, b) {
        const posA = a.offsetLeft;
        const posB = b.offsetLeft;
        let comparison = 0;
        if (posA > posB) {
          comparison = 1;
        } else if (posA < posB) {
          comparison = -1;
        }
        return comparison;
      }
      day.sort(compare);
      for (let i = 0; i < day.length; i++) {
        day[i].style.zIndex = i + 1;
      }
    }, 0);
  };

  render() {
    return (
      <React.Fragment>
        {/* <SideBar isAuth={this.props.isAuth} /> */}

        <div className={classes.CalendarContainer}>
          <div className={uiClasses.SectionHeader + ' ' + uiClasses.PageHeader}>
            <div className={uiClasses.PageTitle}>
              <FontAwesomeIcon
                icon={faCalendarAlt}
                className={classes.CalendarIcon}
              />
              <h2 style={{ left: '46px' }}>
                {this.state.events && this.state.showAllEvents
                  ? 'Upcoming Events'
                  : 'Calendar'}
              </h2>
            </div>
          </div>

          <div className={classes.CalendarFooter}>
            <div
              className={classes.ViewUpcomingEvents}
              onClick={this.showAllEventsHandler}
            >
              {this.state.events && this.state.showAllEvents
                ? 'Calendar'
                : 'Upcoming Events'}
            </div>
          </div>

          {this.state.events && this.state.showAllEvents ? (
            <React.Fragment>
              <AllEvents
                events={this.state.events}
                showDetails={this.showEventDetailsHandler}
              />
            </React.Fragment>
          ) : null}
          {this.state.showEventDetails ? (
            <React.Fragment>
              <EventDetails
                title={this.state.eventTitle}
                description={this.state.eventDescription}
                startDate={this.state.eventStartDate}
                close={this.closeEventDetailsHandler}
                poster={this.state.eventPoster}
                id={this.state.eventId}
                reloadCalendar={this.loadEventsHandler}
                mediaId={this.state.eventMediaId}
              />
            </React.Fragment>
          ) : null}

          {this.state.showAddEvent ? (
            <AddEvent
              eventDate={this.state.eventDate}
              close={this.closeAddEventHandler}
              reloadCalendar={this.loadEventsHandler}
            />
          ) : null}
          {this.props.isAuth ? (
            this.state.events && !this.state.showAllEvents ? (
              <React.Fragment>
                <BigCalendar
                  selectable={'ignoreEvents'}
                  popup={true}
                  events={this.state.events}
                  step={60}
                  view={this.state.view}
                  views={this.state.views}
                  defaultDate={moment().toDate()}
                  onSelectEvent={event => {
                    this.showEventDetailsHandler(event);
                  }}
                  onSelectSlot={slot => this.showAddEventHandler(slot.start)}
                  longPressThreshhold={1}
                  onView={view => this.changeViewHandler(view)}
                  onNavigate={this.formatViewHandler}
                />
              </React.Fragment>
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