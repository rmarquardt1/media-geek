const listAxiosParams = (listType, query, actorId) => {
  let params = {
    api_key: '4c7294000365c14a8e42109c863ff772',
    language: 'en-US',
    region: 'US',
    include_adult: 'false',
    include_video: 'false'
  };
  switch (listType) {
    case 'actorMovies':
      params = { ...params, with_people: actorId };
      break;
    case 'pickedMovies':
      params = {
        ...params,
        sort_by: 'vote_count.desc',
        with_genres: JSON.parse(
          localStorage.getItem('userData')
        ).favMovieGenres.join('|')
      };
      break;
    case 'pickedTv':
      params = {
        ...params,
        sort_by: 'vote_count.desc',
        with_genres: JSON.parse(
          localStorage.getItem('userData')
        ).favTvGenres.join('|'),
        with_networks: JSON.parse(
          localStorage.getItem('userData')
        ).favNetworks.join('|')
      };
      break;
    case 'popularStreamingTv':
      params = { ...params, with_networks: '213|1024|453' };
      break;
    case 'topRatedStreamingTv':
      params = {
        ...params,
        with_networks: '213|1024|453',
        sort_by: 'vote_count.desc'
      };
      break;
    case 'amazon':
      params = { ...params, with_networks: '1024' };
      break;
    case 'hulu':
      params = { ...params, with_networks: '453' };
      break;
    case 'disneyPlus':
      params = { ...params, with_networks: '2739' };
      break;
    case 'searchTv':
    case 'searchMovies':
      params = { ...params, query: query };
      break;
    default:
      params = params;
  }
  return params;
};

export default listAxiosParams;
