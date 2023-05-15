import { useState, useEffect } from "react";
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";
import Ingredient from "./components/Ingredient/Ingredient";

const IngredientList = ({ path }) => {
  const ingredientCollectionRef = collection(db, path);

  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)

  useEffect(() => {
    const getIngredients = async () => {
      try {
        const data = await getDocs(ingredientCollectionRef);
        setIngredients(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    getIngredients();
  }, []);

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return <ul>
    {ingredients.map((ingredient) => {
      return (
        <Ingredient
          key={ingredient.id}
          amount={ingredient.amount}
          unit={ingredient.unit}
          name={ingredient.name}
        />
      );
    })}
  </ul>;

}

export default IngredientList