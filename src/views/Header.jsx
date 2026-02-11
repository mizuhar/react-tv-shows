import { useContext } from "react"
import  {AuthContext}  from "../context/AuthContext"

 
 export default function Header(){




const { isAuthenticated, logoutHandler, email } = useContext(AuthContext)


    return (
         <header>
 
  <a id="logo" href="/">
    <img id="logo-img" src="./images/show_logo.png" alt="logo" />
  </a>
  <nav>
    <div>
      
      <span style={{color:'black',fontSize:'33px'}}>
       {email}
      </span>
      
      <a href="/catalog">TV Shows</a>
      <a href="/search">Search</a>
    </div>
    {isAuthenticated && 

     <div className="user">
      <a href="/create">Add Show</a>
      <a  onClick={logoutHandler}>Logout</a>
    </div>
    }
   
   
   {!isAuthenticated && 
    <div className="guest">
      <a href="/login">Login</a>
      <a href="/register">Register</a>
    </div>
   }
   
  
  </nav>
</header>
    )

 }
 

