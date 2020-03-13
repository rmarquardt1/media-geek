import React, { useState, useEffect } from "react";
import Network from "./Network/Network";
import axios from "axios";
import networks from "../../../references/networks";

import classes from "./ChooseNetworks.module.css";
import genreClasses from "../ChooseGenres/Genre/Genre.module.css";

// const networks = [
//   {
//     name: "Netflix",
//     id: 213,
//     image: "http://image.tmdb.org/t/p/w154/wwemzKWzjKYJFfCeiB57q3r4Bcm.png"
//   },
//   {
//     name: "Amazon",
//     id: 1024,
//     image: "http://image.tmdb.org/t/p/w154/h80ZoKsOPXKG7tgsMhm0znzJAkT.png"
//   },
//   {
//     name: "Hulu",
//     id: 453,
//     image: "http://image.tmdb.org/t/p/w154/4giYeGORZzztkAAd1HOzrQ4iaLW.png"
//   },
//   {
//     name: "HBO",
//     id: 49,
//     image: "http://image.tmdb.org/t/p/w92/tuomPhY2UtuPTqqFnKMVHvSb724.png"
//   },
//   {
//     name: "Cinemax",
//     id: 359,
//     image: "http://image.tmdb.org/t/p/w92/6mSHSquNpfLgDdv6VnOOvC5Uz2h.png"
//   },
//   {
//     name: "Starz",
//     id: 318,
//     image: "http://image.tmdb.org/t/p/w92/8GJjw3HHsAJYwIWKIPBPfqMxlEa.png"
//   },
//   {
//     name: "Encore",
//     id: 758,
//     image: "http://image.tmdb.org/t/p/w92/iV3yGuHerGb6yjtNgGlCabTARse.png"
//   },
//   {
//     name: "Showtime",
//     id: 67,
//     image: "http://image.tmdb.org/t/p/w92/Allse9kbjiP6ExaQrnSpIhkurEi.png"
//   },
//   {
//     name: "Adult Swim",
//     id: 80,
//     image: "http://image.tmdb.org/t/p/w92/v9ma1uXIjIR8D2LG3y5UaUKrgTz.png"
//   },
//   {
//     name: "Cartoon Network",
//     id: 56,
//     image: "http://image.tmdb.org/t/p/w92/nDFWFbAHEZ8Towq7fsVCgv4U245.png"
//   },
//   {
//     name: "FX",
//     id: 88,
//     image: "http://image.tmdb.org/t/p/w92/aexGjtcs42DgRtZh7zOxayiry4J.png"
//   },
//   {
//     name: "AMC",
//     id: 174,
//     image: "http://image.tmdb.org/t/p/w92/y2hQXpvXOP2PL4XDgjDEG6lNvMc.png"
//   },
//   {
//     name: "TBS",
//     id: 68,
//     image: "http://image.tmdb.org/t/p/w92/yKcXpmGS9igAvsttijfQALKZKDj.png"
//   },
//   {
//     name: "TNT",
//     id: 41,
//     image: "http://image.tmdb.org/t/p/w92/6ISsKwa2XUhSC6oBtHZjYf6xFqv.png"
//   },
//   {
//     name: "NBC",
//     id: 6,
//     image: "http://image.tmdb.org/t/p/w92/4tg60YhOwXieVhGwuGxefGWbJr6.png"
//   },
//   {
//     name: "CBS",
//     id: 16,
//     image: "http://image.tmdb.org/t/p/w92/nm8d7P7MJNiBLdgIzUK0gkuEA4r.png"
//   },
//   {
//     name: "ABC",
//     id: 2,
//     image: "http://image.tmdb.org/t/p/w92/an88sKsFz0KX5CQngAM95WkncX4.png"
//   },
//   {
//     name: "FOX",
//     id: 19,
//     image: "http://image.tmdb.org/t/p/w92/1DSpHrWyOORkL9N2QHX7Adt31mQ.png"
//   }
// ];

// class ChooseNetworks extends Component {

