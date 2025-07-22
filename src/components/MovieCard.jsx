
function MovieCard({movie}) {

  return (
    <div className="movie-card">
        <div className ="movie-pic"></div> 
        <img src={movie.url} alt ={movie.title}/>
        <div className="movie-test"> </div>
        <button className="like-btn" onClick={onFavoriteClick} >

        </button>
        </div>
        <div className="movie-info">
            </div>

  )
}

export default MovieCard