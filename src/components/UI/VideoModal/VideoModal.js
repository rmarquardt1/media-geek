import React from 'react';
// import { Player } from 'video-react';
// import '../../../../node_modules/video-react/dist/video-react.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import classes from './VideoModal.module.css';

const videoModal = (props) => (

  <div className={classes.VideoModal}>
    {/* <button className={classes.Close}>Close</button> */}
    <div className={classes.Close}>
    <FontAwesomeIcon icon={faTimesCircle} className={classes.CloseIcon} onClick={props.close} />

    </div>
    

    <embed className={classes.VideoEmbed} src={props.videoUrl + '?html5=1'} />


    {/* <Player
      fluid={false}
      width="100%"
      height="100%"
      autoPlay={true}
    >
      <source 
      // src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"  
      src={props.videoUrl + '?html5=1'}
      />
    </Player> */}


  </div>




);

export default videoModal;