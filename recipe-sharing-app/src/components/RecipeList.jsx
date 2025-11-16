import React from 'react';
import { Link } from 'react-router-dom';
import { useRecipeStore } from '../recipeStore_js';

const RecipeList = () => {
  const filteredRecipes = useRecipeStore(state => state.filteredRecipes || state.recipes);
  const addFavorite = useRecipeStore(state => state.addFavorite);
  const removeFavorite = useRecipeStore(state => state.removeFavorite);
  const favorites = useRecipeStore(state => state.favorites);

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) removeFavorite(id);
    else addFavorite(id);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Recipes</h2>

      {filteredRecipes.length === 0 && <p>No recipes found.</p>}

      {filteredRecipes.map((recipe) => (
        <div key={recipe.id} className="border p-4 rounded mb-4 flex justify-between items-start">
          <div>
            <Link to={`/recipe/${recipe.id}`}>
              <h3 className="text-lg font-bold text-blue-600 hover:underline">{recipe.title}</h3>
            </Link>
            <p>Ingredients: {recipe.ingredients.join(', ')}</p>
            <p>Preparation Time: {recipe.time} minutes</p>
          </div>

          <button
            onClick={() => toggleFavorite(recipe.id)}
            className="ml-4 px-3 py-1 rounded border"
          >
            {favorites.includes(recipe.id) ? '★ Remove' : '☆ Favorite'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
