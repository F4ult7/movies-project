import { useEffect, useState } from "react";

function FavoriteMoviesPage() {
  
  const [favorites, setFavorites] = useState([]);


  useEffect(() => {
 
    fetch("http://localhost:5005/favorites")
      .then(res => res.json())         
      .then(data => setFavorites(data)); 
  }, []); 

  // removes a movie from the favlist
  const handleRemove = (id) => {
    fetch(`http://localhost:5005/favorites/${id}`, {
      method: "DELETE"
    })
    .then(() => {
    
      const updatedFavorites = favorites.filter(movie => movie.id !== id);
      setFavorites(updatedFavorites);
    })
    .catch(err => console.error("Failed to remove favorite:", err));
  };

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
              
             
              <button onClick={() => handleRemove(movie.id)}>
                Remove 
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FavoriteMoviesPage;