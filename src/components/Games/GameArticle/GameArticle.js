import React from 'react';
import classes from './GameArticle.module.css';

const gameArticle = props => (
  <div className={classes.GameArticle}>
    <div className={classes.Thumb}>
      <img src={props.thumb} alt="" />
    </div>
    <div className={classes.Details}>
      <h2 className={classes.Title}>{props.title}</h2>
      <div className={classes.ArticleInfo}>
        <strong>{props.authors} </strong>/ {props.date}
      </div>
      <hr />
      <div className={classes.Summary}>{props.summary}</div>
    </div>
  </div>
);

export default gameArticle;
