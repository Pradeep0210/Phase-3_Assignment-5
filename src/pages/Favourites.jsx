import { Link } from "react-router-dom";
import { useFavourites } from "../context/FavouritesContext";
import RecipeCard from "../components/RecipeCard";

function Favourites() {
  const { favourites } = useFavourites();

  return (
    <section className="page-section">
      <div className="page-heading">
        <span className="section-label">YOUR PERSONAL COLLECTION</span>
        <h1>My Favourites ♥</h1>
        <p>All your saved recipes, together in one place.</p>
      </div>

      {favourites.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon" aria-hidden="true">♡</span>
          <h2>No favourites yet</h2>
          <p>Explore recipes and save the ones you love.</p>
          <Link to="/recipes" className="primary-button">Find Recipes</Link>
        </div>
      ) : (
        <>
          <div className="results-heading">
            <h2>Your saved recipes</h2>
            <span>{favourites.length} saved</span>
          </div>
          <div className="recipe-grid">
            {favourites.map((recipe) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default Favourites;