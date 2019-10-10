import React from 'react';

import classes from './ActorThumb.module.css';
import uiClasses from '../../UI/Layout/Layout.module.css';
import noImage from '../../../assets/images/no-image-person.png';

const actorThumb = props => {
  const bgImage = !props.profilePicId ? 'url(' + noImage + ')' : '#000';
  const actorImage = props.profilePicId ? (
    <img
      className={classes.ActorPic + ' ' + uiClasses.BoxShadow}
      src={props.profilePic}
      alt=""
    />
  ) : null;

  return (
    <div
      className={classes.ActorThumb}
      onClick={props.click}
      style={{ marginLeft: props.marg, marginRight: props.marg }}
    >
      <div
        className={classes.ActorThumbContainer}
        style={{
          background: bgImage,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {actorImage}
      </div>
      <div className={classes.ActorName}>{props.actorName}</div>
      <div className={classes.CharacterName}>{props.character}</div>
    </div>
  );
};

export default actorThumb;
