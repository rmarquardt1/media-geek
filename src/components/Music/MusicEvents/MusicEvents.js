import React from 'react';
import Event from './Event/Event';

import classes from './MusicEvents.module.css';

const musicEvents = (props) => {

// console.log(props);

const events = props.eventResults.map(event => {
  // console.log(event);

  return (

    <Event
      key={event.id}
      eventInfo={event}
      eventClick={props.click.bind(this, event.venueId)}
    />


  )
  



});


  return (
    
    <div className={classes.MusicEvents}>
      {events}
      
    </div>
  )


}
  

export default musicEvents;