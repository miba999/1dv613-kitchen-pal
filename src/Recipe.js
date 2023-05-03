
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import IngredientList from "./IngredientList";
import InstructionList from "./InstructionList";

export default function Recipe() {
  const [recipes, setRecipes] = useState([]);
  const recipeCollectionRef = collection(db, "recipes");

  useEffect(() => {
    const getRecipes = async () => {
      const data = await getDocs(recipeCollectionRef);
      setRecipes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getRecipes();
  }, []);

  return (
    <>
      {recipes.map((recipe) => {
        return (
          <div>
            <h1>{recipe.title}</h1>
            <p>Tidsåtgång: {recipe.duration} min</p>
            <IngredientList path={`recipes/${recipe.id}/ingredients`} />
            <p>{recipe.comments}</p>
            <InstructionList data={recipe.instructions}></InstructionList>
          </div>
        );
      })}
    </>
  );
}
