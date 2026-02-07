import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useMemo } from 'react';
import { useState } from 'react';

import useForm from '../hooks/useForm';
import { required, emailValidator } from '../data/validators';




export default function Login(){

  const { loginSubmitHandler} = useContext(AuthContext)
  const [error, setError] = useState(null);

  const submitHandler = (values) => {

   const error =
      required(values.email) ||
      emailValidator(values.email) ||
      required(values.password);

   if(error){
      setError(error);
      return;
   }

   setError(null); // изчистваме стара грешка
   loginSubmitHandler(values);
};


  
const initialValues = useMemo(() => ({
  email: "",
  password: ""
}), []);

  const {  values,setValues,onChange,onSubmit,onReset} = useForm(submitHandler,initialValues)


    return(
       
       <section id="login">
         <br />
         <br />
         <br />
  <div className="form" >
    <h2>Login</h2>
    <form className="login-form" onSubmit={onSubmit}>

        {error && <p style={{color:'red',fontSize: '33px'}}>{error}</p>}

      <input 
      type="text" 
      name="email"
      id="email" 
      placeholder="email"
      onChange={onChange}
      value={values['email']}
       />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="password"
        onChange={onChange}
        value={values['password']}
      />
      <button type="submit">login</button>
      <p className="message">
        Not registered? <a href="/register">Create an account</a>
      </p>
    </form>
  </div>
</section>

    )

}