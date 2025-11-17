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

    // Extract patterns from favorites
        const favoriteCategories = [...new Set(favoriteRecipes.flatMap(recipe => recipe.categories || []))];
        const favoriteIngredients = [...new Set(favoriteRecipes.flatMap(recipe => recipe.ingredients || []))];
        const avgCookingTime = favoriteRecipes.reduce((sum, recipe) => sum + (recipe.cookingTime || 0), 0) / favoriteRecipes.length;

        // Generate recommendations based on multiple factors
        const scoredRecipes = recipes.map(recipe => {
          if (favorites.includes(recipe.id)) return { ...recipe, score: -1 }; // Exclude favorites

          let score = 0;

          // Category matching (40% weight)
          const categoryMatch = recipe.categories?.filter(cat => 
            favoriteCategories.includes(cat)
          ).length || 0;
          score += categoryMatch * 40;

          // Ingredient similarity (30% weight)
          const ingredientSimilarity = recipe.ingredients?.filter(ingredient =>
            favoriteIngredients.some(favIngredient => 
              favIngredient.toLowerCase().includes(ingredient.toLowerCase()) ||
              ingredient.toLowerCase().includes(favIngredient.toLowerCase())
            )
          ).length || 0;
          score += ingredientSimilarity * 30;

          // Cooking time preference (15% weight)
          if (recipe.cookingTime) {
            const timeDiff = Math.abs(recipe.cookingTime - avgCookingTime);
            score += Math.max(0, 15 - (timeDiff / 10));
          }

          // User preferences (15% weight)
          if (userPreferences.dietaryRestrictions?.length > 0) {
            const meetsDietary = userPreferences.dietaryRestrictions.every(restriction =>
              recipe.dietaryInfo?.includes(restriction)
            );
            score += meetsDietary ? 15 : 0;
          }

          // Rating boost
          score += (recipe.rating || 0) * 5;

          return { ...recipe, score };
        });

        const recommended = scoredRecipes
          .filter(recipe => recipe.score > 0)
          .sort((a, b) => b.score - a.score)
          .slice(0, 10);

        set({ recommendations: recommended });
      },

      // Clear all data
      clearUserData: () => set({ 
        favorites: [], 
        recommendations: [],
        userPreferences: {
          likedCategories: [],
          dislikedIngredients: [],
          dietaryRestrictions: [],
          cookingTime: null,
          difficulty: null
        }
      })
    });
    {
      name: 'recipe-store',
      partialize: (state) => ({ 
        favorites: state.favorites,
        userPreferences: state.userPreferences
      })
    }
  ));

export default useRecipeStore;
export { useRecipeStore };
