function MovieCard({ movie }) {
  function onFavoriteClick() {
   console.log("clicked");
  }

  return (
  <div className="movie-card">
    <div className="movie-pic">
      <img src={movie.url} alt={movie.title} />
      <div className="movie-overlay">
        <button className="like-btn" onClick={onFavoriteClick}>
          ❤️
        </button>
      </div>
    </div>
    <div className="movie-info">
      <h3>{movie.title}</h3>
      <p>{movie.release}</p>
    </div>
  </div>
  )
}

export default MovieCard;
