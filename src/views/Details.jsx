import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getShow, removeShow } from "../data/shows";
import { AuthContext } from "../context/AuthContext";

export default function Details() {

  const navigate = useNavigate();
  const { userId } = useContext(AuthContext);
  const { showId } = useParams();

  const [show, setShow] = useState(null);

  useEffect(() => {
    getShow(showId)
      .then(setShow)
      .catch(console.error);
  }, [showId]);

  if (!show) {
    return <p>Loading...</p>;
  }

  const isOwner = userId === show.user_id;

  async function onDelete(){

    const choice = confirm(`Are you sure you want to remove ${show.title}?`);

    if(choice){
      await removeShow(showId);
      navigate("/catalog");
    }
  }

  return (
    <section id="details">
      <div id="details-wrapper">

        <img
          id="details-img"
          src={show.imageUrl}
          alt={show.title}
        />

        <div id="details-text">
          <p id="details-title">{show.title}</p>

          <div id="info-wrapper">
            <div id="description">
              <p id="details-description">{show.details}</p>
            </div>
          </div>

          {isOwner && (
            <div id="action-buttons">
              <Link to={`/catalog/${show.id}/edit`} id="edit-btn">
                Edit
              </Link>

              <button onClick={onDelete} id="delete-btn">
                Delete
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}

