import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom"
import {AuthContext} from "../context/AuthContext";

export default function AuthGuard(){

    const {isAuthenticated, loading} = useContext(AuthContext)

    if (loading) {
        return <p>Loading...</p>;   // или spinner
    }

    if(!isAuthenticated){



return <Navigate to={'/login'}/>

    }

    return (
        <>
        <Outlet></Outlet>
        </>
    )
}