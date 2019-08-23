import React from 'react';
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";

const MusicPlayer = (props) => {


  console.log(props);

  const options = {
    audioLists: [
      {
        name: props.track.title,
        singer: props.track.artist,
        cover: props.track.cover,
        musicSrc: props.track.preview
      }
    ],
    playIndex: 0,
    // autoPlay: false,
    mode: 'full',
    closeText: 'Close',
    defaultPosition: {bottom:20, right:20},
    onAudioListsChange(currentPlayId, audioLists, audioInfo) {
      // console.log("[currentPlayId] audio lists change:", this);
      // console.log("[audioLists] audio lists change:", audioLists);
      // console.log("[audioInfo] audio lists change:", audioInfo);

      console.log(this.playIndex);

      // const data = {
      //   ...this.state.params,
      //   playIndex: this.createRandomNum(0, this.state.params.audioLists.length)
      // };
      // this.setState({
      //   params: data
      // });

      

    }

    // changePlayIndex = () => {
    //   const data = {
    //     ...this.state.params,
    //     playIndex: createRandomNum(0, this.state.params.audioLists.length)
    //   };
    //   this.setState({
    //     params: data
    //   });

    // onAudioListsChange: alert(this.currentPlayId)
  }


  return (

    <ReactJkMusicPlayer {...options} />

  );
}



export default MusicPlayer;