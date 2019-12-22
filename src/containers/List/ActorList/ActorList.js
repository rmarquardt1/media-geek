import React, { Component } from 'react';
import ActorThumb from '../../../components/Actor/ActorThumb/ActorThumb';
import OpenActor from '../../Actors/OpenActor/OpenActor';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faChevronDown,
  faChevronUp
} from '@fortawesome/free-solid-svg-icons';
import uiClasses from '../../../components/UI/Layout/Layout.module.css';
import classes from './ActorList.module.css';

class ActorList extends Component {
  state = {
    list: [],
    containerWidth: 0,
    currentElPosition: 0,
    listLoaded: false,
    scrollWidth: 0,
    moveRight: 0,
    headerMoveLeft: false,
    showNavRight: true,
    scrollPos: null,
    scrollMax: 0,
    showAll: false,
    noResults: false,
    openActor: false,
    openActorBio: null,
    openActorChar: null,
    openActorMovies: null,
    openActorInfo: null
  };

  constructor(props) {
    super(props);
    this.containerWidthRef = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.containerWidthRef.current &&
      this.containerWidthRef.current.scrollWidth > prevState.scrollWidth
    ) {
      this.resizeHandler(
        null,
        null,
        this.containerWidthRef.current.scrollWidth
      );
    }
    if (
      prevState.listLoaded !== this.state.listLoaded &&
      this.state.scrollWidth !== this.containerWidthRef.current.scrollWidth
    ) {
      this.setState({
        scrollWidth: this.containerWidthRef.current.scrollWidth
      });
    }
  }

  componentDidMount() {
    this.setState({
      containerWidth: this.containerWidthRef.current.clientWidth
    });
    window.addEventListener('resize', this.resizeHandler);
    this.resizeHandler();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  loadListHandler = (marg, navLeftClicked) => {
    const windowW = window.innerWidth;
    // const movieDimensions =
    //   windowW <= 500
    //     ? {
    //         width: '75px',
    //         lazyW: 75,
    //         height: '110px',
    //         movieHeight: '160px',
    //         fontSize: '12px'
    //       }
    //     : {
    //         width: '170px',
    //         lazyW: 170,
    //         height: '255px',
    //         movieHeight: '350px',
    //         fontSize: '14px'
    //       };

    const movieDimensions =
      windowW <= 500
        ? {
            width: '90px',
            lazyW: 90,
            height: '135px',
            // movieHeight: '160px',
            fontSize: '12px'
          }
        : {
            width: '195px',
            lazyW: 195,
            height: '293px',
            // movieHeight: '350px',
            fontSize: '14px'
          };


    const releases = this.props.actors
      ? this.props.actors.map(result => {
          const actorInfo = {
            actorName: result.name,
            profilePic: 'http://image.tmdb.org/t/p/w185' + result.profile_path,
            actorId: result.id
          };
          return (
            <ActorThumb
              marg={marg + 'px'}
              lazyWidth={marg * 2 + movieDimensions.lazyW}
              id={result.id}
              key={result.id}
              poster={'http://image.tmdb.org/t/p/w185' + result.profile_path}
              name={result.name}
              character={result.character}
              dimensions={movieDimensions}
              profilePath={result.profile_path}
              openActor={this.actorClickHandler.bind(
                this,
                actorInfo,
                result.character,
                result.profile_path
              )}
            />
          );
        })
      : null;
    this.setState({
      list: releases,
      listLoaded: true
    });
    this.showNavRightHandler(navLeftClicked);
  };

  showNavRightHandler = navLeftClicked => {
    const scrollPosition = this.containerWidthRef.current.scrollLeft;
    const scrollMax =
      this.containerWidthRef.current.scrollWidth -
      this.containerWidthRef.current.clientWidth -
      this.containerWidthRef.current.clientWidth;
    this.setState({
      showNavRight:
        scrollPosition < scrollMax ? true : navLeftClicked ? true : false
    });
  };

  resizeHandler = (elPos, navLeftClicked, scrollWidth) => {
    const windowW = window.innerWidth;
    if (this.containerWidthRef.current) {
      const containerW = this.containerWidthRef.current.clientWidth;
      const scrollW = this.containerWidthRef.current.scrollWidth;
      // const thumbW = windowW <= 500 ? 95 : 190;
      const thumbW = windowW <= 500 ? 90 : 195;
      const elCount = Math.floor(containerW / thumbW);
      // const marg = (containerW / elCount - thumbW) / 2 + 10;
      const marg = (containerW / elCount - thumbW) / 2;
      // const move =
      //   typeof elPos === 'number'
      //     ? elPos * (thumbW - 20 + marg * 2)
      //     : this.state.currentElPosition * (thumbW - 20 + marg * 2);

      const move =
        typeof elPos === 'number'
          ? elPos * (thumbW + marg * 2)
          : this.state.currentElPosition * (thumbW + marg * 2);

      this.setState({
        containerWidth: containerW,
        scrollWidth: scrollW
      });
      this.loadListHandler(marg, navLeftClicked, scrollWidth);
      this.containerWidthRef.current.scrollTo({
        left: move,
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  navHandler = direction => {
    const windowW = window.innerWidth;
    const containerW = this.containerWidthRef.current.clientWidth;
    const scrollW = this.containerWidthRef.current.scrollWidth;
    // const thumbW = windowW <= 500 ? 95 : 190;

    const thumbW = windowW <= 500 ? 90 : 195;


    const actElCount = Math.floor(containerW / thumbW);
    const currentElPos = { ...this.state }.currentElPosition;
    switch (direction) {
      case 'right':
        this.setState({
          moveRight: containerW + { ...this.state }.containerWidth,
          containerWidth: containerW + { ...this.state }.containerWidth,
          scrollWidth: scrollW,
          headerMoveLeft: true,
          currentElPosition: currentElPos + actElCount
        });
        this.resizeHandler(currentElPos + actElCount, false);
        break;
      case 'left':
        this.setState({
          moveRight: containerW - { ...this.state }.containerWidth,
          containerWidth: containerW - { ...this.state }.containerWidth,
          scrollWidth: scrollW,
          headerMoveLeft: true,
          currentElPosition:
            currentElPos - actElCount >= 0 ? currentElPos - actElCount : 0,
          showNavRight: true
        });
        this.resizeHandler(currentElPos - actElCount, true);
        break;
      default:
        this.setState({
          moveRight: 0,
          containerWidth: 0,
          scrollWidth: 0,
          headerMoveLeft: false,
          currentElPosition: 0
        });
    }
  };

  actorClickHandler = (actorInfo, actorChar, actorPic) => {
    axios
      .get('https://api.themoviedb.org/3/person/' + actorInfo.actorId + '?', {
        params: {
          api_key: '4c7294000365c14a8e42109c863ff772',
          language: 'en-US'
        }
      })
      .then(response => {
        this.setState({
          openActor: true,
          openActorChar: actorChar,
          openActorInfo: actorInfo,
          openActorBio: {
            pic: actorPic,
            bio: response.data.biography,
            birthday: response.data.birthday,
            death: response.data.deathday,
            homepage: response.data.homepage,
            birthplace: response.data.place_of_birth
          }
        });
      })
      .catch(error => {
        console.log('error ' + error);
      });
  };

  actorCloseHandler = () => {
    this.setState({
      openActor: false,
      openActorMovies: null,
      openActorInfo: null,
      openActorBio: null,
      moveRight: 0,
      containerWidth: 0,
      scrollWidth: 0,
      headerMoveLeft: false,
      currentElPosition: 0
    });
  };

  showAllHandler = () => {
    this.setState({
      showAll: !this.state.showAll
    });
    this.navHandler();
  };

  render() {
    return (
      <React.Fragment>
        <div className={uiClasses.SectionHeader + ' ' + classes.CastHeader}>
          {this.state.currentElPosition > 0 && !this.state.openActor ? (
            <div className={classes.NavLeft}>
              <FontAwesomeIcon
                icon={faChevronLeft}
                className={classes.ChevronArrowRight + ' ' + uiClasses.PrevIcon}
                onClick={() => this.navHandler('left')}
              />
            </div>
          ) : null}
          <h2
            className={
              this.state.currentElPosition > 0 && !this.state.openActor
                ? uiClasses.SectionHeaderMoveLeft
                : null
            }
          >
            Cast
          </h2>
          <div className={classes.NavRight}>
            {this.state.list === null ? null : this.state.list.length > 0 &&
              !this.state.openActor ? (
              <div className={classes.ShowAll} onClick={this.showAllHandler}>
                <FontAwesomeIcon
                  icon={this.state.showAll ? faChevronUp : faChevronDown}
                  className={classes.ShowChevronDown}
                />
                {this.state.showAll ? 'Show Less' : 'Show All'}
              </div>
            ) : null}

            {this.state.showNavRight && !this.state.openActor && !this.state.showAll ? (
              <FontAwesomeIcon
                icon={faChevronRight}
                className={classes.ChevronArrowRight + ' ' + uiClasses.NextIcon}
                onClick={() => this.navHandler('right')}
              />
            ) : null}
          </div>
        </div>

        <div className={classes.List}>
          <div
            style={{ display: 'flex', alignItems: 'center', marginLeft: '5px' }}
          ></div>
          <div className={classes.ListContainer}>
            {this.state.openActorInfo && this.state.openActorBio ? (
              <OpenActor
                character={this.state.openActorChar}
                movies={this.state.openActorMovies}
                actorInfo={this.state.openActorInfo}
                actorBio={this.state.openActorBio}
                close={this.actorCloseHandler}
                openMovieClick={this.props.openMovie}
                // actorId={this.state.actorInfo.actorId}
              />
            ) : (
              <div
                className={
                  this.state.showAll
                    ? classes.ListItemsShowAll
                    : classes.ListItems
                }
                ref={this.containerWidthRef}
              >
                {this.state.list !== null
                  ? this.state.list.length > 0
                    ? this.state.list
                    : null
                  : null}
                {this.state.noResults ? (
                  <h2 className={uiClasses.NoResults}>No Results Found</h2>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ActorList;
