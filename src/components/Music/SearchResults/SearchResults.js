import React, { Component } from 'react';
import MusicComp from '../../../containers/Music/MusicComp/MusicComp';

import classes from './SearchResults.module.css';

class SrchResults extends Component {
  render() {
    const results = this.props.items.map(item => {
      return (
        <MusicComp
          key={item.id}
          id={item.id}
          title={item.name}
          summary={item.overview}
          poster={item.picture_big}
        />
      );
    });
    return <div className={classes.SearchResults}>{results}</div>;
  }
}

export default SrchResults;
