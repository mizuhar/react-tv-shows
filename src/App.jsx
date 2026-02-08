import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";


import Home from "./views/home";
import Footer from "./views/Footer";
import Header from "./views/Header";
import Login from "./views/login";
import Register from "./views/Register";
import Catalog from "./views/Catalog";
import Create from "./views/Create";
import Details from "./views/Details";

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
        <Route path={"/create"} element={<Create/>}/>
        <Route path={"/catalog/:showId"} element={<Details/>}/>
      </Routes>
      <Footer/>
      </AuthProvider>
    </>
  );
}

export default App;
