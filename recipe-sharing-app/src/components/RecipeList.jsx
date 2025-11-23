// RecipeList.jsx
// This component shows all recipes in a nice list/grid format
// Each recipe has a button to view more details
// It displays filtered recipes based on the search term

import { useRecipeStore } from './recipeStore';
import { Link } from 'react-router-dom';

const RecipeList = () => {
  // Get FILTERED recipes from our store (not all recipes!)
  // The filteredRecipes array only contains recipes that match the search term
  const recipes = useRecipeStore(state => state.filteredRecipes);
  
  // Also get the search term to show how many results we found
  const searchTerm = useRecipeStore(state => state.searchTerm);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '25px',
      padding: '20px'
    }}>
      {/* Show a message if there are no recipes */}
      {recipes.length === 0 ? (
        <div style={{
          gridColumn: '1 / -1',
          textAlign: 'center',
          padding: '40px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '12px',
          fontSize: '1.2em',
          color: '#999'
        }}>
          {searchTerm ? (
            <>
              � No recipes found matching "{searchTerm}"
              <p style={{ fontSize: '0.9em', marginTop: '10px' }}>
                Try searching with different keywords!
              </p>
            </>
          ) : (
            <>
              �📝 No recipes yet! Add your first recipe to get started.
            </>
          )}
        </div>
      ) : (
        // Map through all recipes and display each one
        recipes.map(recipe => (
          <div 
            key={recipe.id}
            style={{
              backgroundColor: 'white',
              padding: '25px',
              borderRadius: '12px',
              boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              borderLeft: '5px solid #667eea',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';
              e.currentTarget.style.borderLeftColor = '#764ba2';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.borderLeftColor = '#667eea';
            }}
          >
            {/* Recipe Title */}
            <h3 style={{
              color: '#667eea',
              fontSize: '1.4em',
              marginBottom: '12px',
              marginTop: '8px',
              wordWrap: 'break-word'
            }}>
              {recipe.title}
            </h3>

            {/* Recipe Description Preview */}
            <p style={{
              color: '#666',
              fontSize: '0.95em',
              lineHeight: '1.6',
              wordWrap: 'break-word',
              marginBottom: '15px',
              flex: 1,
              // Limit to 3 lines of text
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {recipe.description}
            </p>

            {/* View Details Button */}
            <Link
              to={`/recipe/${recipe.id}`}
              style={{
                padding: '10px 15px',
                backgroundColor: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '1em',
                fontWeight: 'bold',
                transition: 'all 0.3s ease',
                width: '100%',
                textDecoration: 'none',
                display: 'block',
                textAlign: 'center'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#764ba2';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#667eea';
                e.target.style.transform = 'scale(1)';
              }}
            >
              👁️ View & Edit
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;