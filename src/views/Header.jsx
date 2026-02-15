import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const { isAuthenticated, logoutHandler, email } = useContext(AuthContext);

  return (
    <header>
      <Link id="logo" to="/">
        <img id="logo-img" src="/images/show_logo.png" alt="logo" />
      </Link>
        {email && (
    <div className="welcome-bar">
      <span>Welcome,{email}!</span>
    </div>
  )}
<nav>
  <div className="nav-left">
    <Link to="/catalog">TV Shows</Link>
    <Link to="/search">Search</Link>
  </div>

  <div className="nav-right">
    {isAuthenticated ? (
      <>
        <Link to="/create">Add Show</Link>
        <Link onClick={logoutHandler}>Logout</Link>
      </>
    ) : (
      <>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </>
    )}
  </div>
</nav>
    </header>
  );
}
