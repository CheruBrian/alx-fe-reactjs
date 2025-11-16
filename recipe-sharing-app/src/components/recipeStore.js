import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useRecipeStore = create(
  persist(
    (set, get) => ({
      recipes: [],
      searchTerm: '',
      filters: {
        difficulty: '',
        maxCookingTime: '',
        ingredients: []
      },
      
      addFavorite: (recipeId) =>
    set(state => ({
      favorites: state.favorites.includes(recipeId)
        ? state.favorites
        : [...state.favorites, recipeId]
    })),

  removeFavorite: (recipeId) =>
    set(state => ({
      favorites: state.favorites.filter(id => id !== recipeId)
    })),

  generateRecommendations: () => {
    const { recipes, favorites } = get();

    // Example mock recommendation logic
    const recommended = recipes.filter(recipe =>
      favorites.includes(recipe.id) && Math.random() > 0.5
    );

    set({ recommendations: recommended });
  }
  
      // Set search term
      setSearchTerm: (term) => set({ searchTerm: term }),
      
      // Set filters
      setFilters: (newFilters) => set({ filters: { ...get().filters, ...newFilters } }),
      
      // Clear all filters
      clearFilters: () => set({ 
        searchTerm: '',
        filters: {
          difficulty: '',
          maxCookingTime: '',
          ingredients: []
        }
      }),
      
      // Get filtered recipes
      getFilteredRecipes: () => {
        const { recipes, searchTerm, filters } = get();
        
        return recipes.filter(recipe => {
          // Search term filter
          const matchesSearch = searchTerm === '' || 
            recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            recipe.ingredients.some(ingredient => 
              ingredient.toLowerCase().includes(searchTerm.toLowerCase())
            );
          
          // Difficulty filter
          const matchesDifficulty = !filters.difficulty || 
            recipe.difficulty === filters.difficulty;
          
          // Cooking time filter
          const matchesCookingTime = !filters.maxCookingTime || 
            parseInt(recipe.cookingTime) <= parseInt(filters.maxCookingTime);
          
          // Ingredients filter (if any ingredients are specified)
          const matchesIngredients = filters.ingredients.length === 0 ||
            filters.ingredients.some(filterIngredient =>
              recipe.ingredients.some(recipeIngredient =>
                recipeIngredient.toLowerCase().includes(filterIngredient.toLowerCase())
              )
            );
          
          return matchesSearch && matchesDifficulty && matchesCookingTime && matchesIngredients;
        });
      },
      
      // Get unique values for filter options
      getFilterOptions: () => {
        const recipes = get().recipes;
        const difficulties = [...new Set(recipes.map(recipe => recipe.difficulty))];
        const allIngredients = recipes.flatMap(recipe => recipe.ingredients);
        const uniqueIngredients = [...new Set(allIngredients)].sort();
        const maxCookingTime = Math.max(...recipes.map(recipe => parseInt(recipe.cookingTime)), 0);
        
        return {
          difficulties,
          ingredients: uniqueIngredients,
          maxCookingTime
        };
      },
      
      // Original actions
      addRecipe: (recipe) => set((state) => ({
        recipes: [...state.recipes, { ...recipe, id: Date.now().toString() }]
      })),
      
      updateRecipe: (id, updatedRecipe) => set((state) => ({
        recipes: state.recipes.map(recipe =>
          recipe.id === id ? { ...updatedRecipe, id } : recipe
        )
      })),
      
      deleteRecipe: (id) => set((state) => ({
        recipes: state.recipes.filter(recipe => recipe.id !== id)
      })),
      
      getRecipe: (id) => {
        return get().recipes.find(recipe => recipe.id === id);
      }
    }),
    {
      name: 'recipe-storage',
    }
  )
);
