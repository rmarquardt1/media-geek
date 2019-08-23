import React from 'react';
import AlbumTracks from '../../TopFiveTracks/AlbumTracks/AlbumTracks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import classes from './AlbumOpen.module.css';

const albumOpen = (props) => {

  const release = new Date(props.releaseDate);

  const releaseYear = release.getFullYear().toString();

  // let tracks = null;


  // if (props.tracks) {
  //   console.log(props.tracks);


  //     tracks = props.tracks.data.map(track => {
  //       return (

  //         <Tracks 
  //           key={track.id}
  //           title={track.title}
  //           // album={song.album.title}
  //           // thumb={song.album.cover_small}
  //           clickPlay={props.clickPlay}
  //           preview={track.preview}
  //           // artist={song.artist.name}
  //         />


          
  //       );



  //     });
  // }
  

  // const tracks = props.tracks.data.map(track => {
  //   return (

  //     <Tracks 
  //       key={track.id}
  //       title={track.title}
  //       // album={song.album.title}
  //       // thumb={song.album.cover_small}
  //       clickPlay={props.clickPlay}
  //       preview={track.preview}
  //       // artist={song.artist.name}
  //     />


      
  //   );



  // });

console.log(props.tracks);


  return (

    <div className={classes.AlbumOpen}>
      <div className={classes.AlbumCover}>
      <img src={props.cover} alt="" />
      <p className={classes.ReleaseYear}>{releaseYear}</p>
      </div>
      

      <div className={classes.AlbumInfo}>

        <div className={classes.AlbumTitle}>
          <h1>{props.title}</h1>

          <div className={classes.Close}>
          <FontAwesomeIcon icon={faTimesCircle} className={classes.CloseIcon} onClick={props.close} />

          </div>



          {/* <FontAwesomeIcon 
          onClick={props.close} 
          className={classes.CloseIcon} 
          icon={faTimesCircle} 
          /> */}

        </div>
        <hr/>
        <div className={classes.AlbumTracks}>

          {props.tracks ? <AlbumTracks tracks={props.tracks} clickPlay={props.clickPlay} /> : null}

        
          {/* {tracks} */}
        </div>
      

      </div>





    </div>

  );

}

export default albumOpen;