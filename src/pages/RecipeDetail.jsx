import { Link, useParams } from "react-router-dom";
import useRecipeById from "../hooks/useRecipeById";
import { useFavourites } from "../context/FavouritesContext";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

function RecipeDetail() {
  const { id } = useParams();
  const { data: recipe, loading, error } = useRecipeById(id);
  const { addFavourite, removeFavourite, isFavourite } = useFavourites();

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  if (!recipe) {
    return (
      <section className="empty-state">
        <h1>Recipe not found</h1>
        <p>This recipe may not exist or may have been removed.</p>
        <Link to="/recipes" className="primary-button">Back to Recipes</Link>
      </section>
    );
  }

  const saved = isFavourite(recipe.idMeal);
  const ingredients = Array.from({ length: 20 }, (_, index) => {
    const number = index + 1;
    return {
      name: recipe[`strIngredient${number}`]?.trim() || "",
      measure: recipe[`strMeasure${number}`]?.trim() || "",
    };
  }).filter((item) => item.name);

  function handleFavourite() {
    if (saved) removeFavourite(recipe.idMeal);
    else addFavourite(recipe);
  }

  return (
    <article className="detail-page">
      <Link to="/recipes" className="back-link">← Back to Recipes</Link>

      <div className="detail-hero">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="detail-image"
        />
        <div className="detail-intro">
          <span className="section-label">RECIPE DETAILS</span>
          <h1>{recipe.strMeal}</h1>
          <div className="detail-tags">
            <span>{recipe.strCategory || "Uncategorized"}</span>
            <span>{recipe.strArea || "Unknown cuisine"}</span>
          </div>
          <p>
            Discover the ingredients and follow the instructions to prepare
            this dish at home.
          </p>
          <button
            type="button"
            onClick={handleFavourite}
            className={saved ? "primary-button saved-detail" : "primary-button"}
            aria-pressed={saved}
          >
            {saved ? "♥ Remove from Favourites" : "♡ Save to Favourites"}
          </button>
          {recipe.strYoutube && (
            <a
              href={recipe.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
              className="youtube-link"
            >
              ▶ Watch on YouTube
            </a>
          )}
        </div>
      </div>

      <div className="detail-content">
        <section className="ingredients-panel">
          <h2>Ingredients</h2>
          <p className="section-description">
            Everything you need to prepare this dish.
          </p>
          {ingredients.length > 0 ? (
            <ul className="ingredient-list">
              {ingredients.map((item, index) => (
                <li key={`${item.name}-${index}`}>
                  <span>{item.name}</span>
                  <span className="ingredient-measure">
                    {item.measure || "As needed"}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>Ingredient information is not available.</p>
          )}
        </section>

        <section className="instructions-panel">
          <h2>Instructions</h2>
          <p className="section-description">
            Follow these steps to prepare your meal.
          </p>
          <div className="instructions-text">
            {recipe.strInstructions
              ? recipe.strInstructions
                  .split(/\r?\n/)
                  .map((line) => line.trim())
                  .filter(Boolean)
                  .map((line, index) => <p key={index}>{line}</p>)
              : <p>Instructions are not available.</p>}
          </div>
        </section>
      </div>

      {recipe.strSource && (
        <p className="recipe-source">
          Original source:{" "}
          <a href={recipe.strSource} target="_blank" rel="noopener noreferrer">
            View recipe source
          </a>
        </p>
      )}
    </article>
  );
}

export default RecipeDetail;