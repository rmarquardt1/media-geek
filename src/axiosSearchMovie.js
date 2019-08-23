import axios from 'axios';



// const axiosSearchMovie = axios.create ({

//   crossDomain: true,
//   baseURL: 'https://api.themoviedb.org/3/search/',
//   params: {
//     api_key: '4c7294000365c14a8e42109c863ff772',
//     language: 'en-US'
//   }
  
// });


const axiosSearchMovie = axios.create ({

  crossDomain: true,
  baseURL: 'https://api.themoviedb.org/3/search/'
  
});

axiosSearchMovie.defaults.headers.common['Authorization'] = '4c7294000365c14a8e42109c863ff772';

export default axiosSearchMovie;