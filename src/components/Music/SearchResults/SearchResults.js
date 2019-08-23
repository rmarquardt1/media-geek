import React, {Component} from 'react';
import MusicComp from '../../../containers/Music/MusicComp/MusicComp';

import classes from './SearchResults.module.css';

// const srchResults = (props) => {

class SrchResults extends Component {


  
  // componentDidMount() {

  //   // console.log(this.props);
  //   // this.props.history.push('/SearchResults');


  //   // console.log(this.props.history);

    
  // }

  render() {

    console.log(this);








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




        const results = this.props.items.map(item => {
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