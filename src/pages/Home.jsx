import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="hero">
      <div className="hero-content">
        <span className="hero-label">YOUR NEXT MEAL STARTS HERE</span>
        <h1>
          Discover recipes.
          <br />
          <span>Cook something amazing.</span>
        </h1>
        <p>
          Explore delicious meals from around the world. Find recipes,
          discover new cuisines, and save your favourite dishes in one place.
        </p>
        <div className="hero-actions">
          <Link to="/recipes" className="primary-button">Explore Recipes →</Link>
          <Link to="/favourites" className="secondary-button">View Favourites</Link>
        </div>
      </div>
      <div className="hero-decoration" aria-hidden="true">
        <span>🥗</span><span>🍝</span><span>🍲</span><span>🥑</span>
      </div>
    </section>
  );
}

export default Home;