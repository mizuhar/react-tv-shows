import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getShows } from "../data/shows";

export default function Catalog() {
  const [shows, setShows] = useState([]);
  const[loading, setLoading] = useState(true)
  const [error, setError] = useState(null);


  useEffect(() => {
    getShows()
      .then(setShows)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if(loading){
    return <p style={{color:'wheat',fontSize:'70px',width:'100%'}}>Loading...</p>;
  }

  return (
    <>
      <h2>Users Recommendations</h2>
        {error && <p style={{color:'red',fontSize: '33px'}}>{error}</p>}

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
