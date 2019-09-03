import React, {Component} from 'react';
import TvSeries from '../TvSeries/TvSeries';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import NavBar from '../../../components/UI/NavBar/NavBar';
import SideBar from '../../../containers/Home/SideBar/SideBar';
import {NavLink} from 'react-router-dom';
import axios from 'axios';


import classes from './SearchResults.module.css';

class SrchResults extends Component { 

  state = {
    searchResults: null,
    searchQuery: this.props.match.params.search,
    flexAdd: null,
    mobileDisplay: null
  }

  constructor(props) {
    super(props);
    this.elementRef = React.createRef();
    this.containerWidthRef = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.props.match.params.search) {
      this.getResultsHandler();
      this.setState({searchQuery: this.props.match.params.search});
    }
  }

  componentDidMount() {
    this.getResultsHandler();
    if (this.containerWidthRef.current) {
      window.addEventListener('resize', this.resizeHandler.bind(this));
      this.resizeHandler();
    }
  }



  resizeHandler = () => {
    if (this.containerWidthRef.current) {
      const w = window.innerWidth;
      const elWidth = w < 631 ? (this.containerWidthRef.current.clientWidth * .44 + 20) : w < 769 ? 220 : w  < 1367 ? 240 : 320;
      const rowCount = Math.floor(this.containerWidthRef.current.clientWidth / elWidth);
      const totalCount = this.containerWidthRef.current.getElementsByTagName('a').length;
      const remainder = totalCount % rowCount;
      const addDiv = rowCount - remainder;
      this.setState({
        flexAdd: addDiv
      });
    }
    if (window.innerWidth <= 500) {
      this.setState({mobileDisplay: true})
    } else {
      this.setState({mobileDisplay: false});
    }
  }

  getResultsHandler = () => {
    axios.get('https://api.themoviedb.org/3/search/tv',
      {params: {
        api_key: '4c7294000365c14a8e42109c863ff772',
        language: 'en-US',
        query: this.props.match.params.search,
        include_adult: 'false',
        sort_by: 'popularity.desc'
      }}
      ).then(response => {
          this.setState({searchResults: response.data.results});
      }).catch(error => {
        console.log('error ' + error);
      });
  }

  render() {

    let results = null;

    if (this.state.searchResults) {
      const tvDimensions = this.state.mobileDisplay ? {
        width: '100px',
        height: '120px',
        tvHeight: '210px',
        fontSize:'12px'
      } : null;
      results = this.state.searchResults.map(item => {
        if (item.poster_path) {
          return (
            <NavLink style={{color:'#fff', textDecoration: 'none'}} to={'/Tv/' + item.id} key={item.id}>
              <TvSeries 
              ref={this.elementRef}
              id={item.id}
              backdrop={item.backdrop_path}
              title={item.name}
              summary={item.overview}
              poster={item.poster_path}
              release={item.release_date}
              popularity={item.popularity}
              dimensions={tvDimensions}
              // clicked={this.movieClickHandler.bind(this, item)}
            />
          </NavLink>
          ); 


        }
            
      });

      const w = window.innerWidth;
        const elWidth = w < 631 ? (this.containerWidthRef.current.clientWidth * .44 + 20) : w < 769 ? 220 : w  < 1367 ? 240 : 320;

        for (let step =0; step < this.state.flexAdd; step++ ) {
          results.push(<div key={step} style={{content:'""', flex: 'auto', width: elWidth, maxWidth: elWidth}}></div>);
        }

    }
        
     
    return (

      <Aux>
        <SideBar />
        <NavBar searchType="movies" />
        <div className={classes.SearchResultsFor}>
          <div>
          Search Results for "<span style={{fontStyle: 'italic', fontWeight: 'bold'}}>{this.props.match.params.search}</span>"
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