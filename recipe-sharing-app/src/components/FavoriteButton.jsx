// FavoriteButton.jsx
// This is a button that lets users add or remove recipes from their favorites
// Think of it like a heart icon that users can click to save recipes they love

import { useRecipeStore } from './recipeStore';

const FavoriteButton = ({ recipeId }) => {
  // Get the favorite-related functions from our store
  const addFavorite = useRecipeStore(state => state.addFavorite);
  const removeFavorite = useRecipeStore(state => state.removeFavorite);
  const favorites = useRecipeStore(state => state.favorites);

  // Check if this recipe is already in favorites
  const isFavorited = favorites.includes(recipeId);

  // This function runs when user clicks the favorite button
  const handleFavoriteClick = () => {
    if (isFavorited) {
      // If already favorited, remove it
      removeFavorite(recipeId);
    } else {
      // If not favorited, add it
      addFavorite(recipeId);
    }
  };

  return (
    <button
      onClick={handleFavoriteClick}
      style={{
        width: '100%',
        padding: '12px',
        backgroundColor: isFavorited ? '#ff6b6b' : '#e0e0e0',
        color: isFavorited ? 'white' : '#333',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1.1em',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: isFavorited ? '0 5px 15px rgba(255, 107, 107, 0.4)' : '0 5px 15px rgba(0, 0, 0, 0.1)'
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = isFavorited 
          ? '0 8px 25px rgba(255, 107, 107, 0.6)'
          : '0 8px 25px rgba(102, 126, 234, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = isFavorited 
          ? '0 5px 15px rgba(255, 107, 107, 0.4)'
          : '0 5px 15px rgba(0, 0, 0, 0.1)';
      }}
    >
      {isFavorited ? '❤️ Favorited!' : '🤍 Add to Favorites'}
    </button>
  );
};

export default FavoriteButton;