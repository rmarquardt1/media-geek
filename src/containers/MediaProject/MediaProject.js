import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'; 
import Search from '../../components/Search/Search';
import NavBar from '../../components/UI/NavBar/NavBar';
import Aux from '../../hoc/Auxiliary/Auxiliary';

import classes from './MediaProject.module.css';

class MediaProject extends Component {
  state = {
    searchQuery: 'Star Wars',
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
      return <Redirect to={'/Movies/SearchResults/' + this.state.searchQuery} />
    }
      return (
        <Aux>
          <NavBar />
          <section className={classes.MediaProject}>
            <Search
              submitted={this.state.submitted}
              changed={this.inputHandler}
              submit={this.searchHandler}
              event={this.event}
              back={this.backToResultsHandler}
              itemOpen={this.state.openItem}
              searchType='movie'
              placeholder='Movie Title'
            />
          </section>
        </Aux>
      );

    }

  }





export default MediaProject;