import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function MovieCard({ movie, favorites, setFavorites }) {
  const imageURL = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState();

  useEffect(() => {
    const match = favorites.find((fav) => fav.tmdbId === movie.id);
    if (match) {
      setIsFavorite(true);
      setFavoriteId(match.id);
    } else {
      setIsFavorite(false);
      setFavoriteId();
    }
  }, [favorites, movie.id]);

  function handleFavoriteToggle() {
    if (isFavorite) {
      axios
        .delete(`http://localhost:5005/favorites/${favoriteId}`)
        .then(() => {
          setIsFavorite(false);
          setFavoriteId();
          setFavorites(favorites.filter((fav) => fav.id !== favoriteId));
        });
    } else {
      const newFavorite = {
        tmdbId: movie.id,
        title: movie.title,
        release_date: movie.release_date,
        poster_path: movie.poster_path,
      };

      axios
        .post("http://localhost:5005/favorites", newFavorite)
        .then((res) => {
          setIsFavorite(true);
          setFavoriteId(res.data.id);
          setFavorites([...favorites, res.data]);
        });
    }
  }

  return (
    <div className="movie-card">
      <div className="movie-pic">
        <img src={imageURL} alt={movie.title} />
        <div className="movie-overlay">
          <button className="like-btn" onClick={handleFavoriteToggle}>
            {isFavorite ? "❤️" : "🤍"}
          </button>
        </div>
      </div>
      <div className="movie-info">
        <Link to={`/movies/${movie.id}`}>
          <h3>{movie.title}</h3>
        </Link>
        <p>{movie.release_date?.slice(0, 4)}</p>
      </div>
    </div>
  );
}

export default MovieCard;
