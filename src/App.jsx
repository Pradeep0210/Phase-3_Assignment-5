import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import RecipeDetail from "./pages/RecipeDetail";
import Favourites from "./pages/Favourites";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <main className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route
            path="*"
            element={
              <section className="empty-state">
                <h1>Page not found</h1>
                <p>The page you're looking for doesn't exist.</p>
                <a href="/" className="primary-button">Back Home</a>
              </section>
            }
          />
        </Routes>
      </main>
      <footer className="footer">Made with React and TheMealDB</footer>
    </>
  );
}

export default App;