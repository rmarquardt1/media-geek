import React, { useState } from 'react';

import uiClasses from '../../../../components/UI/Layout/Layout.module.css';
import classes from './Genre.module.css';

const Genre = props => {

  const [fav, setFav] = useState(
    props.favorite ? true : false
  )

  const clickHandler = event => {
      if (!fav) {
      setFav(true)
    }
      if (fav) {
      setFav(false)
    }
    const favorite =
      event.target.getAttribute('favorite') === 'true' ? true : false;
      event.target.setAttribute('favorite', !favorite);
  };

  let genreClass = null;
  let favs = null;

  if (props.page === 'account' && !props.favorite) {
    genreClass =
      classes.Genre + ' ' + uiClasses.BoxShadow + ' ' + classes.Hide + ' Hide';
    favs = 'false';
  } else {
    genreClass = classes.Genre + ' ' + uiClasses.BoxShadow;
    favs = 'true';
  }

  return (
    <div
      className={genreClass}
      favorite={favs}
      style={
        props.page === 'account'
          ? {
              backgroundImage: 'url(' + props.image + ')',
              backgroundColor: fav ? '#1a8cff' : 'rgba(0,0,0,0)',
              margin: '5px',
              borderRadius: '3px',
              height: '70px',
              width: '120px'
            }
          : {
              backgroundColor: fav ? '#1a8cff' : 'rgba(0,0,0,0)'
            }
      }
      onClick={
        props.showAll
          ? event => {
              clickHandler(event);
              props.click(props.id);
            }
          : null
      }
    >
      {props.name}
    </div>
  );

};

export default Genre;
