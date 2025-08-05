import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY, BASE_URL } from "../../API.JS";
import "./../css/MovieCard.css";
import "./../css/Homepage.css";

function Home() {
  // search
  const [searchQuery, setSearchQuery] = useState("");
  //store the list 
  const [movies, setMovies] = useState([]);
  //store favorite 
  const [favorites, setFavorites] = useState([]);


  useEffect(function () {
    // Fetch DB API
    axios
      .get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
      .then(function (response) {
        setMovies(response.data.results);
      });

    // Fetch favorites from json
    axios.get("http://localhost:5005/favorites").then(function (response) {
      setFavorites(response.data);
    });
  }, []);

  function handleSearch(event) {
    event.preventDefault();

    // Fetch movies that match search 
    axios
      .get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}`)
      .then(function (response) {
        setMovies(response.data.results);
      });
    // Clear
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