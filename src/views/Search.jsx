import { Link } from "react-router-dom";
import { searchShow } from "../data/shows";
import { useState } from "react";

export default function Search() {
  const [shows, setShows] = useState([]);
  const [hasSearch, setHasSearch] = useState(false);


  async function onSearch(e) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const query = formData.get("search");
    const result = await searchShow(query);
    setShows(result);
    setHasSearch(true)
  }


 

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <section id="search">
        <div className="form">
          <h2>Search</h2>
          <form className="search-form" onSubmit={onSearch}>
            <input type="text" name="search" id="search-input" />
            <button className="button-list" >Search</button>
          </form>
        </div>
        <h4>Results:</h4>
        <div className="search-result">

          {(shows.length === 0 && hasSearch) && (
                    <p className="no-result">
                        There is no TV show with this title
                    </p>
                )}
{shows.map(show => (
          <div className="show">
            <img src={show.imageUrl} alt="example1" />
            <div className="show">
              <h3 className="title">{show.title}</h3>
              <p className="genre">Genre: {show.genre}</p>
              <p className="country-of-origin">
                Country of Origin: {show.country}
              </p>
              <Link className="details-btn" to={`/catalog/${show._id}`}>
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
