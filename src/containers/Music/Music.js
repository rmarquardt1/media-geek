import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'; 
// import axios from 'axios';
// import MusicComp from './MusicComp/MusicComp';
import Search from '../../components/Search/Search';
// import SearchResults from '../../components/Search/SearchResults/SearchResults';
// import OpenMusic from '../Music/OpenMusic/OpenMusic';
// import Loader from '../../components/UI/Loader/Loader';
import NavBar from '../../components/UI/NavBar/NavBar';
import Aux from '../../hoc/Auxiliary/Auxiliary';

import classes from './Music.module.css';

class Music extends Component {
  state = {
    searchQuery: 'Rush',
    searchResults: false
    // queryResults: null,
    // showResults: true,
    // submitted: false,
    // openItem: null,
    // loading: false,
    // menuOpen: false
  }

  inputHandler = (event) => {
    this.setState({searchQuery: event.target.value});
  }

  searchHandler = (event) => {
    event.preventDefault();
    this.setState({searchResults: true});
  }






  // artistSearchHandler = (event) => {
  //   this.setState({loading: true});
  //   event.preventDefault();
  //   this.setState({submitted: true});
  //   axios.get('https://api.deezer.com/search/artist',
  //   {params: {
  //     q: this.state.searchQuery,
  //     limit: 10
  //   }
  //   }).then(response => {
  //       setTimeout(() => {
  //         this.setState({queryResults: response.data.data, showResults: true, loading: false, openItem: null});
  //       }, 300);
  //       }).catch(error => {
  //         console.log('error ' + error);
  //       });
  //   }

  // MusicClickHandler = (item) => {
  //   const openedItem = (
  //     <OpenMusic item={item} />
  //   )
  //   this.setState({showResults: false, openItem: true});
  // }

  // backToResultsHandler = () => {
  //   this.setState({showResults: true, openItem: null});
  // }

  // openMenuHandler = () => {
  //   this.setState({menuOpen: !this.state.menuOpen})
  // }

  render() {
    // let items = null;
    // let page = null;

    if (this.state.searchResults) {
      return <Redirect to={'/Music/SearchResults/' + this.state.searchQuery} />
    }

    





    // if (this.state.queryResults && this.state.showResults) {
    //   items = <p>Something went wrong!</p>;
    //   if (!this.state.error) {
    //     items = this.state.queryResults
    //       .map(item => {
    //           return (
    //             <MusicComp
    //             key={item.id}
    //             id={item.id}
    //             title={item.name}
    //             summary={item.overview}
    //             poster={item.picture_big}
    //             clicked={this.MusicClickHandler.bind(this, item)}
    //           />)      
    //         });
    //       page = <SearchResults items={items} />;
    //     } 
    //   }


        return (
          <Aux>
            <NavBar searchType="music" />
          {/* <NavBar 
            submitted={this.state.submitted}
            changed={this.inputHandler}
            submit={this.artistSearchHandler}
            event={this.event}
            back={this.backToResultsHandler}
            itemOpen={this.state.openItem}
            searchType='Artist Name'
            click={this.openMenuHandler}
            menuOpened={this.state.menuOpen}
          /> */}

          {/* {this.props.location.pathname === '/Music' || this.props.location.pathname === '/Music/' ? */}
            <section className={classes.MediaProject}>
            <Search
              submitted={this.state.submitted}
              changed={this.inputHandler}
              submit={this.searchHandler}
              event={this.event}
              back={this.backToResultsHandler}
              itemOpen={this.state.openItem}
              searchType='music'
              placeholder='Artist Name'
            />
            
         </section>
         {/* : null} */}

            {/* {this.state.loading ? <Loader /> : page} */}

{/* 
            {this.state.loading ? <Loader /> 
              : this.state.queryResults && this.state.showResults ? <SearchResults items={this.state.queryResults} clicked={this.MusicClickHandler} /> 
              : null
            } */}
          
          
          
          





            



            {/* {this.state.openItem ? this.state.openItem : null} */}
          


           


          </Aux>
        );

    }

  }





export default Music;