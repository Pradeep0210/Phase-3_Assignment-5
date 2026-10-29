import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const FavouritesContext = createContext(null);

function getSavedFavourites() {
  try {
    const saved = localStorage.getItem("recipe-favourites");
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useState(getSavedFavourites);

  useEffect(() => {
    try {
      localStorage.setItem("recipe-favourites", JSON.stringify(favourites));
    } catch {
      // The app still works if browser storage is unavailable.
    }
  }, [favourites]);

  function addFavourite(recipe) {
    setFavourites((current) => {
      if (current.some((item) => item.idMeal === recipe.idMeal)) {
        return current;
      }
      return [...current, recipe];
    });
  }

  function removeFavourite(idMeal) {
    setFavourites((current) =>
      current.filter((recipe) => recipe.idMeal !== idMeal)
    );
  }

  function isFavourite(idMeal) {
    return favourites.some((recipe) => recipe.idMeal === idMeal);
  }

  return (
    <FavouritesContext.Provider
      value={{ favourites, addFavourite, removeFavourite, isFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites() {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error("useFavourites must be used inside FavouritesProvider.");
  }
  return context;
}