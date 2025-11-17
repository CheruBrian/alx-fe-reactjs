// recipeStore.js
import { create } from 'zustand';

const useRecipeStore = create((set, get) => ({
  recipes: [],

   // ----- FAVORITES -----
  favorites: [],
  addFavorite: (recipeId) =>
    set((state) => ({
      favorites: [...state.favorites, recipeId],
    })),
  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  // ----- RECOMMENDATIONS -----
  recommendations: [],
  generateRecommendations: () =>
    set((state) => {
      // Simple mock recommendation logic
      const recommended = state.recipes.filter(
        (recipe) =>
          state.favorites.includes(recipe.id) && Math.random() > 0.5
      );

      return { recommendations: recommended };
    }),


  addRecipe: (newRecipe) =>
    set((state) => ({
      recipes: [...state.recipes, newRecipe],
    })),

     updateRecipe: (updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      ),
    })),

     deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== id),
    })),

  // --- Filters ---
  searchTerm: '',
  ingredientFilter: '',
  maxTime: null,

  filteredRecipes: [],

  // --- Actions ---
  setRecipes: (recipes) => {
    set({ recipes });
    get().applyFilters();
  },

  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get().applyFilters();
  },

  setIngredientFilter: (ingredient) => {
    set({ ingredientFilter: ingredient });
    get().applyFilters();
  },

  setMaxTime: (time) => {
    set({ maxTime: time });
    get().applyFilters();
  },

  // --- Filter Logic ---
  applyFilters: () => {
    const { recipes, searchTerm, ingredientFilter, maxTime } = get();

    let filtered = recipes;

    // Search by title
    if (searchTerm) {
      filtered = filtered.filter((r) =>
        r.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by ingredient
    if (ingredientFilter) {
      filtered = filtered.filter((r) =>
        r.ingredients.some((ing) =>
          ing.toLowerCase().includes(ingredientFilter.toLowerCase())
        )
      );
    }

    // Filter by max cooking time
    if (maxTime) {
      filtered = filtered.filter((r) => r.time <= maxTime);
    }

    set({ filteredRecipes: filtered });
  },
}));

export default useRecipeStore;
export { useRecipeStore };
