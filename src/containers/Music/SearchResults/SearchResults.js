import React, { Component } from 'react';
import MusicComp from '../../../containers/Music/MusicComp/MusicComp';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import NavBar from '../../UI/NavBar/NavBar';
import NavSearch from '../../Search/NavSearch/NavSearch';
import axios from 'axios';

import classes from './SearchResults.module.css';

class SrchResults extends Component {
  state = {
    searchResults: null,
    searchQuery: null,
    flexAdd: null
  };

  constructor(props) {
    super(props);
    this.elementRef = React.createRef();
    this.containerWidthRef = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.search !== this.props.match.params.search) {
      this.searchHandler();
    }
  }

  componentDidMount() {
    this.searchHandler();
    if (this.containerWidthRef.current) {
      window.addEventListener('resize', this.resizeHandler.bind(this));
      this.resizeHandler();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler.bind(this));
  }

  resizeHandler = () => {
    if (this.containerWidthRef.current) {
      const w = window.innerWidth;
      const elWidth =
        w < 631
          ? this.containerWidthRef.current.clientWidth * 0.44 + 20
          : w < 769
          ? 170
          : w < 1221
          ? 220
          : w < 1421
          ? 270
          : 320;
      const rowCount = Math.floor(
        this.containerWidthRef.current.clientWidth / elWidth
      );
      const totalCount = this.containerWidthRef.current.getElementsByTagName(
        'a'
      ).length;
      const remainder = totalCount % rowCount;
      const addDiv = rowCount - remainder;
      this.setState({
        flexAdd: addDiv
      });
    }
  };

  searchHandler = event => {
    axios
      .get(
        'https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/artist',
        {
          params: {
            q: this.props.match.params.search
          }
        }
      )
      .then(response => {
        this.setState({ searchResults: response.data.data });
      })
      .catch(error => {
        console.log('error ' + error);
      });
  };

  render() {
    let results = null;
    if (this.state.searchResults) {
      results = this.state.searchResults.map(item => {
        return (
          <MusicComp
            ref={this.elementRef}
            key={item.id}
            id={item.id}
            title={item.name}
            summary={item.overview}
            poster={item.picture_big}
            clicked={this.removeResizeHandler}
          />
        );
      });
      const w = window.innerWidth;
      const elWidth =
        w < 631
          ? this.containerWidthRef.current.clientWidth * 0.44 + 20
          : w < 769
          ? 170
          : w < 1221
          ? 220
          : w < 1421
          ? 270
          : 320;
      for (let step = 0; step < this.state.flexAdd; step++) {
        results.push(
          <div
            key={step}
            style={{
              content: '""',
              flex: 'auto',
              width: elWidth,
              maxWidth: elWidth
            }}
          ></div>
        );
      }
    }
    return (
      <Aux>
        <NavBar searchType="music" />
        <div className={classes.SearchResultsFor}>
          <div className={classes.NavSearch}>
            <NavSearch searchType="music" />
          </div>
          <div>
            Search Results for "
            <span style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
              {this.props.match.params.search}
            </span>
            "
          </div>
        </div>
        <div className={classes.SearchResults} ref={this.containerWidthRef}>
          {results}
        </div>
      </Aux>
    );
  }
}

export default SrchResults;
