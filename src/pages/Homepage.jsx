import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY, JSON_SERVER_URL } from "../../API.JS";
import "./../css/MovieCard.css";
import "./../css/Homepage.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(function () {
    // Fetch DB API 
    axios
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
      .then(function (response) {
        setMovies(response.data.results);
      });

    // Fetch favorites from json-server
    axios.get(`${JSON_SERVER_URL}/favorites`).then(function (response) {
      setFavorites(response.data);
    });
  }, []);

  function handleSearch(event) {
    event.preventDefault();

    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`
      )
      .then(function (response) {
        setMovies(response.data.results);
      });

    setSearchQuery("");
  }

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="form-container">
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>

      <div className="movies-collection">
        {movies
          .filter((movie) =>
            movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
          )
          .map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          ))}
      </div>
    </div>
  );
}

export default Home;
