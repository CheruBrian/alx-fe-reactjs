import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useRecipeStore = create((set, get) => ({
  recipes: [],
  favorites: [],
  recommendations: [],
  userPreferences: {
    dietaryRestrictions: [],
    favoriteCuisines: [],
    cookingTime: null,
    difficulty: null,
  },
  
  // Initialize with some sample recipes
  initializeRecipes: (recipes) => set({ recipes }),
  
  // Favorites actions
  addFavorite: (recipeId) => set(state => {
    // Avoid duplicates
    if (state.favorites.includes(recipeId)) return state;
    return { favorites: [...state.favorites, recipeId] };
  }),
  
  removeFavorite: (recipeId) => set(state => ({
    favorites: state.favorites.filter(id => id !== recipeId)
  })),
  
  toggleFavorite: (recipeId) => set(state => {
    const isFavorite = state.favorites.includes(recipeId);
    if (isFavorite) {
      return { favorites: state.favorites.filter(id => id !== recipeId) };
    } else {
      return { favorites: [...state.favorites, recipeId] };
    }
  }),
  
  isFavorite: (recipeId) => get().favorites.includes(recipeId),
  
  // User preferences
  updateUserPreferences: (preferences) => set(state => ({
    userPreferences: { ...state.userPreferences, ...preferences }
  })),
  
  // Enhanced recommendation system
  generateRecommendations: () => set(state => {
    const { recipes, favorites, userPreferences } = state;
    
    if (recipes.length === 0) return { recommendations: [] };
    
    // Get favorite recipes to understand user preferences
    const favoriteRecipes = recipes.filter(recipe => 
      favorites.includes(recipe.id)
    );
    
    // Calculate recommendation scores for each recipe
    const scoredRecipes = recipes.map(recipe => {
      let score = 0;
      
      // Skip already favorite recipes
      if (favorites.includes(recipe.id)) {
        return { ...recipe, score: -1 }; // Exclude favorites from recommendations
      }
      
      // Score based on cuisine preferences
      if (userPreferences.favoriteCuisines.length > 0) {
        const cuisineMatch = userPreferences.favoriteCuisines.some(cuisine =>
          recipe.cuisine?.toLowerCase().includes(cuisine.toLowerCase())
        );
        if (cuisineMatch) score += 3;
      }
      
      // Score based on dietary restrictions
      if (userPreferences.dietaryRestrictions.length > 0) {
        const dietMatch = userPreferences.dietaryRestrictions.every(restriction =>
          recipe.dietaryInfo?.includes(restriction)
        );
        if (dietMatch) score += 2;
      }
      
      // Score based on cooking time preference
      if (userPreferences.cookingTime && recipe.cookingTime) {
        const timeDiff = Math.abs(recipe.cookingTime - userPreferences.cookingTime);
        if (timeDiff <= 15) score += 1; // Within 15 minutes preference
      }
      
      // Score based on difficulty preference
      if (userPreferences.difficulty && recipe.difficulty) {
        if (recipe.difficulty === userPreferences.difficulty) score += 1;
      }
      
      // Score based on similar ingredients from favorites
      if (favoriteRecipes.length > 0) {
        const commonIngredients = favoriteRecipes.some(favRecipe =>
          favRecipe.ingredients?.some(ingredient =>
            recipe.ingredients?.includes(ingredient)
          )
        );
        if (commonIngredients) score += 2;
      }
      
      // Random factor to provide variety (0 to 1 points)
      score += Math.random();
      
      return { ...recipe, score };
    });
    
    // Sort by score and take top 6 recommendations
    const recommendations = scoredRecipes
      .filter(recipe => recipe.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
    
    return { recommendations };
  }),
}));

export default useRecipeStore;