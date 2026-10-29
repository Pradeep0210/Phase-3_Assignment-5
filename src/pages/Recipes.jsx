import { useState } from "react";
import useRecipes from "../hooks/useRecipes";
import RecipeCard from "../components/RecipeCard";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

function Recipes() {
  const [inputValue, setInputValue] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const { data, loading, error } = useRecipes(submittedQuery);

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) return;
    setSubmittedQuery(trimmedValue);
  }

  return (
    <section className="page-section">
      <div className="page-heading">
        <span className="section-label">FIND YOUR NEXT FAVOURITE</span>
        <h1>Explore Recipes</h1>
        <p>Search by recipe name to discover your next meal.</p>
      </div>

      <form className="search-form" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="recipe-search">
          Search recipes by name
        </label>
        <input
          id="recipe-search"
          type="search"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="Try chicken, pasta, curry..."
          autoComplete="off"
          required
        />
        <button type="submit" className="primary-button">Search</button>
      </form>

      {loading && <Spinner />}
      {!loading && error && <ErrorMessage message={error} />}

      {!loading && !error && !submittedQuery && (
        <div className="empty-state">
          <span className="empty-icon" aria-hidden="true">🔎</span>
          <h2>Ready to find something delicious?</h2>
          <p>Search for a recipe to get started.</p>
        </div>
      )}

      {!loading && !error && submittedQuery && data.length === 0 && (
        <div className="empty-state">
          <span className="empty-icon" aria-hidden="true">🍽️</span>
          <h2>No recipes found</h2>
          <p>No recipes found for '{submittedQuery}'. Try another name.</p>
        </div>
      )}

      {!loading && !error && data.length > 0 && (
        <>
          <div className="results-heading">
            <h2>Search results</h2>
            <span>{data.length} recipes found</span>
          </div>
          <div className="recipe-grid">
            {data.map((recipe) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default Recipes;