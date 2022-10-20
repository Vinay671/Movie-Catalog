

const MovieList=(props)=>{
    const FavouriteComponent=props.favouriteComponent;
    return (
        <>
           {props.movies.map((movie,index)=>(
                <div className='image-container d-flex justify-content-center m-3'>
                    <img clasName="imageee" src={movie.Poster} alt="movie"></img>
                    <div onClick={()=>props.handleFavouritesClick(movie)} className="overlay d-flex align-items-center justify-content-center">
                        <FavouriteComponent/>
                    </div>
                </div>
            ))}
        </>
    )
}

export default MovieList;