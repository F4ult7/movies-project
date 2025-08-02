import { useEffect, useState } from "react";
import axios from "axios";

function FavoriteMoviesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(function () {
    axios
      .get("http://localhost:5005/favorites")
      .then(function (response) {
        setFavorites(response.data);
      });
  }, []);

  function handleRemove(id) {
    axios
      .delete(`http://localhost:5005/favorites/${id}`)
      .then(function () {
        const updated = favorites.filter((movie) => movie.id !== id);
        setFavorites(updated);
      });
  }

  return (
    <div className="favorite1">
      <h2>Favorite Movies</h2>
      {favorites.length === 0 ? (
        <p>You don't have any favorite movie yet.</p>
      ) : (
        <ul className="favorites-list">
          {favorites.map((movie) => (
            <li key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                style={{ width: "100px" }}
              />
              <p>{movie.title} ({movie.release_date?.slice(0, 4)})</p>
              <button onClick={() => handleRemove(movie.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FavoriteMoviesPage;
