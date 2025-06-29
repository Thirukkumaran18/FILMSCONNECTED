import { Link } from "react-router-dom";
import { FaHome, FaHeart, FaSignOutAlt } from "react-icons/fa"; // ✅ Make sure react-icons is installed
import "../Style/Navbar.css";

function Navbar() {

  const handleLogOut = () => {
    localStorage.removeItem("userCredentials");
    window.location.href = "/";
  }
  return (
    <div className="navbar">
      <div className="logo">
        <Link className="links" to="/">Films Connected</Link>
      </div>
      
      <div className="navLinks">
        <Link className="links fullText" to="/">Home</Link>
        <Link className="links fullText" to="/favourite">Favourites</Link>
        <Link onClick={handleLogOut} className="links fullText" >Signout</Link>

        {/* Mobile Icons */}
        <Link className="links iconOnly" to="/"><FaHome /></Link>
        <Link className="links iconOnly" to="/favourite"><FaHeart /></Link>
        <Link onClick={handleLogOut} className="links iconOnly" ><FaSignOutAlt /></Link>

      </div>
    </div>
  );
}

export default Navbar;
