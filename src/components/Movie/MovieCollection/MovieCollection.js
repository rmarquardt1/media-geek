import React from 'react';

import classes from './MovieCollection.module.css';

const movieCollection = (props) => {

  // console.log(props); 

  return (


    <div className={classes.ActorThumb} onClick={props.click}>
      <div className={classes.ActorThumbContainer} 
      // style={{background: bgImage, backgroundSize: 'cover', backgroundPosition: 'center'}}
      >
      {/* <img className={classes.ActorPic + ' ' + uiClasses.BoxShadow} src={props.profilePic} alt="" /> */}
      {/* <img className={classes.ActorPic + ' ' + uiClasses.BoxShadow} src={noImage} alt="" style={{height:'100%'}} /> */}
      
      <img src={props.poster} alt="" />
      </div>

      <div className={classes.ActorName}>{props.title}</div>
      {/* <div className={classes.CharacterName}>{props.character}</div> */}
    </div>

  );

}

export default movieCollection; 