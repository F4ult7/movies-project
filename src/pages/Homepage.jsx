import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { API_KEY, BASE_URL } from "../../API.JS";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => setMovies(data.results));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}`)
      .then(res => res.json())
      .then(data => setMovies(data.results));
    setSearchQuery("");
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="Search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>

      <div className="movies-collection">
        {movies.map((movie) => ( 
            movie.title.toLowerCase().startsWith(searchQuery) && //works for search for now
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}

export default Home;
