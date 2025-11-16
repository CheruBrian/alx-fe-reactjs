// components/RecipeCard.jsx
import React from 'react';
import useRecipeStore from '../store/recipeStore';

const RecipeCard = ({ recipe, showRemoveButton = false, onRemove }) => {
  const { toggleFavorite, isFavorite } = useRecipeStore();
  
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(recipe.id);
  };

  return (
    <div className="recipe-card">
      <div className="recipe-image">
        {recipe.image && <img src={recipe.image} alt={recipe.title} />}
        <button 
          className={`favorite-btn ${isFavorite(recipe.id) ? 'active' : ''}`}
          onClick={handleFavoriteClick}
          aria-label={isFavorite(recipe.id) ? 'Remove from favorites' : 'Add to favorites'}
        >
          ♥
        </button>
      </div>
      
      <div className="recipe-content">
        <h3 className="recipe-title">{recipe.title}</h3>
        <p className="recipe-description">{recipe.description}</p>
        
        <div className="recipe-meta">
          {recipe.cookingTime && (
            <span className="cooking-time">⏱ {recipe.cookingTime} min</span>
          )}
          {recipe.difficulty && (
            <span className="difficulty">{recipe.difficulty}</span>
          )}
          {recipe.cuisine && (
            <span className="cuisine">{recipe.cuisine}</span>
          )}
        </div>
        
        {showRemoveButton && (
          <button 
            className="remove-btn"
            onClick={onRemove}
          >
            Remove from Favorites
          </button>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;