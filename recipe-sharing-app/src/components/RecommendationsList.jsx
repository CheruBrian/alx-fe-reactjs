// RecommendationsList.jsx
// This component shows personalized recipe recommendations based on the user's favorites
// If you liked certain recipes, this suggests other recipes you might enjoy

import { useRecipeStore } from './recipeStore';
import { Link } from 'react-router-dom';

const RecommendationsList = () => {
  // Get recommendations from our store
  const recommendations = useRecipeStore(state => state.recommendations);
  const favorites = useRecipeStore(state => state.favorites);

  // If there are no favorites yet, don't show recommendations
  if (favorites.length === 0) {
    return null;
  }

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
        ✨ Recommended For You
      </h2>

      {/* Show message if no recommendations */}
      {recommendations.length === 0 ? (
        <p style={{
          textAlign: 'center',
          color: '#999',
          fontSize: '1.1em',
          padding: '20px'
        }}>
          📚 Based on your favorites, we'll recommend more recipes!
        </p>
      ) : (
        /* Show grid of recommended recipes */
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '25px'
        }}>
          {recommendations.map(recipe => (
            <div
              key={recipe.id}
              style={{
                backgroundColor: '#f8f9ff',
                padding: '20px',
                borderRadius: '8px',
                border: '2px solid #667eea',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* "Recommended" Badge */}
              <span style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: '#667eea',
                color: 'white',
                padding: '5px 10px',
                borderRadius: '20px',
                fontSize: '0.8em',
                fontWeight: 'bold'
              }}>
                ⭐ Recommended
              </span>

              {/* Recipe Title */}
              <h3 style={{
                color: '#667eea',
                marginBottom: '10px',
                marginTop: '10px',
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
                  backgroundColor: '#667eea',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '5px',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#764ba2';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#667eea';
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

export default RecommendationsList;