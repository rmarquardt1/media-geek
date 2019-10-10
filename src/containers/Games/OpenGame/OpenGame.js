import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import axios from 'axios';
import GameArticle from '../../../components/Games/GameArticle/GameArticle';
import GameVideo from '../../../components/Games/GameVideo/GameVideo';

import classes from './OpenGame.module.css';

class OpenGame extends Component {
  state = {
    articleResults: null,
    videoResults: null
  };

  componentDidMount() {
    axios
      .get(this.props.item.articles_api_url, {
        params: {
          api_key: '0d8aa8ecdf3c37b7298d475400f243d7d9ec6b09',
          format: 'json',
          limit: 4
        }
      })
      .then(response => {
        this.setState({ articleResults: response.data.results });
      })
      .catch(error => {
        console.log('error ' + error);
      });

    axios
      .get(this.props.item.videos_api_url, {
        params: {
          api_key: '0d8aa8ecdf3c37b7298d475400f243d7d9ec6b09',
          format: 'json'
        }
      })
      .then(response => {
        this.setState({ videoResults: response.data.results });
      })
      .catch(error => {
        console.log('error ' + error);
      });
  }

  render() {
    let articles = null;
    let videos = null;

    if (this.state.articleResults) {
      articles = this.state.articleResults.map(article => {
        return (
          <GameArticle
            key={article.id}
            authors={article.authors}
            body={article.body}
            summary={article.deck}
            title={article.title}
            date={article.publish_date}
            thumb={article.image.square_tiny}
          />
        );
      });
    }

    if (this.state.videoResults) {
      videos = this.state.videoResults.map(video => {
        const videoUrl = video.hd_url;
        const videoUrlIndex = videoUrl.indexOf('.flv');
        if (videoUrlIndex < 0) {
          return (
            <GameVideo
              key={video.id}
              url={video.hd_url}
              summary={video.deck}
              title={video.title}
              date={video.publish_date}
              thumb={video.image.original}
            />
          );
        }
      });
    }

    const backdrop = 'url(' + this.props.item.image.original + ')';
    const genres = this.props.item.genres
      .map(genre => {
        return genre.name;
      })
      .join('\xa0/\xa0');

    return (
      <Aux>
        <div
          className={classes.OpenMovieBackdrop}
          style={{ backgroundImage: backdrop }}
        />
        <div className={classes.OpenMovieOverlay} />
        <div className={classes.OpenMovieContent}>
          <div className={classes.OpenMoviePoster}>
            <img src={this.props.item.image.original} alt="" />
          </div>
          <div className={classes.OpenMovieInfo}>
            <div className={classes.OpenMovieDesc}>
              <h1>{this.props.item.name}</h1>
              <p className={classes.OpenMovieGenres}>{genres}</p>
              <p>{this.props.item.description}</p>
            </div>
            <hr />
            <h2>Videos</h2>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                width: '100%',
                justifyContent: 'space-between'
              }}
            >
              {videos}
            </div>
            <hr />
            <h2>Articles</h2>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                width: '100%',
                justifyContent: 'space-between'
              }}
            >
              {articles}
            </div>
          </div>
        </div>
      </Aux>
    );
  }
}

export default OpenGame;
