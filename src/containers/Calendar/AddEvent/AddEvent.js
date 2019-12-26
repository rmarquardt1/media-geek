import React, { Component } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";

import "react-datepicker/dist/react-datepicker.css";
import "../../../assets/style/datepicker-override.css";
import classes from "./AddEvent.module.css";

class AddEvent extends Component {
  state = {
    startDate: this.props.eventDate,
    title: null,
    description: null
  };

  // const [startDate, setStartDate] = React.useState(new Date());

  componentDidMount() {
    if (this.props.title) {
      this.setState({title: this.props.title});
    }
    if (this.props.description) {
      this.setState({description: this.props.description});
    }
  }

  inputHandler = event => {
    if (event.target.id === "EventTitle") {
      this.setState({ title: event.target.value });
    }
    if (event.target.id === "EventDescription") {
      this.setState({ description: event.target.value });
    }
  };

  addEventHandler = async () => {
    // console.log("startDate: " + this.state.startDate);

    // console.log("title: " + this.state.title);

    // console.log("description: " + this.state.description);

    // const dt = this.state.startDate;
    // const y = dt.getFullYear();
    // const m = dt.getMonth();
    // const d = dt.getDay();
    // const h = dt.getHours();
    // const mm = dt.getMinutes();

    await axios
      .post(
        "https://mediageek-650c6.firebaseio.com/users/" +
          localStorage.getItem("userId") +
          "/events.json",
        {
          title: this.state.title,
          start: this.state.startDate,
          end: this.state.startDate,
          desc: this.state.description,
          mediaId: this.props.mediaId ? this.props.mediaId : null,
          poster: this.props.poster ? this.props.poster: null
        }
      )
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log("error " + error);
      });

    // this.props.reloadCalendar ? this.props.reloadCalender : null;

    if (this.props.reloadCalendar) {
      this.props.reloadCalendar();
    }
    this.props.close();
  };

  render() {
    return (
     
      <div className={classes.AddEventContainer}>

      <div className={classes.AddEvent}>
        <div className={classes.CloseRow}>
          <span className={classes.CloseButton} onClick={this.props.close}>
            Close
          </span>
        </div>

        <div className={classes.AddEventInfo}>
          <div className={classes.Row}>
            <label>Date/Time</label>
            <DatePicker
              selected={this.state.startDate}
              onChange={date => this.setState({ startDate: date })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
          </div>

          <div className={classes.Row}>
            <label>Title</label>
            <input 
            type="text" 
            id="EventTitle" 
            onChange={this.inputHandler} 
            value={this.state.title ? this.state.title : ''}
            
            />
          </div>

          <div className={classes.Row}>
            <label>Description</label>
            <textarea id="EventDescription" onChange={this.inputHandler} value={this.state.description ? this.state.description : ''}>
            
              </textarea>
          </div>

          <div className={classes.Row}>
            <button
              className={classes.CreateButton}
              onClick={this.addEventHandler}
            >
              Create Event
            </button>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default AddEvent;
