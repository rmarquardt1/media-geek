import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'; 
import Search from '../../components/Search/Search';
import NavBar from '../../components/UI/NavBar/NavBar';
import Aux from '../../hoc/Auxiliary/Auxiliary';

import classes from './Tv.module.css';

class Tv extends Component {
  state = {
    searchQuery: 'Stranger',
    searchResults: false
  }

  inputHandler = (event) => {
    this.setState({searchQuery: event.target.value})
  }

  searchHandler = (event) => {
    event.preventDefault();
    this.setState({searchResults: true});
  }
  render() {

    if (this.state.searchResults) {
      this.setState({searchResults: false})
      return <Redirect to={'/Tv/SearchResults/' + this.state.searchQuery} />
    }
      return (
        <Aux>
          <NavBar />
          <section className={classes.Tv}>
            <Search
              submitted={this.state.submitted}
              changed={this.inputHandler}
              submit={this.searchHandler}
              event={this.event}
              back={this.backToResultsHandler}
              itemOpen={this.state.openItem}
              searchType='tv'
              placeholder='Title'
            />
          </section>
        </Aux>
      );

    }

  }





export default Tv;