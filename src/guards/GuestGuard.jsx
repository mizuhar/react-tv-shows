import { useContext } from "react";
import { Outlet,Navigate } from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

export default function GuestGuard(){
  

    const { isAuthenticated, loading } = useContext(AuthContext)

    if(loading) return null;
    

    if(isAuthenticated){

      return  <Navigate to={'/'}/>
    }



    return <Outlet/>
}