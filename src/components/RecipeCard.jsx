import { Link } from "react-router-dom";
import { useFavourites } from "../context/FavouritesContext";

function RecipeCard({ recipe }) {
  const { addFavourite, removeFavourite, isFavourite } = useFavourites();
  const saved = isFavourite(recipe.idMeal);

  function handleFavourite() {
    if (saved) removeFavourite(recipe.idMeal);
    else addFavourite(recipe);
  }

  return (
    <article className="recipe-card">
      <Link
        to={`/recipes/${recipe.idMeal}`}
        className="recipe-card-link"
        aria-label={`View ${recipe.strMeal} recipe`}
      >
        <img
          className="recipe-image"
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          loading="lazy"
        />
        <div className="recipe-card-content">
          <h3>{recipe.strMeal}</h3>
          <div className="recipe-meta">
            <span>{recipe.strCategory || "Uncategorized"}</span>
            <span>{recipe.strArea || "Unknown cuisine"}</span>
          </div>
        </div>
      </Link>
      <div className="recipe-card-actions">
        <button
          type="button"
          onClick={handleFavourite}
          className={saved ? "favourite-button saved" : "favourite-button"}
          aria-pressed={saved}
        >
          {saved ? "♥ Remove from Favourites" : "♡ Save to Favourites"}
        </button>
      </div>
    </article>
  );
}

export default RecipeCard;