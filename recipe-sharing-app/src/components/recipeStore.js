import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useRecipeStore = create(
  persist(
    (set, get) => ({
      recipes: [],
      
      // Add a new recipe
      addRecipe: (recipe) => set((state) => ({
        recipes: [...state.recipes, { ...recipe, id: Date.now().toString() }]
      })),
      
      // Update an existing recipe
      updateRecipe: (id, updatedRecipe) => set((state) => ({
        recipes: state.recipes.map(recipe =>
          recipe.id === id ? { ...updatedRecipe, id } : recipe
        )
      })),
      
      // Delete a recipe
      deleteRecipe: (id) => set((state) => ({
        recipes: state.recipes.filter(recipe => recipe.id !== id)
      })),
      
      // Get a specific recipe by ID
      getRecipe: (id) => {
        return get().recipes.find(recipe => recipe.id === id);
      }
    }),
    {
      name: 'recipe-storage',
    }
  )
);