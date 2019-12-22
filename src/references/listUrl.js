const listUrl = (listType, id) => {
  let url = null;
  switch (listType) {
    case 'searchTv':
      url = 'https://api.themoviedb.org/3/search/tv';
      break;
    case 'searchMovies':
      url = 'https://api.themoviedb.org/3/search/movie';
      break;
    case 'inTheatres':
      url = 'https://api.themoviedb.org/3/movie/now_playing?';
      break;
    case 'upcomingReleases':
      url = 'https://api.themoviedb.org/3/movie/upcoming?';
      break;
    case 'topRatedMovies':
      url = 'https://api.themoviedb.org/3/movie/top_rated?';
      break;
    case 'popularMovies':
      url = 'https://api.themoviedb.org/3/movie/popular?';
      break;
    case 'similiarMovies':
      url = 'https://api.themoviedb.org/3/movie/' + id + '/similar?';
      break;
    case 'recommendedMovies':
      url = 'https://api.themoviedb.org/3/movie/' + id + '/recommendations?';
      break;
    case 'airingThisWeek':
      url = 'https://api.themoviedb.org/3/tv/on_the_air?';
      break;
    case 'airingToday':
      url = 'https://api.themoviedb.org/3/tv/airing_today?';
      break;
    case 'popularTv':
      url = 'https://api.themoviedb.org/3/tv/popular?';
      break;
    case 'topRatedTv':
      url = 'https://api.themoviedb.org/3/tv/top_rated?';
      break;
    case 'actorMovies':
    case 'pickedMovies':
      url = 'https://api.themoviedb.org/3/discover/movie?';
      break;
    case 'pickedTv':
    case 'popularStreamingTv':
    case 'topRatedStreamingTv':
    case 'netflix':
    case 'amazon':
    case 'hulu':
    case 'disneyPlus':
      url = 'https://api.themoviedb.org/3/discover/tv?';
      break;
    default:
      url = null;
  }

  return url;
};

export default listUrl;
