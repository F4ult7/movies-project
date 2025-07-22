import MovieCard from "../components/MovieCard";
import { useState } from "react";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");


  const movies = [
    { id: 1, title: "Superman", release: 2022 },
    { id: 2, title: "Batman", release: 2025 },
    { id: 3, title: "Venom", release: 2021 },
  ];

  //search var 
  const handleSearch = (e) => {
   e.preventDefault()
   console.log(searchQuery)
   setSearchQuery("")
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="search for movies..."
          className="Search-input"
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} //update the state to be able to write in the form
        />
      </form>
      <div className="movies-collection">
        {movies.map((movie) => (

            //filter for the movies you want to see
        //   movie.title.toLowerCase().startsWith(searchQuery) && (
            //conditional rendering fixed*
          <MovieCard movie={movie} key={movie.id} />
        //   )
        ))}
      </div>
    </div>
  );
}

export default Home;
