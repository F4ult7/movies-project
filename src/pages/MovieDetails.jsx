import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_KEY, BASE_URL, JSON_SERVER_URL } from "../../API.JS";
import "./../css/Button.css";
import "./../css/MovieDetails.css";

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
        .get(`${JSON_SERVER_URL}/reviews?tmdbId=${id}`)
        .then(function (response) {
          setReviews(response.data);
        });
    },
    [id]
  );

  function handleNewReviewSubmit(event) {
    event.preventDefault();

    const reviewToSend = { ...newReview, tmdbId: id };

    axios.post(`${JSON_SERVER_URL}/reviews`, reviewToSend).then(function (res) {
      setReviews([...reviews, res.data]);
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
      .patch(`${JSON_SERVER_URL}/reviews/${editingReviewId}`, editingReviewData)
      .then(function (res) {
        const updated = res.data;
        const updatedReviews = reviews.map((r) =>
          r.id === updated.id ? updated : r
        );
        setReviews(updatedReviews);
        setEditingReviewId(0);
        setEditingReviewData({ author: "", comment: "" });
      });
  }

  function handleDelete(reviewId) {
    axios.delete(`${JSON_SERVER_URL}/reviews/${reviewId}`).then(function () {
      setReviews(reviews.filter((r) => r.id !== reviewId));
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
        {reviews.map((review) =>
          review.id === editingReviewId ? (
            <li key={review.id}>
              <form onSubmit={handleEditSave}>
                <input
                  type="text"
                  value={editingReviewData.author}
                  onChange={(e) =>
                    setEditingReviewData({
                      ...editingReviewData,
                      author: e.target.value,
                    })
                  }
                  required
                />
                <textarea
                  value={editingReviewData.comment}
                  onChange={(e) =>
                    setEditingReviewData({
                      ...editingReviewData,
                      comment: e.target.value,
                    })
                  }
                  required
                ></textarea>
                <button type="submit" className="button">
                  Save
                </button>
                <button
                  type="button"
                  className="button secondary"
                  onClick={() => {
                    setEditingReviewId(0);
                    setEditingReviewData({ author: "", comment: "" });
                  }}
                >
                  Cancel
                </button>
              </form>
            </li>
          ) : (
            <li key={review.id}>
              <strong>{review.author}:</strong> {review.comment}
              <button
                className="button secondary"
                onClick={() => handleEditClick(review)}
              >
                Edit
              </button>
              <button
                className="button danger"
                onClick={() => handleDelete(review.id)}
              >
                Delete
              </button>
            </li>
          )
        )}
      </ul>

      <form onSubmit={handleNewReviewSubmit} className="form-container review-form">
        <h4 className="form-heading">Leave a Review</h4>
        <div className="form-fields">
          <input
            type="text"
            placeholder="Your name"
            value={newReview.author}
            onChange={(e) =>
              setNewReview({ ...newReview, author: e.target.value })
            }
            required
          />
          <textarea
            placeholder="Your comment"
            value={newReview.comment}
            onChange={(e) =>
              setNewReview({ ...newReview, comment: e.target.value })
            }
            required
          ></textarea>
          <button type="submit" className="button">
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
}

export default MovieDetails;
