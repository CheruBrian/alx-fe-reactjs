// src/store/recipeStore.js
import { create } from "zustand";

export const useRecipeStore = create((set, get) => ({
  recipes: [],
  filteredRecipes: [],
  favorites: [],
  recommendations: [],

  // Existing actions
  addRecipe: (recipe) =>
    set((state) => ({
      recipes: [...state.recipes, recipe],
      filteredRecipes: [...state.filteredRecipes, recipe],
    })),

  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((r) => r.id !== id),
      filteredRecipes: state.filteredRecipes.filter((r) => r.id !== id),
      favorites: state.favorites.filter((favId) => favId !== id),
    })),

  updateRecipe: (updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((r) =>
        r.id === updatedRecipe.id ? updatedRecipe : r
      ),
      filteredRecipes: state.filteredRecipes.map((r) =>
        r.id === updatedRecipe.id ? updatedRecipe : r
      ),
    })),

  // ✅ FAVORITES FUNCTIONALITY
  addFavorite: (recipeId) =>
    set((state) => ({
      favorites: [...new Set([...state.favorites, recipeId])],
    })),

  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  toggleFavorite: (recipeId) => {
    const { favorites, addFavorite, removeFavorite } = get();
    favorites.includes(recipeId)
      ? removeFavorite(recipeId)
      : addFavorite(recipeId);
  },

  // ✅ RECOMMENDATION FUNCTIONALITY
  generateRecommendations: () => {
    const { recipes, favorites } = get();
    const recommended = recipes.filter(
      (recipe) =>
        !favorites.includes(recipe.id) && Math.random() > 0.5 // Mock logic
    );
    set({ recommendations: recommended });
  },
}));