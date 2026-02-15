import { useNavigate, useParams } from "react-router-dom";
import { editShow,getShow } from "../data/shows";
import { useState } from "react";
import useForm from "../hooks/useForm";
import { useEffect } from "react";
import { toast } from "react-toastify";

const initialValues = {
  title: "",
  imageUrl: "",
  genre: "",
  country: "",
  details: ""
};


export default  function Edit(){

    const navigate = useNavigate()
    const {showId} = useParams()
    const[error,setError] = useState(null)
  

    useEffect(()=>{
        getShow(showId)
        .then(result => setValues(result))
        .catch(error => setError(error.message))
    },[showId]) 
    
      
       const submitHandler = async (values) => {
  if (Object.values(values).some(v => !v || String(v).trim() === "")) {
    setError("All fields are required!");
    return;
  }

  const showData = {
    title: values.title,
    image_url: values.imageUrl,     // 👈 rename
    genre: values.genre,
    country: values.country,
    description: values.details     // 👈 rename
  };

  try {
    await editShow(showId, showData);
    toast.success("Show update successfully 🚀");
    navigate("/catalog");
  } catch (err) {
    setError(err.message);
  }
};

      
        const { values, setValues, onChange, onSubmit, onReset } = useForm(
          submitHandler,
          initialValues,
        );  




    return (
        <>

    <br />
      <br />
      <br />
      <br />
       <section id="edit">
  <div className="form" >
    <h2>Edit Show</h2>
    <form className="edit-form" onSubmit={onSubmit}>
        {error && <p style={{ color: "red", fontSize: "33px" }}>{error}</p>}
      <input
        type="text"
        name="title"
        id="title"
        placeholder="TV Show title"
        onChange={onChange}
        value={values.title}
      />
      <input
        type="text"
        name="imageUrl"
        id="image-url"
        placeholder="Image URL"
        onChange={onChange}
        value={values.imageUrl}
      />
      <input
        type="text"
        name="genre"
        id="genre"
        placeholder="Genre"
        onChange={onChange}
        value={values.genre}
      />
      <input
        type="text"
        name="country"
        id="country"
        placeholder="Country"
        onChange={onChange}
        value={values.country}
      />
      <textarea
        id="details"
        name="details"
        placeholder="Details"
        rows={2}
        cols={10}
        onChange={onChange}
        value={values.details}
      />
      <button type="submit">Edit Show</button>
    </form>
  </div>
</section>

        </>
    )
}