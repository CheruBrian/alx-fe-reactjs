 import { useRecipeStore } from './recipeStore';
 import SearchBar from'./SearchBar';
 import { create } from 'zustand';



 const useRecipeStore = create((set, get) => ({
  recipes: [],

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

  const RecipeList = () => {
    const recipes = useRecipeStore(state => state.recipes);

    return (
      <div>
        {recipes.map(recipe => (
          <div key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        ))}
      </div>
    );
     <div>
      <h2>All Recipes</h2>
      <SearchBar />
      <button onClick={handleAddExample}>Add Example Recipe</button>

      <ul style={{ marginTop: 16 }}>
        {visibleRecipes.length > 0 ? (
          visibleRecipes.map((r) => (
            <li key={r.id} style={{ marginBottom: 8 }}>
              <Link to={`/recipes/${r.id}`}>{r.title}</Link> — {r.time} mins
            </li>
            </ul>
          </div>
        ))
  };

  export default RecipeList;