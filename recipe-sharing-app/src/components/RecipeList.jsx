 import { useRecipeStore } from './recipeStore';
 import SearchBar from'./SearchBar';


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