import React, { Component } from 'react';
import axios from 'axios';
import Game from './Game/Game';
import OpenGame from '../Games/OpenGame/OpenGame';
import Loader from '../../components/UI/Loader/Loader';
import NavBar from '../UI/NavBar/NavBar';
import Aux from '../../hoc/Auxiliary/Auxiliary';

import classes from './Games.module.css';

class Games extends Component {
  state = {
    searchQuery: 'Metroid',
    queryResults: null,
    showResults: false,
    submitted: false,
    openItem: null,
    loading: false,
    menuOpen: false
  };

  inputHandler = event => {
    this.setState({ searchQuery: event.target.value });
  };

  searchHandler = event => {
    this.setState({ loading: true });
    event.preventDefault();
    this.setState({ submitted: true });
    axios
      .get('https://www.gamespot.com/api/games/', {
        params: {
          api_key: '0d8aa8ecdf3c37b7298d475400f243d7d9ec6b09',
          filter: 'name:' + this.state.searchQuery,
          format: 'json'
        }
      })
      .then(response => {
        setTimeout(() => {
          this.setState({
            queryResults: response.data.results,
            showResults: true,
            loading: false,
            openItem: null
          });
        }, 300);
      })
      .catch(error => {
        console.log('error ' + error);
      });
  };

  gameClickHandler = item => {
    const openedItem = <OpenGame item={item} />;
    this.setState({ showResults: false, openItem: openedItem });
  };

  backToResultsHandler = () => {
    this.setState({ showResults: true, openItem: null });
  };

  openMenuHandler = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  };

  render() {
    let items = null;
    let page = null;

    if (this.state.openItem) {
      page = <div>{this.state.openItem}</div>;
    }

    if (this.state.queryResults && this.state.showResults) {
      items = <p>Something went wrong!</p>;
      if (!this.state.error) {
        items = this.state.queryResults.map(item => {
          return (
            <Game
              key={item.id}
              title={item.name}
              deck={item.deck}
              summary={item.overview}
              poster={!item.image ? '' : item.image.original}
              release={item.release_date}
              popularity={item.popularity}
              clicked={this.gameClickHandler.bind(this, item)}
            />
          );
        });
        page = (
          <Route
            path="/results"
            render={() => <SearchResults items={items} {...this.props} />}
          />
        );
        page = <SearchResults items={items} />;
      }
    }

    return (
      <Aux>
        <NavBar
          submitted={this.state.submitted}
          changed={this.inputHandler}
          submit={this.searchHandler}
          event={this.event}
          back={this.backToResultsHandler}
          itemOpen={this.state.openItem}
          searchType="Game Title"
          click={this.openMenuHandler}
          menuOpened={this.state.menuOpen}
        />
        <section className={classes.MediaProject}>
          {this.state.loading ? <Loader /> : page}
        </section>
      </Aux>
    );
  }
}

export default Games;
