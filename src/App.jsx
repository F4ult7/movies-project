import "./css/App.css";
import Favorites from "./pages/FavoriteMoviesPage";
import Home from "./pages/Homepage";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MovieDetails from "./pages/MovieDetails";
import AboutPage from "./pages/About";

function App() {
  return (
    <>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
