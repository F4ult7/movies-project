import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY, BASE_URL } from "../../API.JS";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ author: "", comment: "" });

  useEffect(() => {
    fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => setMovie(data));

    fetch(`http://localhost:5005/reviews?tmdbId=${id}`)
      .then(res => res.json())
      .then(data => setReviews(data));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5005/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newReview, tmdbId: parseInt(id) })
    })
    .then(res => res.json())
    .then((review) => {
      setReviews(prev => [...prev, review]);
      setNewReview({ author: "", comment: "" });
    });
  };

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="movie-details">
      <h2>{movie.title} ({movie.release_date?.slice(0, 4)})</h2>
      <p>{movie.overview}</p>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />

      <h3>User Reviews</h3>
      <ul>
        {reviews.map(r => (
          <li key={r.id}><strong>{r.author}:</strong> {r.comment}</li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <h4>Leave a Review ..</h4>
        <input
          type="text"
          placeholder="Your name"
          value={newReview.author}
          onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
          required
        />
        <textarea
          placeholder="Your comment"
          value={newReview.comment}
          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
          required
        ></textarea>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}
