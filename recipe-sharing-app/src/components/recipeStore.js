import { create } from 'zustand';

export const useRecipeStore = create((set, get) => ({
  recipes: [],
  favorites: [],
  recommendations: [],

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
}));
