import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";


import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <AuthProvider>
    <App />
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      theme="dark"
    />
    </AuthProvider>
  </BrowserRouter>,
);

//console.log(import.meta.env.VITE_SUPABASE_URL);
