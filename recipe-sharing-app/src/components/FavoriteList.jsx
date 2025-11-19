

import { Link } from "react-router-dom";
import { useRecipeStore } from "./recipeStore";

const FavoritesList = () => {
  const { favorites, recipes } = useRecipeStore((state) => ({
    favorites: state.favorites,
    recipes: state.recipes,
  }));

  const favoriteRecipes = recipes.filter((r) => favorites.includes(r.id));

  if (favoriteRecipes.length === 0)
    return <p className="text-center text-gray-500 mt-6">No favorites yet ❤️</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Favorite Recipes ❤️</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {favoriteRecipes.map((recipe) => (
          <div key={recipe.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">{recipe.title}</h3>
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
    </div>
  );
};

export default FavoritesList;