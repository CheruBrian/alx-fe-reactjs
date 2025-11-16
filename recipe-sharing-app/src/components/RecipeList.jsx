 import { useRecipeStore } from './recipeStore';
 import SearchBar from'./SearchBar';
 import { create } from 'zustand';



const useRecipeStore = create((set) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],

  setRecipes: (recipes) => set({ recipes, filteredRecipes: recipes }),

  setSearchTerm: (term) =>
    set((state) => {
      const filtered = state.recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(term.toLowerCase())
      );
      return { searchTerm: term, filteredRecipes: filtered };
    }),

  filterRecipes: () =>
    set((state) => ({
      filteredRecipes: state.recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      ),
    })),
}));
const RecipeList = () => {
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);

  return (
    <div>
      {filteredRecipes.length === 0 && <p>No recipes found.</p>}

      {filteredRecipes.map((recipe) => (
        <div key={recipe.id} className="border p-4 rounded mb-4">
          <h3 className="text-lg font-bold">{recipe.title}</h3>
          <p>Ingredients: {recipe.ingredients.join(', ')}</p>
          <p>Preparation Time: {recipe.time} minutes</p>
        </div>
      ))}
    </div>
  );
};


  export default RecipeList;