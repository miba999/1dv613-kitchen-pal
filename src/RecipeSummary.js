// import { db } from './firebase-config';
// import { collection, getDocs } from 'firebase/firestore';
// import { useState, useEffect } from 'react';
// import IngredientList from './IngredientList';
// import InstructionList from './InstructionList';
// import RecipeCard from './RecipeCard';

// export default function RecipeSummary() {
//   const [recipes, setRecipes] = useState([]);
//   const recipeCollectionRef = collection(db, 'recipes');

//   useEffect(() => {
//     const getRecipes = async () => {
//       try {
//         const data = await getDocs(recipeCollectionRef);
//         setRecipes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//       } catch (error) {
//         console.error('Error fetching recipes: ', error);
//       }
//     };
//     getRecipes();
//   }, []);

//   return (
//     <div className="recipe-summary">
//       {recipes.map((recipe) => {
//         return (
//           <RecipeCard />
//           // <div className="recipe" key={recipe.id}>
//           //   <h1>{recipe.title}</h1>
//           //   <p>Tidsåtgång: {recipe.duration} min</p>
//           //   <IngredientList path={`recipes/${recipe.id}/ingredients`} />
//           //   <p>{recipe.comments}</p>
//           //   <InstructionList data={recipe.instructions}></InstructionList>
//           // </div>
//         );
//       })}
//     </div>
//   );
// }
