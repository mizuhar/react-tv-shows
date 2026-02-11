import { useState } from "react";
import { Link } from "react-router-dom";
import { searchShow } from "../data/shows";

export default function Search() {

  const [shows, setShows] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState(null);

  async function onSearch(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const query = formData.get("search");

    if (!query || query.trim() === "") {
      setError("Enter search term");
      return;
    }

    try {
      const result = await searchShow(query.trim());

      setShows(result);
      setHasSearched(true);
      setError(null);

    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <section id="search">
        <div className="form">
          <h2>Search</h2>

          <form className="search-form" onSubmit={onSearch}>
            <input type="text" name="search" id="search-input" />
            <button className="button-list">Search</button>
          </form>

          {error && <p className="error">{error}</p>}
        </div>

        <h4>Results:</h4>

        <div className="search-result">

          {hasSearched && shows.length === 0 && (
            <p className="no-result">
              There is no TV show with this title
            </p>
          )}

          {shows.map(show => (
            <div className="show" key={show.id}>
              <img src={show.imageUrl} alt={show.title} />

              <div className="show-info">
                <h3 className="title">{show.title}</h3>
                <p className="genre">Genre: {show.genre}</p>
                <p className="country-of-origin">
                  Country: {show.country}
                </p>

                <Link
                  className="details-btn"
                  to={`/catalog/${show.id}`}
                >
                  Details
                </Link>
              </div>
            </div>
          ))}

        </div>
      </section>
    </>
  );
}
