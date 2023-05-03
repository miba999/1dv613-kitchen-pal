import { useState, useEffect } from "react";
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";
import Ingredient from "./components/Ingredient/Ingredient";

const IngredientList = ({ path }) => {
  const ingredientCollectionRef = collection(db, path);

  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const getIngredients = async () => {
      const data = await getDocs(ingredientCollectionRef);
      setIngredients(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getIngredients();
  }, []);

  return <ul>
    {ingredients.map((ingredient) => {
      return (
        <Ingredient
          amount={ingredient.amount}
          unit={ingredient.unit}
          name={ingredient.name}
        />
      );
    })}
  </ul>;

}

export default IngredientList