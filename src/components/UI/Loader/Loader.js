import React from 'react';
import classes from './Loader.module.css';

const loader = props => (
  <div className={classes.loader} style={props.addStyle}>
    Loading...
  </div>
);

export default loader;
