import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarCheck,
  faBan
} from '@fortawesome/free-solid-svg-icons';
import 'react-datepicker/dist/react-datepicker.css';
import '../../../assets/style/datepicker-override.css';
import classes from './EditEvent.module.css';

class EditEvent extends Component {


  state = {
    startDate: this.props.eventDate,
    title: this.props.title,
    description: this.props.description
  };

  

  eventUpdateHandler = () => {
    const uid = localStorage.getItem('userId');

    axios
      .patch(
        'https://mediageek-650c6.firebaseio.com/users/' +
          uid +
          '/events/' + this.props.id + '.json', {
            desc: 'This is a new description'

          }
          
      )
      .then(() => {
        this.setState({description: 'This is a new description'});
        this.props.reloadCalendar();
        this.props.update('This is a new description');
      })
      .catch(error => {
        console.log('error ' + error);
      });



  }





  render() {
    return (
      <div className={classes.EditEventInfo} class="EditEventInfo">
        <div className={classes.Row}>
          <label>Date/Time</label>
          <DatePicker
            selected={this.state.startDate}
            // onChange={date => this.setState({ startDate: date })}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"
            width='50%'
          />
        </div>

        <div className={classes.Row}>
          <label>Title</label>
          <input
            type="text"
            id="EventTitle"
            // onChange={this.inputHandler}
            value={this.state.title ? this.state.title : ''}
          />
        </div>

        <div className={classes.Row + ' ' + classes.Description}>
          <label>Description</label>
          <textarea
            id="EventDescription"
            // onChange={this.inputHandler}
            value={this.state.description ? this.state.description : ''}
          ></textarea>
        </div>


        <div className={classes.UpdateCancel}>
            <div className={classes.Update} onClick={this.eventUpdateHandler}>
              <span>Done</span>
              <FontAwesomeIcon
                icon={faCalendarCheck}
                className={classes.DoneIcon}
              />
            </div>
            <div className={classes.Cancel} onClick={this.props.cancel}>
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
}

export default EditEvent;
