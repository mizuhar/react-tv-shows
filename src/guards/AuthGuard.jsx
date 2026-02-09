import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom"
import AuthContext from "../context/AuthContext";

export default function AuthGuard(){

    const {isAuthenticated} = useContext(AuthContext)

    if(!isAuthenticated){



return <Navigate to={'/login'}/>

    }

    return (
        <>
        <Outlet></Outlet>
        </>
    )
}