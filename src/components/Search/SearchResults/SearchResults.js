import React, {Component} from 'react';
import MusicComp from '../../../containers/Music/MusicComp/MusicComp';
import axios from 'axios';


import classes from './SearchResults.module.css';

// const srchResults = (props) => {

class SrchResults extends Component {


  state = {
    searchResults: null
  }



  componentDidMount() {
    console.log(this);


    axios.get('https://api.themoviedb.org/3/search/movie',
      {params: {
        api_key: '4c7294000365c14a8e42109c863ff772',
        language: 'en-US',
        query: this.props.match.params.search,
        sort_by: 'popularity.desc'
      }}
      ).then(response => {
        // setTimeout(() => {
          console.log(response);
          this.setState({searchResults: response.data});
        // }, 300);
        
        }).catch(error => {
          console.log('error ' + error);
        });







  }




  
  // componentDidMount() {

  //   // console.log(this.props);
  //   // this.props.history.push('/SearchResults');


  //   // console.log(this.props.history);

    
  // }

  render() {

    














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




        const results = this.state.searchResults.map(item => {
          return (
            <MusicComp
            key={item.id}
            id={item.id}
            title={item.name}
            summary={item.overview}
            poster={item.picture_big}
            // clicked={this.props.clicked.bind(this, item)}
          />)      
        });
     
      

    


    return (
      <div className={classes.SearchResults}>
        {results}
      </div>






















    );




  }








}

  


 



// }

// export default withRouter(SrchResults);
export default SrchResults;