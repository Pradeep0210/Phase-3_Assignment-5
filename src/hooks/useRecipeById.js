import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://www.themealdb.com/api/json/v1/1/lookup.php";

function useRecipeById(id) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    let ignore = false;

    async function fetchRecipe() {
      setLoading(true);
      setData(null);
      setError("");

      try {
        const response = await axios.get(API_URL, {
          params: { i: id },
          signal: controller.signal,
        });

        if (!ignore) setData(response.data.meals?.[0] || null);
      } catch (err) {
        if (!ignore && !axios.isCancel(err)) {
          setError(
            "Unable to load this recipe. Please check your internet connection and try again."
          );
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchRecipe();

    return () => {
      ignore = true;
      controller.abort();
    };
  }, [id]);

  return { data, loading, error };
}

export default useRecipeById;