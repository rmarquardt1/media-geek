// import ActionImage from "../assets/images/action.jpg";
// import AdventureImage from "../assets/images/adventure.jpg";
// import ComedyImage from "../assets/images/comedy.jpg";
// import ComedyImageTv from "../assets/images/comedy_tv.jpg";
// import MusicImage from "../assets/images/music.jpg";
// import MysteryImage from "../assets/images/mystery.jpg";
// import MysteryImageTv from "../assets/images/mystery_tv.jpg";
// import RomanceImage from "../assets/images/romance.jpg";
// import AnimationImage from "../assets/images/animated.jpg";
// import AnimationImageTv from "../assets/images/animation_tv.jpg";
// import CrimeImage from "../assets/images/crime.jpg";
// import CrimeImageTv from "../assets/images/crime_tv.jpg";
// import DocumentaryImage from "../assets/images/documentary.jpg";
// import DocumentaryImageTv from "../assets/images/documentary_tv.jpg";
// import DramaImage from "../assets/images/drama.jpg";
// import DramaImageTv from "../assets/images/drama_tv.jpg";
// import FamilyImage from "../assets/images/family.jpg";
// import FamilyImageTv from "../assets/images/family_tv.jpg";
// import FantasyImage from "../assets/images/fantasy.jpg";
// import WarImage from "../assets/images/war.jpg";
// import HistoryImage from "../assets/images/history.jpg";
// import HorrorImage from "../assets/images/horror.jpg";
// import ScifiImage from "../assets/images/scifi.jpg";
// import ScifiImageTv from "../assets/images/scifi_tv.jpg";
// import TvMovieImage from "../assets/images/tvmovie.jpg";
// import ThrillerImage from "../assets/images/thriller.jpg";
// import WesternImage from "../assets/images/western.jpg";
// import KidsImageTv from "../assets/images/kids_tv.jpg";
// import NewsImageTv from "../assets/images/news_tv.jpg";
// import RealityImageTv from "../assets/images/reality_tv.jpg";
// import SoapImageTv from "../assets/images/soap_tv.jpg";
// import TalkImageTv from "../assets/images/talk_tv.jpg";
// import PoliticsImageTv from "../assets/images/politics_tv.jpg";
// import ActionImageTv from "../assets/images/action_tv.jpg";

