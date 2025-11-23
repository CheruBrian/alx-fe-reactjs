// FavoritesList.jsx
// This component shows all the recipes that the user has marked as favorites
// It's like a personal collection of recipes the user loves

import { useRecipeStore } from './recipeStore';
import { Link } from 'react-router-dom';

const FavoritesList = () => {
  // Get all recipes and favorites from our store
  const recipes = useRecipeStore(state => state.recipes);
  const favorites = useRecipeStore(state => state.favorites);

  // Map the favorite IDs to actual recipe objects
  // This turns [1234, 5678] into [{title: "...", id: 1234}, {title: "...", id: 5678}]
  const favoriteRecipes = favorites
    .map(id => recipes.find(recipe => recipe.id === id))
    .filter(recipe => recipe !== undefined); // Remove any undefined recipes

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
      marginBottom: '30px'
    }}>
      {/* Title */}
      <h2 style={{
        color: '#667eea',
        marginBottom: '20px',
        fontSize: '1.8em',
        textAlign: 'center'
      }}>
        ❤️ My Favorite Recipes
      </h2>

      {/* Show message if no favorites yet */}
      {favoriteRecipes.length === 0 ? (
        <p style={{
          textAlign: 'center',
          color: '#999',
          fontSize: '1.1em',
          padding: '20px'
        }}>
          💝 No favorites yet! Add recipes you love by clicking the heart button.
        </p>
      ) : (
        /* Show grid of favorite recipes */
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '25px'
        }}>
          {favoriteRecipes.map(recipe => (
            <div
              key={recipe.id}
              style={{
                backgroundColor: '#fff8f9',
                padding: '20px',
                borderRadius: '8px',
                border: '2px solid #ff6b6b',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(255, 107, 107, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Recipe Title */}
              <h3 style={{
                color: '#ff6b6b',
                marginBottom: '10px',
                wordWrap: 'break-word'
              }}>
                {recipe.title}
              </h3>

              {/* Recipe Description Preview */}
              <p style={{
                color: '#666',
                fontSize: '0.95em',
                marginBottom: '15px',
                lineHeight: '1.5',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                wordWrap: 'break-word'
              }}>
                {recipe.description}
              </p>

              {/* View Details Link */}
              <Link
                to={`/recipe/${recipe.id}`}
                style={{
                  display: 'block',
                  padding: '10px',
                  backgroundColor: '#ff6b6b',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '5px',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#ff5252';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#ff6b6b';
                }}
              >
                👁️ View Recipe
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesList;