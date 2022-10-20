import { useState ,useEffect} from "react";
import MovieList from "./Components/MovieList";
import  'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import MovieListHeading from "./Components/MovieListHeading";
import SearchBox from "./Components/SearchBox";
import AddFavourites from "./Components/AddFavourites";
import RemoveFavourites from "./Components/RemoveFavourites";


const App=() =>{
  const [movies,setMovies]=useState([]);
  const [searchValue, setSearchValue]=useState("");
  const [favourites, setFavourites]=useState([]);

  const getMovieRequest=async(searchValue)=>{
      const url=`http://www.omdbapi.com/?s=${searchValue}&apikey=cf7ad55b`;
      const response=await fetch(url);
      const responseJson=await response.json();
      if(responseJson.Search){
        setMovies(responseJson.Search);
      }
      
  };

  useEffect(()=>{
    getMovieRequest(searchValue);
  },[searchValue]);

  useEffect(()=>{
    const movieFavourite=JSON.parse(localStorage.getItem('react-movie-app-favourites'));
    setFavourites(movieFavourite)
  },[]);

  const saveToLocalStorage = (items)=>{
      localStorage.setItem('react-movie-app-favourites', JSON.stringify(items))
  }

  const addFavouriteMovie=(movie)=>{
    var x=favourites.find((mov,index)=>{
      if(mov.imdbID === movie.imdbID)return true;
    })
    if(!x){
      const newFavouriteList=[...favourites, movie];
      setFavourites(newFavouriteList);
      saveToLocalStorage(newFavouriteList);
    }
    
  }

  const removeFavouritesMovie=(movie)=>{
      const newFavouriteList = favourites.filter(
        (favourite)=>favourite.imdbID !== movie.imdbID
      );
      setFavourites(newFavouriteList);
      saveToLocalStorage(newFavouriteList);
  }

  return (
    <div className='container-fluids movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading={'Movies'}/>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
      </div>
      <div className='row'>
        <MovieList movies={movies} handleFavouritesClick={addFavouriteMovie } favouriteComponent={AddFavourites}/>
      </div>

      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading={'Favourites'}/>
      </div>
      <div className='row'>
        <MovieList movies={favourites} handleFavouritesClick={removeFavouritesMovie } favouriteComponent={RemoveFavourites}/>
      </div>
    </div>
  )
};

export default App;
