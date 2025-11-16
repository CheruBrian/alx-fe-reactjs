// src/components/RecipeList.jsx
import { Link } from "react-router-dom";
import { useRecipeStore } from "../store/recipeStore";

const RecipeList = () => {
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);

  if (filteredRecipes.length === 0)
    return <p className="text-center text-gray-500 mt-6">No recipes found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      {filteredRecipes.map((recipe) => (
        <div key={recipe.id} className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
          <p className="text-gray-600 mb-3">{recipe.description}</p>
          <Link
            to={`/recipe/${recipe.id}`}
            className="text-blue-600 hover:underline"
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;