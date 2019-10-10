import React from 'react';

import classes from './RelatedArtist.module.css';

const relatedArtist = props => (
  <div className={classes.Thumb} onClick={props.click}>
    <div className={classes.ThumbContainer}>
      <img className={classes.Pic} src={props.pic} alt="" />
    </div>
    <div className={classes.Name}>{props.name}</div>
  </div>
);

export default relatedArtist;
