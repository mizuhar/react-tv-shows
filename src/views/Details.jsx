import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getShow } from "../data/shows";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function Details() {
  const navigate = useNavigate();
  const { userId } = useContext(AuthContext)

  const { showId } = useParams();

  const [show, setShow] = useState({});

  if(userId === show._ownerId){
       show.canEdit = true
  }

  useEffect(() => {
    getShow(showId)
    .then(setShow)
    .catch(console.error);
  }, [showId]);

  if (!show) {
    return <p>Loading...</p>;
  }
async function onDelete(){

    console.log('Deleted!');
    
    //const choice = confirm(`Are you sure want to remove ${show.title}?`)

}

  return (
    <>
      <section id="details">
        <div id="details-wrapper">
          <img id="details-img" src={show.imageUrl} alt="example1" />
          <div id="details-text">
            <p id="details-title">{show.title}</p>
            <div id="info-wrapper">
              <div id="description">
                <p id="details-description">{show.details}</p>
              </div>
            </div>
            {show.canEdit && 
             <div id="action-buttons">
              <Link to={`/catalog/${show._id}/edit`} id="edit-btn">Edit</Link>
              <Link onClick={onDelete} id="delete-btn">Delete</Link>
            </div>
            }
           
          </div>
        </div>
      </section>
    </>
  );
}
