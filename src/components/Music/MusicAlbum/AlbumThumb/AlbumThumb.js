import React, {Component} from 'react';
import classes from './AlbumThumb.module.css';
import Loader from '../../../UI/Loader/Loader';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';



class AlbumThumb extends Component {
  state = {
    imgLoaded: false,
    albumSelected: false
  }


    


render() {
    const releaseDate = new Date(this.props.releaseDate);
    const releaseYear = releaseDate.getFullYear();
    const titleLength = this.props.title.length;
    const albumTitle = titleLength > 45 ? this.props.title.substring(0, 45) + '...' : this.props.title;
    let albumClass = null;
    this.props.fadeOut ? albumClass = classes.AlbumThumbContainer + ' ' + classes.AlbumsFadeOut : albumClass = classes.AlbumThumbContainer;

    return (

      <Aux>
        
          <div 
          style={{margin: '10px', maxWidth: '200px'}} 
          className={classes.AlbumThumbContainer}
          onClick={this.props.click.bind(this, this.props)}>
            
        
            {/* <div 
              className={classes.AlbumThumb} 
              style={{backgroundImage: 'url(' + this.props.thumb + ')'}} 
              > */}


{this.state.imgLoaded ? null : <Loader addStyle={{margin: 'auto', top: '15%'}} />}

              <div className={classes.AlbumThumb} >


                


                <img 
                  src={this.props.thumb} 
                  alt="" 
                  onLoad={() => this.setState({imgLoaded: true})}
                  onError={() => this.setState({imgLoaded: true})}
                />

                

            <div className={classes.AlbumTitle}>{albumTitle}</div> 
            <div className={classes.ReleaseDate}>{releaseYear}</div> 

                
              </div>
            
        
          </div>

      </Aux>
    );




    }


  }












// const albumThumb = (props) => {

// console.log(this.props.title.length);

// const releaseDate = new Date(this.props.releaseDate);
// const releaseYear = releaseDate.getFullYear();

// const titleLength = this.props.title.length;

// const albumTitle = titleLength > 45 ? this.props.title.substring(0, 45) + '...' : this.props.title;

// return (

//   <div className={classes.AlbumThumbContainer}>
    

//     <div 
//       className={classes.AlbumThumb} 
//       style={{backgroundImage: 'url(' + this.props.thumb + ')'}}
//       >
//         <img src={this.props.thumb} alt="" />
//       </div>
//     <div className={classes.AlbumTitle}>{albumTitle}</div> 
//     <div className={classes.ReleaseDate}>{releaseYear}</div> 

//   </div>





export default AlbumThumb;