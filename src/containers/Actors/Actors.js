import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import axios from 'axios';
import ActorThumb from '../../components/Actor/ActorThumb/ActorThumb';
import OpenActor from '../Actors/OpenActor/OpenActor';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
  faChevronDown,
  faChevronUp
} from '@fortawesome/free-solid-svg-icons';
import uiClasses from '../../components/UI/Layout/Layout.module.css';
import classes from './Actors.module.css';

class Actors extends Component {
  state = {
    actors: null,
    actorCount: null,
    actorPageSize: null,
    actorCurrentPage: 1,
    actorContainerWidth: null,
    actorShowAll: false,
    openActorMovies: null,
    openActorInfo: null,
    openActorBio: null,
    openActorChar: null,
    openActorId: null,
    scrollWidth: 0,
    moveRight: 0,
    headerMoveLeft: false,
    currentElPosition: 0
    // initialPos: null,
    // newPos: null,
    // offsetX: 0,
    // swiping: false,
    // afterSwipe: false,
    // afterSwipeLength: null,
    // swipeEnd: null,
    // velocity: 0
  };

  constructor(props) {
    super(props);
    this.actorsElementRef = React.createRef();
  }

  // componentWillUpdate(nextProps, nextState) {
  //   if (nextState.swipeEnd !== this.state.swipeEnd) {
  //     console.log('next: ' + nextState.swipeEnd + ' current: ' + this.state.swipeEnd)
  //     if (nextState.swipeEnd < this.state.swipeEnd + 5 && nextState.swipeEnd > this.state.swipeEnd - 5) {
  //       this.setState({velocity: 0})
  //     } else {
  //       this.setState({velocity: 2})
  //     }
  //   }
  //   if (nextState.offsetX !== this.state.offsetX && nextState.offsetX !== 0) {
  //     this.setState({moveRight: this.state.moveRight + (nextState.offsetX - this.state.offsetX)});
  //   }
  // }

  componentDidMount() {
    window.addEventListener('resize', this.actorsResizeHandler.bind(this));
    this.loadActorsHandler();
    this.actorsResizeHandler();
  }

  actorsResizeHandler = () => {
    const windowW = window.innerWidth;
    if (this.actorsElementRef.current && !this.state.actorShowAll) {
      const actElWidth = this.actorsElementRef.current.clientWidth;
      const scrollW = this.actorsElementRef.current.scrollWidth;
      const actThumbWidth = windowW < 501 ? 120 : windowW < 1367 ? 140 : 170;
      const actElCount = Math.floor(actElWidth / actThumbWidth);
      const marg = (actElWidth / actElCount - actThumbWidth) / 2 + 10;
      const move = this.state.currentElPosition * (actThumbWidth - 20 + marg * 2);
      this.setState({
        actorPageSize: actElCount,
        moveRight: move,
        containerWidth: actElWidth,
        scrollWidth: scrollW
      });
      this.loadActorsHandler(marg);
    }
  };

  loadActorsHandler = marg => {
    const actors = this.props.actors.map(actor => {
      const actorInfo = {
        actorName: actor.name,
        profilePic: 'http://image.tmdb.org/t/p/w185' + actor.profile_path,
        actorId: actor.id
      };
      return (
        <ActorThumb
          marg={marg + 'px'}
          actorName={actor.name}
          character={actor.character}
          id={actor.id}
          profilePic={'http://image.tmdb.org/t/p/w185' + actor.profile_path}
          profilePicId={actor.profile_path}
          key={Math.random()}
          click={this.actorClickHandler.bind(
            this,
            actorInfo,
            actor.character,
            actor.profile_path,
            actor.actorId
          )}
        />
      );
    });
    this.setState({
      actors: actors,
      actorCount: this.props.actors.length
    });
  };

  navHandler = direction => {
    const windowW = window.innerWidth;
    const actElWidth = this.actorsElementRef.current.clientWidth;
    const scrollW = this.actorsElementRef.current.scrollWidth;
    const actThumbWidth = windowW <= 500 ? 95 : 190;
    const actElCount = Math.floor(actElWidth / actThumbWidth);
    const currentElPos = { ...this.state }.currentElPosition;
    const currentPos = { ...this.state }.moveRight;
    switch (direction) {
      case 'right':
        this.setState({
          moveRight: currentPos + actElWidth,
          actorContainerWidth: actElWidth,
          scrollWidth: scrollW,
          headerMoveLeft: true,
          currentElPosition: currentElPos + actElCount
        });
        break;
      case 'left':
        this.setState({
          moveRight: currentPos - actElWidth,
          actorContainerWidth: actElWidth,
          scrollWidth: scrollW,
          currentElPosition: currentElPos - actElCount
        });
        break;
      default:
        return null;
    }
  };

  actorsViewAllHandler = () => {
    if (!this.state.actorShowAll) {
      this.setState({ actorShowAll: true });
    } else {
      this.setState({ actorShowAll: false });
    }
  };

  actorCloseHandler = () => {
    this.setState({
      openActorMovies: null,
      openActorInfo: null,
      openActorBio: null
    });
  };

  // swipeStartHandler = (event) => {
  //   this.setState({initialPos: event.touches[0].clientX, offsetX: 0, swiping: true});
  // }

