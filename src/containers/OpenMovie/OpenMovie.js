import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import axios from 'axios';
import ActorThumb from '../../components/Actor/ActorThumb/ActorThumb';
import VideoThumb from '../../components/Movie/MovieTrailer/MovieTrailer';
import Review from '../../components/Review/Review';
import VideoModal from '../../components/UI/VideoModal/VideoModal';
import OpenActor from '../../components/Actor/OpenActor/OpenActor';
import MovieScores from '../../components/Movie/MovieScores/MovieScores';
import MovieCollection from '../../components/Movie/MovieCollection/MovieCollection';
import Loader from '../../components/UI/Loader/Loader';
import ScrollableAnchor from 'react-scrollable-anchor';
import { configureAnchors } from 'react-scrollable-anchor';
import NavBar from '../../components/UI/NavBar/NavBar';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import classes from './OpenMovie.module.css';
import uiClasses from '../../components/UI/Layout/Layout.module.css';




configureAnchors({offset: -60});



class OpenMovie extends Component {
  state = {
    actorResults: null,
    videoResults: null,
    reviewResults: null,
    genres: null,
    rating: null,
    playVideo: false,
    playVideoUrl: null,
    // movieRatings: null,

    imdbScore: null,
    rtScore: null,
    mcScore: null,

    videoCount: null,
    videoSliceStart: 0,
    videoSliceEnd: null,
    videoPageSize: null,
    videoPageCount: false,
    // videoPages: null,
    videoCurrentPage: 1,

    actorCount: null,
    // actorPages: null,
    actorSliceStart: 0,
    actorSliceEnd: null,
    actorPageSize: null,
    actorCurrentPage: 1,

    openActorMovies: null,
    openActorInfo: null,
    openActorBio: null,
    openActorChar: null,
    loading: false,

    movieInfo: null,
    movieId: null,
    movieCollection: null,
    collectionSliceStart: 0,
    collectionSliceEnd: null,
    collectionPageSize: null,
    collectionLoad: true
  }

