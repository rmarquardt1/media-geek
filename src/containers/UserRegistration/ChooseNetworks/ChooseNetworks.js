import React, { Component } from 'react';
import Network from './Network/Network';
import axios from 'axios';

import classes from './ChooseNetworks.module.css';

class ChooseNetworks extends Component {
  state = {
    selectedNetworks: []
  };

  componentDidUpdate() {
    console.log(this.state.selectedNetworks);
  }

  networkClickHandler = id => {
    let newNetworks = null;
    const networksCopy = [...this.state.selectedNetworks];
    const exists = networksCopy.some(el => {
      return el === id;
    });
    if (exists) {
      newNetworks = networksCopy.filter(networkId => networkId !== id);
    } else {
      newNetworks = this.state.selectedNetworks.concat(id);
    }
    this.setState({ selectedNetworks: newNetworks });
  };

  onSubmitHandler = () => {
    const uid = localStorage.userId;
    const networks = [...this.state.selectedNetworks];
    axios
      .put(
        'https://mediageek-650c6.firebaseio.com/users/' +
          uid +
          '/favNetworks.json',
        networks
      )
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log('error ' + error);
      });
  };

  render() {
    const networks = [
      {
        name: 'Netflix',
        id: 213,
        image: 'http://image.tmdb.org/t/p/w154/wwemzKWzjKYJFfCeiB57q3r4Bcm.png'
      },
      {
        name: 'Amazon',
        id: 1024,
        image: 'http://image.tmdb.org/t/p/w154/h80ZoKsOPXKG7tgsMhm0znzJAkT.png'
      },
      {
        name: 'Hulu',
        id: 453,
        image: 'http://image.tmdb.org/t/p/w154/4giYeGORZzztkAAd1HOzrQ4iaLW.png'
      },
      {
        name: 'HBO',
        id: 49,
        image: 'http://image.tmdb.org/t/p/w92/tuomPhY2UtuPTqqFnKMVHvSb724.png'
      },
      {
        name: 'Cinemax',
        id: 359,
        image: 'http://image.tmdb.org/t/p/w92/6mSHSquNpfLgDdv6VnOOvC5Uz2h.png'
      },
      {
        name: 'Starz',
        id: 318,
        image: 'http://image.tmdb.org/t/p/w92/8GJjw3HHsAJYwIWKIPBPfqMxlEa.png'
      },
      {
        name: 'Encore',
        id: 758,
        image: 'http://image.tmdb.org/t/p/w92/iV3yGuHerGb6yjtNgGlCabTARse.png'
      },
      {
        name: 'Showtime',
        id: 67,
        image: 'http://image.tmdb.org/t/p/w92/Allse9kbjiP6ExaQrnSpIhkurEi.png'
      },
      {
        name: 'Adult Swim',
        id: 80,
        image: 'http://image.tmdb.org/t/p/w92/v9ma1uXIjIR8D2LG3y5UaUKrgTz.png'
      },
      {
        name: 'Cartoon Network',
        id: 56,
        image: 'http://image.tmdb.org/t/p/w92/nDFWFbAHEZ8Towq7fsVCgv4U245.png'
      },
      {
        name: 'FX',
        id: 88,
        image: 'http://image.tmdb.org/t/p/w92/aexGjtcs42DgRtZh7zOxayiry4J.png'
      },
      {
        name: 'AMC',
        id: 174,
        image: 'http://image.tmdb.org/t/p/w92/y2hQXpvXOP2PL4XDgjDEG6lNvMc.png'
      },
      {
        name: 'TBS',
        id: 68,
        image: 'http://image.tmdb.org/t/p/w92/yKcXpmGS9igAvsttijfQALKZKDj.png'
      },
      {
        name: 'TNT',
        id: 41,
        image: 'http://image.tmdb.org/t/p/w92/6ISsKwa2XUhSC6oBtHZjYf6xFqv.png'
      },
      {
        name: 'NBC',
        id: 6,
        image: 'http://image.tmdb.org/t/p/w92/4tg60YhOwXieVhGwuGxefGWbJr6.png'
      },
      {
        name: 'CBS',
        id: 16,
        image: 'http://image.tmdb.org/t/p/w92/nm8d7P7MJNiBLdgIzUK0gkuEA4r.png'
      },
      {
        name: 'ABC',
        id: 2,
        image: 'http://image.tmdb.org/t/p/w92/an88sKsFz0KX5CQngAM95WkncX4.png'
      },
      {
        name: 'FOX',
        id: 19,
        image: 'http://image.tmdb.org/t/p/w92/1DSpHrWyOORkL9N2QHX7Adt31mQ.png'
      }
    ];
    const networkList = networks.map(network => {
      return (
        <Network
          key={network.id}
          name={network.name}
          id={network.id}
          image={network.image}
          click={this.networkClickHandler}
        />
      );
    });
    return (
      <div className={classes.ChooseNetworks}>
        <div className={classes.InnerContainer}>
          <h1>Choose your favorite networks</h1>
          <div className={classes.NetworkList}>{networkList}</div>
          <button
            className={classes.ButtonRed}
            onClick={this.props.clickNext.bind(
              networks,
              this.state.selectedNetworks
            )}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default ChooseNetworks;