  // swipeHandler = (event) => {
  //   const swipeCoord = event.touches[0].clientX;
  //   const initCoord = this.state.initialPos;
  //   const offset = (initCoord - swipeCoord);
  //   this.setState({offsetX: offset, newPos: swipeCoord, swipeEnd: event.changedTouches[0].screenX});
  // }

  // swipeEndHandler = (event) => {
  //   const offset = {...this.state}.offsetX * this.state.velocity;
  //   console.log('offset: ' + offset)
  //   this.setState({offsetX: 0, swiping: false, afterSwipe:true, afterSwipeLength: offset });
  //   const moveRightPos = {...this.state}.moveRight;
  //   setTimeout(() => {
  //     this.setState({afterSwipe: false, moveRight: moveRightPos + offset});
  //   }, 500);
  // }

  actorClickHandler = (actorInfo, actorChar, actorPic) => {
    axios
      .get('https://api.themoviedb.org/3/discover/movie?', {
        params: {
          api_key: '4c7294000365c14a8e42109c863ff772',
          with_people: actorInfo.actorId
        }
      })
      .then(response => {
        this.setState({
          openActorChar: actorChar,
          openActorMovies: response.data,
          openActorInfo: actorInfo,
          moveRight: 0,
          openActorId: actorInfo.actorId
        });
      })
      .catch(error => {
        console.log('error ' + error);
      });
    axios
      .get('https://api.themoviedb.org/3/person/' + actorInfo.actorId + '?', {
        params: {
          api_key: '4c7294000365c14a8e42109c863ff772',
          language: 'en-US'
        }
      })
      .then(response => {
        console.log(response.data.id);
        this.setState({
          openActorBio: {
            pic: actorPic,
            bio: response.data.biography,
            birthday: response.data.birthday,
            death: response.data.deathday,
            homepage: response.data.homepage,
            birthplace: response.data.place_of_birth,
            id: response.data.id
          }
        });
      })
      .catch(error => {
        console.log('error ' + error);
      });
  };

  render() {
    return (
      <Aux>
        <div className={uiClasses.SectionHeader}>
          {this.state.moveRight > 0 && !this.state.actorShowAll ? (
            <FontAwesomeIcon
              className={uiClasses.PrevIcon}
              onClick={() => this.navHandler('left')}
              icon={faChevronLeft}
            />
          ) : null}
          <h2
            className={
              this.state.headerMoveLeft &&
              this.state.moveRight > 0 &&
              !this.state.actorShowAll
                ? uiClasses.SectionHeaderMoveLeft
                : null
            }
          >
            Cast
          </h2>
          <div className={classes.NavRight}>
            {/* {this.state.actorPageSize < this.state.actorCount &&
            !this.state.openActorMovies ? ( */}
            {this.state.moveRight + this.state.actorContainerWidth <
          this.state.scrollWidth ? (
              <div
                className={
                  this.state.actorShowAll
                    ? classes.MoreLess + ' ' + classes.More
                    : classes.MoreLess
                }
                onClick={this.actorsViewAllHandler}
              >
                <FontAwesomeIcon
                  icon={this.state.actorShowAll ? faChevronUp : faChevronDown}
                  style={{ marginRight: '10px' }}
                />
                {this.state.actorShowAll ? 'Show Less' : 'Show All'}
              </div>
            ) : null}

            {this.state.moveRight + this.state.actorContainerWidth <=
              this.state.scrollWidth &&
            !this.state.openActorMovies &&
            !this.state.actorShowAll ? (
              <FontAwesomeIcon
                className={uiClasses.NextIcon}
                onClick={() => this.navHandler('right')}
                icon={faChevronRight}
              />
            ) : null}
          </div>
        </div>

        <div
          // onTouchStart={touchStartEvent => this.swipeStartHandler(touchStartEvent)}
          // onTouchMove={touchMoveEvent => this.swipeHandler(touchMoveEvent)}
          // onTouchEnd={touchEndEvent => this.swipeEndHandler(touchEndEvent)}
          style={{ overflow: 'hidden', width: '100%' }}
        >
          <div
            className={classes.Actors}
            style={
              this.state.actorShowAll
                ? { flexWrap: 'wrap', right: 0 }
                : this.state.moveRight > 0
                ? // && !this.state.swiping && !this.state.afterSwipe
                  { right: this.state.moveRight + 'px' }
                : // : this.state.swiping
                // ? {right: this.state.moveRight + 'px', transition:'none'}
                // : !this.state.swiping && this.state.afterSwipe
                // ? {right: this.state.moveRight + this.state.afterSwipeLength + 'px', transition: 'right 0.7s ease-out'}
                this.state.openActorMovies
                ? { left: '0px' }
                : null
            }
            ref={this.actorsElementRef}
          >
            {this.state.openActorMovies &&
            this.state.openActorBio &&
            this.state.openActorId ? (
              <OpenActor
                character={this.state.openActorChar}
                movies={this.state.openActorMovies}
                actorInfo={this.state.openActorInfo}
                actorBio={this.state.openActorBio}
                close={this.actorCloseHandler}
                openMovieClick={this.props.openMovie}
                actorId={this.state.openActorId}
              />
            ) : (
              this.state.actors
            )}
          </div>
        </div>
      </Aux>
    );
  }
}

export default Actors;
