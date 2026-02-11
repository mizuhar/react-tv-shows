import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";


import Home from "./views/Home";
import Footer from "./views/Footer";
import Header from "./views/Header";
import Login from "./views/login";
import Register from "./views/Register";
import Catalog from "./views/Catalog";
import Create from "./views/Create";
import Details from "./views/Details";
import Edit from "./views/Edit";
import Search from "./views/Search";
import AuthGuard from "./guards/AuthGuard";
import GuestGuard from "./guards/GuestGuard";

function App() {
  return (
    <>
    <AuthProvider>
       <Header/>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/catalog"} element={<Catalog/>}/>

        <Route element={<GuestGuard/>}>

        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />

        </Route>
      

        <Route element={<AuthGuard/>}>

        <Route path={"/create"} element={<Create/>}/>
        <Route path={"/search"} element={<Search/>}/>
        <Route path={"/catalog/:showId"} element={<Details/>}/>
        <Route path={"/catalog/:showId/edit"} element={<Edit/>}/>

        </Route>
        
      </Routes>
      <Footer/>
      </AuthProvider>
    </>
  );
}

export default App;