const genreImages = {
  movieGenres: [
    {
      name: "Action",
      id: 28,
      // image: ActionImage
      image:
        "https://raw.githubusercontent.com/rmarquardt1/media-geek/master/src/assets/images/action.jpg"
    },
    {
      name: "Adventure",
      id: 12,
      // image: AdventureImage
      image:
        "https://raw.githubusercontent.com/rmarquardt1/media-geek/master/src/assets/images/adventure.jpg"
    },
    {
      name: "Animation",
      id: 16,
      // image: AnimationImage
      image:
        "https://raw.githubusercontent.com/rmarquardt1/media-geek/master/src/assets/images/animated.jpg"
    },
    {
      name: "Comedy",
      id: 35,
      // image: ComedyImage
      image:
        "https://raw.githubusercontent.com/rmarquardt1/media-geek/master/src/assets/images/comedy.jpg"
    },
    {
      name: "Crime",
      id: 80,
      // image: CrimeImage
      image:
        "https://raw.githubusercontent.com/rmarquardt1/media-geek/master/src/assets/images/crime.jpg"
    },
    {
      name: "Documentary",
      id: 99,
      // image: DocumentaryImage
      image:
        "https://raw.githubusercontent.com/rmarquardt1/media-geek/master/src/assets/images/documentary.jpg"
    },
    {
      name: "Drama",
      id: 18,
      // image: DramaImage
      image:
        "https://raw.githubusercontent.com/rmarquardt1/media-geek/master/src/assets/images/drama.jpg"
    },
    {
      name: "Family",
      id: 10751,
      // image: FamilyImage
      image:
        "https://raw.githubusercontent.com/rmarquardt1/media-geek/master/src/assets/images/family.jpg"
    },
    {
      name: "Fantasy",
      id: 14,
      // image: FantasyImage
      image:
        "https://raw.githubusercontent.com/rmarquardt1/media-geek/master/src/assets/images/fantasy.jpg"
    },
    {
      name: "History",
      id: 36,
      // image: HistoryImage
      image:
        "https://raw.githubusercontent.com/rmarquardt1/media-geek/master/src/assets/images/history.jpg"
    },
    {
      name: "Horror",
      id: 27,
      // image: HorrorImage
      image:
        "https://raw.githubusercontent.com/rmarquardt1/media-geek/master/src/assets/images/horror.jpg"
    },
    {
      name: "Music",
      id: 10402,
      // image: MusicImage
      image:
        "https://raw.githubusercontent.com/rmarquardt1/media-geek/master/src/assets/images/music.jpg"
    },
    {
      name: "Mystery",
      id: 9648,
      // image: MysteryImage
      image:
        "https://raw.githubusercontent.com/rmarquardt1/media-geek/master/src/assets/images/mystery.jpg"
    },
    {
      name: "Romance",
      id: 10749,
      // image: RomanceImage
      image:
        "https://raw.githubusercontent.com/rmarquardt1/media-geek/master/src/assets/images/romance.jpg"
    },
    {
      name: "Science Fiction",
      id: 878,
      // image: ScifiImage
      image:
        "https://raw.githubusercontent.com/rmarquardt1/media-geek/master/src/assets/images/scifi.jpg"
    },
    {
      name: "TV Movie",
      id: 10770,
      // image: TvMovieImage
      image:
        "https://raw.githubusercontent.com/rmarquardt1/media-geek/master/src/assets/images/tvmovie.jpg"
    },
    {
      name: "Thriller",
      id: 53,
      // image: ThrillerImage
      image:
        "https://raw.githubusercontent.com/rmarquardt1/media-geek/master/src/assets/images/thriller.jpg"
    },
    {
      name: "War",
      id: 10752,
      // image: WarImage
      image:
        "https://raw.githubusercontent.com/rmarquardt1/media-geek/master/src/assets/images/war.jpg"
    },
    {
      name: "Western",
      id: 37,
      // image: WesternImage
      image:
        "https://raw.githubusercontent.com/rmarquardt1/media-geek/master/src/assets/images/western.jpg"
    }
  ],
  tvGenres: [
    {
      name: "Action & Adventure",
      id: 10759,
      // image: ActionImageTv
      image:
        "https://raw.githubusercontent.com/rmarquardt1/media-geek/master/src/assets/images/action_tv.jpg"
    },
    {
      name: "Animation",
      id: 16,
      // image: AnimationImageTv
      image:
        "https://raw.githubusercontent.com/rmarquardt1/media-geek/master/src/assets/images/animation_tv.jpg"
    },
    {
      name: "Comedy",
      id: 35,
      // image: ComedyImageTv
      image:
        "https://raw.githubusercontent.com/rmarquardt1/media-geek/master/src/assets/images/comedy_tv.jpg"
    },
    {
      name: "Crime",
      id: 80,
      // image: CrimeImageTv
      image:
        "https://raw.githubusercontent.com/rmarquardt1/media-geek/master/src/assets/images/crime_tv.jpg"
    },
    {
      name: "Documentary",
      id: 99,
      // image: DocumentaryImageTv
      image:
        "https://raw.githubusercontent.com/rmarquardt1/media-geek/master/src/assets/images/documentary_tv.jpg"
    },
    {
      name: "Drama",
      id: 18,
      // image: DramaImageTv
      image:
        "https://raw.githubusercontent.com/rmarquardt1/media-geek/master/src/assets/images/drama_tv.jpg"
    },
    {
      name: "Family",
      id: 10751,
      // image: FamilyImageTv
      image:
        "https://raw.githubusercontent.com/rmarquardt1/media-geek/master/src/assets/images/family_tv.jpg"
    },
    {
      name: "Kids",
      id: 10762,
      // image: KidsImageTv
      image:
        "https://raw.githubusercontent.com/rmarquardt1/media-geek/master/src/assets/images/kids_tv.jpg"
    },
    {
      name: "Mystery",
      id: 9648,
      // image: MysteryImageTv
      image:
        "https://raw.githubusercontent.com/rmarquardt1/media-geek/master/src/assets/images/mystery_tv.jpg"
    },
    {
      name: "News",
      id: 10763,
      // image: NewsImageTv
      image:
        "https://raw.githubusercontent.com/rmarquardt1/media-geek/master/src/assets/images/news_tv.jpg"
    },
    {
      name: "Reality",
      id: 10764,
      // image: RealityImageTv
      image:
        "https://raw.githubusercontent.com/rmarquardt1/media-geek/master/src/assets/images/reality_tv.jpg"
    },
    {
      name: "Sci-Fi & Fantasy",
      id: 10765,
      // image: ScifiImageTv
      image:
        "https://raw.githubusercontent.com/rmarquardt1/media-geek/master/src/assets/images/scifi_tv.jpg"
    },
    {
      name: "Soap",
      id: 10766,
      // image: SoapImageTv
      image:
        "https://raw.githubusercontent.com/rmarquardt1/media-geek/master/src/assets/images/soap_tv.jpg"
    },
    {
      name: "Talk",
      id: 10767,
      // image: TalkImageTv
      image:
        "https://raw.githubusercontent.com/rmarquardt1/media-geek/master/src/assets/images/talk_tv.jpg"
    },
    {
      name: "War & Politics",
      id: 10768,
      // image: PoliticsImageTv
      image:
        "https://raw.githubusercontent.com/rmarquardt1/media-geek/master/src/assets/images/politics_tv.jpg"
    },
    {
      name: "Western",
      id: 37,
      // image: WesternImage
      image:
        "https://raw.githubusercontent.com/rmarquardt1/media-geek/master/src/assets/images/western.jpg"
    }
  ]
};

export default genreImages;
