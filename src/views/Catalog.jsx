import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getShows } from "../data/shows";

import Spinner from "./Spinner";
import { toast } from "react-toastify";



export default function Catalog() {
  const [shows, setShows] = useState([]);
  const[loading, setLoading] = useState(true)
  const [error, setError] = useState(null);


  useEffect(() => {
    getShows()
      .then(setShows)
      .catch((err) =>{ 
        setError(err.message);
        toast.error(err.message);})
      .finally(() => setLoading(false));
  }, []);

 if (loading) {
  return <Spinner />;
}


  return (
    <>
      <h2>Users Recommendations</h2>
        {error && <p className="error">{error}</p>}


      <section id="shows">

        {shows.length > 0 ? (
          shows.map((show) => (
            <div key={show.id} className="show">
              <img src={show.imageUrl} alt="example1" />
              <div className="show-info">
                <h3 className="title">{show.title}</h3>
                <p className="genre">Genre: {show.genre}</p>
                <p className="country-of-origin">
                  Country of Origin: {show.country}
                </p>

                 <Link
                           className="details-btn"
                           to={`/catalog/${show.id}`}
                        >
                           Details
                        </Link>
              </div>
            </div>
          ))
        ) : (
          <h2 id="no-show">No shows Added.</h2>
        )}
      </section>
    </>
  );
}
