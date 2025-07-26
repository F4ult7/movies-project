import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const imageURL = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState(); 


  useEffect(() => {
    fetch("http://localhost:5005/favorites")
      .then(res => res.json())
      .then(data => {
        const match = data.find((fav) => fav.tmdbId === movie.id);
        if (match) {
          setIsFavorite(true);
          setFavoriteId(match.id); 
        }
      });
  }, [movie.id]);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
    
      fetch(`http://localhost:5005/favorites/${favoriteId}`, {
        method: "DELETE",
      })
        .then(() => {
          setIsFavorite(false);
          setFavoriteId();
        })
        .catch(err => console.error("Failed to remove favorite:", err));
    } else {
      
      const favoriteMovie = {
        tmdbId: movie.id,
        title: movie.title,
        release_date: movie.release_date,
        poster_path: movie.poster_path
      };

      fetch("http://localhost:5005/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(favoriteMovie)
      })
        .then(res => res.json())
        .then((data) => {
          setIsFavorite(true);
          setFavoriteId(data.id); 
        })
        .catch(err => {
          console.error("Error saving favorite:", err);
        });
    }
  };

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
