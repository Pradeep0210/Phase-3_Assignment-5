import { NavLink } from "react-router-dom";
import { useFavourites } from "../context/FavouritesContext";

function Navbar() {
  const { favourites } = useFavourites();

  function getLinkClass({ isActive }) {
    return isActive ? "nav-link active" : "nav-link";
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" end className="brand">
          <span aria-hidden="true">🍳</span> Recipe Finder
        </NavLink>
        <nav className="nav-links" aria-label="Main navigation">
          <NavLink to="/" end className={getLinkClass}>Home</NavLink>
          <NavLink to="/recipes" className={getLinkClass}>Recipes</NavLink>
          <NavLink to="/favourites" className={getLinkClass}>
            Favourites
            <span className="favourites-count">{favourites.length}</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;