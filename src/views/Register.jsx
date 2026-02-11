import { useContext, useState } from "react";
import {AuthContext} from "../context/AuthContext";
import useForm from "../hooks/useForm";

const initialValues = {
  email: "",
  password: "",
  rePassword: "",
};

export default function Register() {
  const { registerSubmitHandler } = useContext(AuthContext);
  const [error, setError] = useState(null);

  const submitHandler = (values) => {
    if (!values.email || !values.password || !values.rePassword) {
      setError("All fields required!");
      return;
    }

    if (values.password !== values.rePassword) {
      setError("Passwords do not match");
      return;
    }
    setError(null);
    registerSubmitHandler(values);
  };

  const { values, setValues, onChange, onSubmit, onReset } = useForm(
    submitHandler,
    initialValues,
  );

  return (
    <section id="register">
      <br />
      <br />
      <br />
      <div className="form">
        <h2>Register</h2>
        <form className="register-form" onSubmit={onSubmit}>
            {error && <p style={{color:'red',fontSize: '33px'}}>{error}</p>}
          <input
            type="text"
            name="email"
            id="register-email"
            placeholder="email"
            onChange={onChange}
            value={values['email']}
          />
          <input
            type="password"
            name="password"
            id="register-password"
            placeholder="password"
            onChange={onChange}
            value={values['password']}
          />
          <input
            type="password"
            name="rePassword"
            id="repeat-password"
            placeholder="repeat password"
            onChange={onChange}
            value={values['rePassword']}
          />
          <button type="submit">register</button>
          <p className="message">
            Already registered? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </section>
  );
}
