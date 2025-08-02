import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_KEY, BASE_URL } from "../../API.JS";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ author: "", comment: "" });

  const [editingReviewId, setEditingReviewId] = useState(0);
  const [editingReviewData, setEditingReviewData] = useState({
    author: "",
    comment: "",
  });

  useEffect(
    function () {
      axios
        .get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
        .then(function (response) {
          setMovie(response.data);
        });

      axios
        .get(`http://localhost:5005/reviews?tmdbId=${id}`)
        .then(function (response) {
          setReviews(response.data);
        });
    },
    [id]
  );

  function handleNewReviewSubmit(event) {
    event.preventDefault();

    const reviewToSend = {
      ...newReview,
      tmdbId: id,
    };

    axios
      .post("http://localhost:5005/reviews", reviewToSend)
      .then(function (response) {
        setReviews([...reviews, response.data]);
        setNewReview({ author: "", comment: "" });
      });
  }

  function handleEditClick(review) {
    setEditingReviewId(review.id);
    setEditingReviewData({ author: review.author, comment: review.comment });
  }

  function handleEditSave(event) {
    event.preventDefault();

    axios
      .patch(
        `http://localhost:5005/reviews/${editingReviewId}`,
        editingReviewData
      )
      .then(function (response) {
        const updated = response.data;
        const updatedReviews = reviews.map(function (r) {
          return r.id === updated.id ? updated : r;
        });

        setReviews(updatedReviews);
        setEditingReviewId(0);
        setEditingReviewData({ author: "", comment: "" });
      });
  }

  function handleDelete(reviewId) {
    axios.delete(`http://localhost:5005/reviews/${reviewId}`).then(function () {
      const remaining = reviews.filter((r) => r.id !== reviewId);
      setReviews(remaining);
    });
  }

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="movie-details">
      <h2>
        {movie.title} ({movie.release_date?.slice(0, 4)})
      </h2>
      <p>{movie.overview}</p>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />

      <h3>User Reviews</h3>
      <ul>
        {reviews.map(function (review) {
          if (review.id === editingReviewId) {
            return (
              <li key={review.id}>
                <form onSubmit={handleEditSave}>
                  <input
                    type="text"
                    value={editingReviewData.author}
                    onChange={function (e) {
                      setEditingReviewData({
                        ...editingReviewData,
                        author: e.target.value,
                      });
                    }}
                    required
                  />
                  <textarea
                    value={editingReviewData.comment}
                    onChange={function (e) {
                      setEditingReviewData({
                        ...editingReviewData,
                        comment: e.target.value,
                      });
                    }}
                    required
                  ></textarea>
                  <button type="submit">Save</button>
                  <button
                    type="button"
                    onClick={function () {
                      setEditingReviewId(0);
                      setEditingReviewData({ author: "", comment: "" });
                    }}
                  >
                    Cancel
                  </button>
                </form>
              </li>
            );
          } else {
            return (
              <li key={review.id}>
                <strong>{review.author}:</strong> {review.comment}
                <button
                  onClick={function () {
                    handleEditClick(review);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={function () {
                    handleDelete(review.id);
                  }}
                >
                  Delete
                </button>
              </li>
            );
          }
        })}
      </ul>

      <form onSubmit={handleNewReviewSubmit}>
        <h4>Leave a Review ..</h4>
        <input
          type="text"
          placeholder="Your name"
          value={newReview.author}
          onChange={function (e) {
            setNewReview({ ...newReview, author: e.target.value });
          }}
          required
        />
        <textarea
          placeholder="Your comment"
          value={newReview.comment}
          onChange={function (e) {
            setNewReview({ ...newReview, comment: e.target.value });
          }}
          required
        ></textarea>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}

export default MovieDetails;