  constructor(props) {
    super(props);
    this.elementRef = React.createRef();
    this.vidElementRef = React.createRef();
    this.colElementRef = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.movieId !== this.props.match.params.id) {
      this.getMovieHandler();
      this.setState({movieId: this.props.match.params.id});
    }
  }

  componentDidMount() {
    window.scrollTo(0,0);
    window.addEventListener('resize', this.resizeHandler.bind(this));
    this.getMovieHandler();
  }

  getMovieHandler = (movieId) => {
    this.setState({loading: true});
    const url = movieId ? 'https://api.themoviedb.org/3/movie/' + movieId : 'https://api.themoviedb.org/3/movie/' + this.props.match.params.id;
    axios.get((url),
    {params: {
      api_key: '4c7294000365c14a8e42109c863ff772',
      append_to_response: 'credits,videos,reviews,release_dates,collection'
    }}
    ).then(response => {
      this.setState({
        movieInfo: response.data,
        rating: response.data.release_dates.results.find(rating => rating.iso_3166_1 === 'US').release_dates[0].certification,
        actorResults: response.data.credits.cast, 
        videoResults: response.data.videos.results, 
        reviewResults: response.data.reviews.results,
        videoCount: response.data.videos.results.length,
        // videoPages: Math.floor(response.data.videos.results.length / this.state.actorSlice),
        actorCount: response.data.credits.cast.length,
        loading: false
        // actorPages: Math.floor(response.data.credits.cast.length / this.state.actorSlice),
      });
      const gen = response.data.genres.map(genre => {
        return(genre.name);
      }).join('\xa0/\xa0');
      this.setState({genres: gen});
      this.resizeHandler();
      // console.log(this.state.movieInfo);
      this.getRatingsHandler();

     
        // this.getCollectionHandler();
     
      
     
    }).catch(error => {
      console.log('error ' + error);
    });
  }

  getCollectionHandler = () => {
    console.log('getCollectionHandler');
    axios.get('https://api.themoviedb.org/3/collection/' + this.state.movieInfo.belongs_to_collection.id,
      {params: {
        api_key: '4c7294000365c14a8e42109c863ff772',
        language: 'en-US'
      }}
      ).then(response => {
        console.log(response);
        this.setState({movieCollection: response.data.parts});




      }).catch(error => {
        console.log('error ' + error);
      });
  }

  

  getRatingsHandler = () => {
      axios.get('http://www.omdbapi.com/',
      {params: {
        apikey: 'ec2bd2c4',
        t: this.state.movieInfo.title,
        type: 'movie'
      }}
      ).then(response => {
        response.data.Ratings.map(rating => {
          if (rating.Source === 'Internet Movie Database') {
            this.setState({imdbScore: rating.Value});
          }
          if (rating.Source === 'Rotten Tomatoes') {
            this.setState({rtScore: rating.Value});
          }
          if (rating.Source === 'Metacritic') {
            this.setState({mcScore: rating.Value});
          }
        });
      }).catch(error => {
        console.log('error ' + error);
      });
    
  }

  resizeHandler = () => {
    // console.log(this.vidElementRef);
    const windowW = window.innerWidth;
    if (this.elementRef.current) {
      const actElWidth = this.elementRef.current.clientWidth;
      const actThumbWidth = windowW < 501 ? 120 : windowW < 1367 ? 154 : 180;
      const actElCount = Math.floor(actElWidth / actThumbWidth);
      this.setState({
        actorSliceEnd: this.state.actorSliceStart + actElCount, actorPageSize: actElCount
      });
    }


    if (this.colElementRef.current) {
      const actElWidth = this.colElementRef.current.clientWidth;
      const actThumbWidth = windowW < 501 ? 110 : windowW < 1367 ? 154 : 180;
      const actElCount = Math.floor(actElWidth / actThumbWidth);
      this.setState({
        collectionSliceEnd: this.state.collectionSliceStart + actElCount, collectionPageSize: actElCount
      });
    }    








     if (this.vidElementRef.current) {
      // console.log('vid triggered');
      const vidElWidth = this.vidElementRef.current.clientWidth;
      const vidThumbWidth = windowW < 1367 ? 200 : 240;
	    const vidElCount = Math.floor(vidElWidth / vidThumbWidth);
      const vidSliceEnd = windowW > 768 ? this.state.videoSliceStart + (vidElCount * 2) : windowW < 501 ? this.state.videoSliceStart + 6 : this.state.videoSliceStart + 4;
      const vidPageSize = windowW > 768 ? vidElCount * 2 : windowW < 501 ? 6 : 4;
      this.setState({
        videoSliceEnd: vidSliceEnd, videoPageSize: vidPageSize
      });
     }
      // const vidElWidth = this.vidElementRef.current.clientWidth;
      // const vidThumbWidth = windowW < 1367 ? 200 : 270;
      // const vidElCount = Math.floor(vidElWidth / vidThumbWidth);
      // this.setState({
      //   videoSliceEnd: (this.state.videoSliceStart + vidElCount) * 2, videoPageSize: vidElCount * 2
      // });
    // }

  }

  videoPlayHandler = (url) => {
    this.setState({playVideo: true, playVideoUrl: url});
  }

  videoCloseHandler = () => {
    this.setState({playVideo: false, playVideoUrl: null});
  }

  actorsNextHandler = () => {
    this.setState(prevState => ({
      actorSliceStart: prevState.actorSliceStart + this.state.actorPageSize,
      actorSliceEnd: prevState.actorSliceEnd + this.state.actorPageSize,
      // actorPages: Math.floor(this.state.actorCount / this.state.actorPageSize),
      actorCurrentPage: prevState.actorCurrentPage + 1
    }));
  }

  actorsBackHandler = () => {
    this.setState(prevState => ({
      actorSliceStart: prevState.actorSliceStart - this.state.actorPageSize,
      actorSliceEnd: prevState.actorSliceEnd - this.state.actorPageSize,
      actorCurrentPage: prevState.actorCurrentPage - 1
    }));
  }

  videosNextHandler = () => {
    this.setState(prevState => ({
      videoSliceStart: prevState.videoSliceStart + this.state.videoPageSize,
      videoSliceEnd: prevState.videoSliceEnd + this.state.videoPageSize,
      // actorPages: Math.floor(this.state.actorCount / this.state.actorPageSize),
      videoCurrentPage: prevState.videoCurrentPage + 1
    }));
  }
  
  videosBackHandler = () => {
    this.setState(prevState => ({
      videoSliceStart: prevState.videoSliceStart - this.state.videoPageSize,
      videoSliceEnd: prevState.videoSliceEnd - this.state.videoPageSize,
      videoCurrentPage: prevState.videoCurrentPage - 1
    }));
  }

  actorClickHandler = (actorInfo, actorChar, actorPic) => {
    console.log(actorInfo.actorId);
    axios.get('https://api.themoviedb.org/3/discover/movie?',
      {params: {
        api_key: '4c7294000365c14a8e42109c863ff772',
        with_people: actorInfo.actorId
      }}
      ).then(response => {
        // console.log(response.data);
        this.setState({
          openActorChar: actorChar,
          openActorMovies: response.data,
          openActorInfo: actorInfo
        });
      }).catch(error => {
        console.log('error ' + error);
      });

      axios.get('https://api.themoviedb.org/3/person/' + actorInfo.actorId + '?',
      {params: {
        api_key: '4c7294000365c14a8e42109c863ff772',
        language: 'en-US'
      }}
      ).then(response => {
        console.log(actorInfo);
        this.setState({
          openActorBio: {
            pic: actorPic,
            bio: response.data.biography, 
            birthday: response.data.birthday,
            death: response.data.deathday,
            homepage: response.data.homepage,
            birthplace: response.data.place_of_birth 
          }
        });
      }).catch(error => {
        console.log('error ' + error);
      });
  }

  actorCloseHandler = () => {
    this.setState({openActorMovies: null, openActorInfo: null, openActorBio: null})
  }

  render() {
    let actors = null;
    let videos = null;
    let reviews = null;
    let vidPageCount = null;
    let actorPageCount = null;
    let collection = null;
    let collectionPageCount = null;


     

    if (this.state.reviewResults) {
      reviews = this.state.reviewResults.slice(0, 4).map(review => {
        return (
          <Review
            key={review.id}
            reviewAuthor={review.author}
            reviewSummary={review.content}
          />
         );
      });
    }

    if (this.state.actorResults) {
      actors = this.state.actorResults.slice(this.state.actorSliceStart, this.state.actorSliceEnd).map(actor => {
        const actorInfo = {
          actorName: actor.name,
          profilePic: 'http://image.tmdb.org/t/p/w185' + actor.profile_path,
          actorId: actor.id
        }
        return (
          <ActorThumb 
            actorName={actor.name}
            character={actor.character}
            profilePic={'http://image.tmdb.org/t/p/w185' + actor.profile_path}
            profilePicId={actor.profile_path}
            key={actor.cast_id}
            click={this.actorClickHandler.bind(this, actorInfo, actor.character, actor.profile_path)}
          />
        );
      });
      actorPageCount = actors.length;
      if (actorPageCount < this.state.actorPageSize) {
        const diff = this.state.actorPageSize - actorPageCount;
        for (let step =0; step < diff; step++ ) {
          actors.push(<div key={step} style={{content:'""', flex: 'auto', width: '170px', maxWidth: '170px'}}></div>);
        }
      }
    }


    if (this.state.movieCollection) {
      collection = this.state.movieCollection.slice(this.state.collectionSliceStart, (this.state.collectionSliceEnd)).map(movie => {
        // collection = this.state.movieCollection.slice(0, 6).map(movie => {
          // console.log(movie);
        return (
          <MovieCollection
            key={movie.id}
            id={movie.id}
            poster={'http://image.tmdb.org/t/p/w185' + movie.poster_path}
            title={movie.title}
          />
        );
      });
      collectionPageCount = collection.length;
      if (collectionPageCount < this.state.collectionPageSize) {
        const windowW = window.innerWidth;
        const diff = this.state.collectionPageSize - collectionPageCount;
        for (let step =0; step < diff; step++ ) {

          collection.push(<div key={step} style={{content:'""', flex: 'auto', width: '170px', maxWidth: '170px'}}></div>);
        }
      }
    }









    if (this.state.videoResults) {
      videos = this.state.movieInfo.videos.results.slice(this.state.videoSliceStart, this.state.videoSliceEnd).map(video => {
        return (
          <VideoThumb 
            videoName={video.name}
            key={video.key}
            videoUrl={'https://www.youtube.com/embed/' + video.key}
            thumbnail={'https://img.youtube.com/vi/' + video.key + '/mqdefault.jpg'}
            click={this.videoPlayHandler}
          />
        );
      });
      vidPageCount = videos.length;
      if (vidPageCount < this.state.videoPageSize) {
        const windowW = window.innerWidth;
        const diff = this.state.videoPageSize - vidPageCount;
        for (let step =0; step < diff; step++ ) {

          if (windowW <= 830) {
            videos.push(<div key={step} style={{content:'""', flex: 'auto', width: '45%', maxWidth: '45%'}}></div>);
          } else {
            videos.push(<div key={step} style={{content:'""', flex: 'auto', width: '240px', maxWidth: '240px'}}></div>);
          }


          
        }
      }
    }







    let relYear = null;
    if (this.state.movieInfo) {
      const relDate = new Date(this.state.movieInfo.release_date);
      relYear = relDate.getFullYear();
    }

    return (


      <Aux>

        <NavBar searchType="movies" /> 

      {this.state.movieInfo ?

        <Aux>
          {this.state.playVideo ? <VideoModal videoUrl={this.state.playVideoUrl} close={this.videoCloseHandler} /> : null}
          {this.state.loading ? <Loader /> :
          <Aux>
            <div className={classes.OpenMovieBackdrop} style={{backgroundImage: 'url(http://image.tmdb.org/t/p/original/' + this.state.movieInfo.backdrop_path + ')'}} />
            <div className={classes.OpenMovieOverlay} />
            <div className={classes.OpenMovieContent}>

              <div className={classes.OpenMoviePoster}>
                <img className={classes.PosterImage} src={'http://image.tmdb.org/t/p/w500/' + this.state.movieInfo.poster_path} alt="" />
              </div>
            <div className={classes.OpenMovieInfo}> 
            <div className={classes.MobileDescription}>
              <div className={classes.OpenMoviePosterMobile}>
                <img src={'http://image.tmdb.org/t/p/w500/' + this.state.movieInfo.poster_path} alt="" />
              </div>
              <div className={classes.OpenMovieDesc}>
                <h1>{this.state.movieInfo.title}</h1>
                <div className={classes.OpenMovieGenRel}>
                  <div className={classes.OpenMovieGenres}>{this.state.genres}</div>
                </div>
                <div className={classes.RelRating}>{relYear}  (<strong>{this.state.rating}</strong>)</div>
                <MovieScores imdb={this.state.imdbScore} rt={this.state.rtScore} mc={this.state.mcScore} />
                <p className={classes.OpenMovieOverview}>{this.state.movieInfo.overview}</p>
              </div>
            </div>



            {/* <ScrollableAnchor id={'collectionSection'} >
                <div className={uiClasses.SectionHeader}>
                  {this.state.actorCurrentPage !== 1 ? 
                    <FontAwesomeIcon 
                    className={uiClasses.PrevIcon}
                    onClick={this.actorsBackHandler}
                    icon={faChevronLeft}  />
                    : null
                  }
                  <h2>Collection</h2>
                  {this.state.actorCurrentPage < (this.state.actorCount / (this.state.actorSliceEnd - this.state.actorSliceStart)) ? 
                    <FontAwesomeIcon 
                    className={uiClasses.NextIcon}
                    onClick={this.actorsNextHandler}
                    icon={faChevronRight}  />
                  : null
                  }
                </div>
              </ScrollableAnchor>
              <div 
                className={classes.OpenMovieActors} 
                className={actorPageCount < this.state.actorPageSize ? classes.OpenMovieActors + ' ' + classes.OpenMovieActorsAlignFlex : classes.OpenMovieActors}
                ref={this.colElementRef}>
                  {collection}
                  {this.state.movieCollection ? 
                  {collection}
                  : null}
                  {this.state.movieCollection ? 
                  <MovieCollection
                    character={this.state.openActorChar}
                    movies={this.state.openActorMovies}
                    actorInfo={this.state.openActorInfo}
                    actorBio={this.state.openActorBio}
                    close={this.actorCloseHandler}
                    openMovieClick2={this.props.openMovieClick}
                    openMovieClick={this.getMovieHandler}
                  /> 
                  : actors}
              </div>

              <ScrollableAnchor id={'collectionSection'} >
                <div className={uiClasses.SectionHeader}>
                  <h2>Collection</h2>
                </div>
              </ScrollableAnchor>
              <div className={classes.OpenMovieActors} ref={this.colElementRef}>
                  {collection}
              </div> */}















            <ScrollableAnchor id={'castSection'} >
                <div className={uiClasses.SectionHeader}>
                  {this.state.actorCurrentPage !== 1 && !this.state.openActorMovies ? 
                    <FontAwesomeIcon 
                    className={uiClasses.PrevIcon}
                    onClick={this.actorsBackHandler}
                    icon={faChevronLeft}  />
                    : null
                  }
                  <h2>Cast</h2>
                  {this.state.actorCurrentPage < (this.state.actorCount / (this.state.actorSliceEnd - this.state.actorSliceStart)) && !this.state.openActorMovies ? 
                    <FontAwesomeIcon 
                    className={uiClasses.NextIcon}
                    onClick={this.actorsNextHandler}
                    icon={faChevronRight}  />
                  : null
                  }
                </div>
              </ScrollableAnchor>
              <div 
                className={classes.OpenMovieActors} 
                ref={this.elementRef}>
                  {this.state.openActorMovies && this.state.openActorBio ? 
                  <OpenActor 
                    character={this.state.openActorChar}
                    movies={this.state.openActorMovies}
                    actorInfo={this.state.openActorInfo}
                    actorBio={this.state.openActorBio}
                    close={this.actorCloseHandler}
                    openMovieClick2={this.props.openMovieClick}
                    openMovieClick={this.getMovieHandler}
                  /> 
                  : actors}
              </div>


              {/* <ScrollableAnchor id={'vidSection'} > */}
                <div className={uiClasses.SectionHeader}>
                {this.state.videoCurrentPage !== 1 ? 
                    <FontAwesomeIcon 
                    className={uiClasses.PrevIcon}
                    onClick={this.videosBackHandler}
                    icon={faChevronLeft}  />
                    : null
                  }
                  <h2>Videos</h2>
                  {this.state.videoCurrentPage < (this.state.videoCount / (this.state.videoSliceEnd - this.state.videoSliceStart)) ? 
                    <FontAwesomeIcon 
                    className={uiClasses.NextIcon}
                    onClick={this.videosNextHandler}
                    icon={faChevronRight}  />
                  : null
                  }
                </div>
              {/* </ScrollableAnchor> */}
              <div
                className={classes.OpenMovieVideos}
                ref={this.vidElementRef}>
              {videos}
              </div>

              





              {/* <ScrollableAnchor id={'reviewSection'} > */}
                <div className={uiClasses.SectionHeader}>
                  <h2>Reviews</h2>
                </div>
              {/* </ScrollableAnchor> */}
              <div className={classes.OpenMovieReviews}>
                {reviews}
              </div>
              



              
            </div>


          </div>
        </Aux>

}

</Aux> : null}






      </Aux>
    );













  }

  














}







export default OpenMovie;