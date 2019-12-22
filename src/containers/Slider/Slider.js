import React, { Component } from 'react';
import axios from 'axios';
import Slide from '../../components/Slider/Slide/Slide';
import listUrl from '../../references/listUrl';
import listAxiosParams from '../../references/listAxiosParams';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import AwsSliderStyles from 'react-awesome-slider/dist/styles.css';
// import AwsSliderStyles from 'react-awesome-slider/dist/custom-animations/fold-out-animation.css';
import './awesome-slider-override.css';

const AutoplaySlider = withAutoplay(AwesomeSlider);

class Slider extends Component {
  axiosCancel = axios.CancelToken.source();
  state = {
    sliderData: [],
    loadFinished: false
  };

  componentDidMount() {
    this.getSliderIds();
  }

  componentWillUnmount() {
    this.axiosCancel.cancel();
  }

  getSliderIds = async () => {
    let movieIdArr = [];
    axios
      .get(listUrl('inTheatres'), {
        cancelToken: this.axiosCancel.token,
        params: listAxiosParams()
      })
      .then(response => {
        for (let i = 0; i < 10; i++) {
          movieIdArr = [...movieIdArr, response.data.results[i].id];
        }
        this.getSliderData(movieIdArr);
      })
      .catch(error => {
        if (error.response && error.response.status === 429) {
          const timeOut = parseInt(
            error.response.headers['retry-after'] + '000'
          );
          setTimeout(() => {
            this.getSliderIds();
          }, timeOut);
        } else {
          console.log('error: ' + error);
        }
      });
  };

  getSliderData = movieIdArr => {
    movieIdArr.map(item => {
      let slideData = {};
      axios
        .get('https://api.themoviedb.org/3/movie/' + item, {
          cancelToken: this.axiosCancel.token,
          params: {
            api_key: '4c7294000365c14a8e42109c863ff772'
          }
        })
        .then(async response => {
          await axios
            .get(
              'http://webservice.fanart.tv/v3/movies/' + response.data.imdb_id,
              {
                params: {
                  api_key: 'c3f4fba1e26da407177b194566ca2d3f'
                }
              }
            )
            .then(response => {
              //  if (response.data.hdmovielogo[0].url) {
              slideData.logoUrl = response.data.hdmovielogo[0].url;
              //  }
            })
            .catch(error => {
              console.log('error ' + error);
            });

          slideData.title = response.data.title;
          slideData.bgImage = response.data.backdrop_path;
          slideData.caption = response.data.tagline;
          slideData.poster = response.data.poster_path;
          slideData.overview = response.data.overview;

          this.setState({
            sliderData: [...this.state.sliderData, slideData]
          });
        })
        .catch(error => {
          if (error.response && error.response.status === 429) {
            const timeOut = parseInt(
              error.response.headers['retry-after'] + '000'
            );
            setTimeout(() => {
              this.getSliderIds();
            }, timeOut);
          } else {
            console.log('error: ' + error);
          }
        });
    });
  };

  render() {
    let slides = null;
    let startup = null;
    
    if (this.state.sliderData.length !== 0) {
      slides = this.state.sliderData.map((slide, index) => {
        startup = (
          <div key={index}>
            <Slide
              bgImage={slide.bgImage}
              logoUrl={slide.logoUrl}
              title={slide.title}
              caption={slide.caption}
              overview={slide.overview}
            />
          </div>
        );
        return (
          <div key={index}>
            <Slide
              bgImage={slide.bgImage}
              logoUrl={slide.logoUrl}
              title={slide.title}
              caption={slide.caption}
              overview={slide.overview}
            />
          </div>
        );
      });
    }

    return (
      <div>
        {this.state.sliderData.length !== 0 ? (
          <AutoplaySlider
           startupScreen={startup}
            play={true}
            cssModule={AwsSliderStyles}
            interval={5000}
          >
            {slides}
          </AutoplaySlider>
        ) : null}
      </div>
    );
  }
}

export default Slider;
