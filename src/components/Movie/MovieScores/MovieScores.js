import React from 'react';
import imdbIcon from '../../../assets/images/imdb-icon.png';
import rtIconFresh from '../../../assets/images/rt-icon-fresh.png';
import mcIcon from '../../../assets/images/mc-icon.png';
import classes from './MovieScores.module.css'

const movieScores = (props) => {


  // console.log(props.imgOverride);


return (


  

    <div className={classes.MovieScores}>
      {props.imdb ? 
        <div className={classes.Score}  style={props.cssOverride}>
          <img src={imdbIcon} className={classes.ImdbIcon} style={props.imgOverride} /> <span style={props.cssOverride}>{props.imdb}</span>
        </div>
      : null}
      {props.rt ? 
        <div className={classes.Score} style={props.cssOverride}>
          <img src={rtIconFresh} className={classes.rtIcon} style={props.imgOverride} />  <span style={props.cssOverride}>{props.rt}</span>
        </div>
      : null}
      {props.mc ? 
        <div  style={{marginRight: 0}} className={classes.Score} >
          <img src={mcIcon} className={classes.mcIcon} style={props.imgOverride} /> 
          <span style={props.cssOverride}>{props.mc}</span>
        </div>
      : null}
    </div>

  );


      }

export default movieScores;