import React from 'react';
import { withRouter } from 'react-router-dom';

import classes from './GameResults.module.css';

const srchResults = props => {
  return <div className={classes.SearchResults}>{props.items}</div>;
};

export default withRouter(srchResults);