const ChooseNetworks = props => {
  const [selectedNetworks, setSelectedNetworks] = useState([]);
  const [showAll, setShowAll] = useState(true);

  // state = {
  //   selectedNetworks: [],
  //   favNetworks: null
  // };

  // componentDidUpdate() {
  //   console.log(state.selectedNetworks);
  // }

  useEffect(() => {
    if (props.reload) {
      reloadNetworksHandler();
      props.reloaded();
    }
  });

  let networksRef = React.createRef();

  const showHideGenresHandler = event => {
    const favGenres = networksRef.current.querySelectorAll(
      "div[favorite=true]"
    );
    const genres = networksRef.current.querySelectorAll("div[favorite=false]");

    Object.keys(favGenres).map(k => {
      favGenres[k].style.border = "3px solid #1a8cff";
    });

    if (event.currentTarget.id === "edit") {
      // editRef.current.style.display = 'none';
      // confirmRef.current.style.display = 'block';
    }
    if (event.currentTarget.id === "confirm") {
      // editRef.current.style.display = 'block';
      // confirmRef.current.style.display = 'none';
    }
    if (!showAll) {
      Object.keys(favGenres).map(k => {
        favGenres[k].classList.add(genreClasses.GenreHover);
      });
      for (let i = 0; i < genres.length; i++) {
        genres[i].style.display = "flex";
        genres[i].classList.add(genreClasses.GenreHover);
      }
      setShowAll(!showAll);
    } else {
      for (let i = 0; i < genres.length; i++) {
        genres[i].style.display = "none";
        Object.keys(favGenres).map(k => {
          favGenres[k].style.border = "0px solid rgba(0,0,0,0.5)";
          favGenres[k].style.transition = "none";
          favGenres[k].classList.remove(genreClasses.GenreHover);
        });
      }
      setShowAll(!showAll);
    }
  };

  // componentDidMount() {
  //   if (props.page === "account") {
  //     getFavNetworksHandler();
  //   }
  // }

  // getFavNetworksHandler = () => {
  //   let favNetworks = [];

  //   // console.log(JSON.parse(localStorage.getItem("userData")).favNetworks);
  //   const favs = JSON.parse(localStorage.getItem("userData")).favNetworks;

  //   networks.map(network => {
  //     //  console.log(network);
  //     for (let i = 0; i < favs.length; i++) {
  //       if (network.id === favs[i]) {
  //         favNetworks.push({
  //           name: network.name,
  //           id: network.id,
  //           image: network.image
  //         });
  //       }
  //     }

  //     return null;
  //   });
  //   setState({ favNetworks: favNetworks });
  // };

  const networkClickHandler = id => {
    let newNetworks = null;
    const networksCopy = [...state.selectedNetworks];
    const exists = networksCopy.some(el => {
      return el === id;
    });
    if (exists) {
      newNetworks = networksCopy.filter(networkId => networkId !== id);
    } else {
      newNetworks = state.selectedNetworks.concat(id);
    }
    setState({ selectedNetworks: newNetworks });
  };

  const onSubmitHandler = () => {
    const uid = localStorage.userId;
    const networks = [...state.selectedNetworks];
    axios
      .put(
        "https://mediageek-650c6.firebaseio.com/users/" +
          uid +
          "/favNetworks.json",
        networks
      )
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log("error " + error);
      });
  };

  // render() {

  // const arr = state.favNetworks ? state.favNetworks : networks;

  // const networkList = arr.map(network => {
  //   return (
  //     <Network
  //       key={network.id}
  //       name={network.name}
  //       id={network.id}
  //       image={network.image}
  //       click={networkClickHandler}
  //       page={props.page}
  //     />
  //   );
  // });

  const networkList = networks.map(network => {
    return (
      <Network
        key={network.id}
        name={network.name}
        id={network.id}
        image={network.image}
        click={networkClickHandler}
        page={props.page}
        favorite={
          JSON.parse(localStorage.getItem("userData")).favNetworks.includes(
            network.id
          )
            ? true
            : false
        }
      />
    );
  });

  return (
    <div
      className={classes.ChooseNetworks}
      style={
        props.page === "account"
          ? {
              paddingLeft: 0,
              paddingTop: 0,
              justifyContent: "flex-start",
              marginBottom: "30px"
            }
          : null
      }
    >
      <div
        className={classes.InnerContainer}
        style={
          props.page === "account"
            ? {
                alignItems: "flex-start"
              }
            : null
        }
      >
        <h1
          style={
            props.page === "account"
              ? {
                  fontSize: "24px",
                  fontWeight: "normal",
                  marginBottom: "10px"
                }
              : null
          }
        >
          {props.page === "account"
            ? "Favorite networks"
            : "Choose your favorite networks"}
        </h1>
        <div
          ref={networksRef}
          className={classes.NetworkList}
          style={
            props.page === "account"
              ? {
                  justifyContent: "flex-start"
                }
              : null
          }
        >
          {networkList}
        </div>
        {!props.page === "account" ? (
          <button
            className={classes.ButtonRed}
            onClick={
              props.clickNext
                ? props.clickNext.bind(networks, state.selectedNetworks)
                : null
            }
          >
            Next
          </button>
        ) : null}
      </div>
    </div>
  );
  // }
};

export default ChooseNetworks;
