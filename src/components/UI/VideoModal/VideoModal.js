import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import classes from './VideoModal.module.css';

const videoModal = props => (
  <div className={classes.VideoModal}>
    <div className={classes.Close}>
      <FontAwesomeIcon
        icon={faTimesCircle}
        className={classes.CloseIcon}
        onClick={props.close}
      />
    </div>
    <embed className={classes.VideoEmbed} src={props.videoUrl + '?html5=1'} />
  </div>
);

export default videoModal;
