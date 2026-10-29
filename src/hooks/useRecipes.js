import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php";

function useRecipes(query) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const trimmedQuery = query.trim();
    let ignore = false;

    if (!trimmedQuery) {
      setData([]);
      setLoading(false);
      setError("");
      return undefined;
    }

    const controller = new AbortController();

    async function fetchRecipes() {
      setLoading(true);
      setError("");
      setData([]);

      try {
        const response = await axios.get(API_URL, {
          params: { s: trimmedQuery },
          signal: controller.signal,
        });

        if (!ignore) {
          setData(response.data.meals || []);
        }
      } catch (err) {
        if (!ignore && !axios.isCancel(err)) {
          setData([]);
          setError(
            "Unable to load recipes. Please check your internet connection and try again."
          );
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchRecipes();

    return () => {
      ignore = true;
      controller.abort();
    };
  }, [query]);

  return { data, loading, error };
}

export default useRecipes;