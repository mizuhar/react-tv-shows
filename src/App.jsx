import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";


import Home from "./views/home";
import Footer from "./views/Footer";
import Header from "./views/Header";
import Login from "./views/login";
import Register from "./views/Register";
import Catalog from "./views/Catalog";

function App() {
  return (
    <>
    <AuthProvider>
       <Header/>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/catalog"} element={<Catalog/>}/>
      </Routes>
      <Footer/>
      </AuthProvider>
    </>
  );
}

export default App;
