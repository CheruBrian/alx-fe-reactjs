// RecipeDetails.jsx
// This component shows all the information about ONE specific recipe
// It gets the recipe ID from the URL and finds that recipe in our store

import { useParams, useNavigate } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';
import FavoriteButton from './FavoriteButton';

// Think of this like opening a book to read one specific story in detail
const RecipeDetails = () => {
  // useParams() lets us get information from the URL
  // If the URL is "/recipe/123", recipeId will be "123"
  const { recipeId } = useParams();
  
  // useNavigate() lets us move to different pages
  const navigate = useNavigate();

  // Find the specific recipe that matches our recipe ID from the store
  const recipe = useRecipeStore(state =>
    state.recipes.find(recipe => recipe.id === parseInt(recipeId))
  );

  // If we can't find the recipe, show an error message
  if (!recipe) {
    return (
      <div style={{ 
        padding: '20px',
        textAlign: 'center',
        backgroundColor: '#fee',
        borderRadius: '8px',
        margin: '20px'
      }}>
        <h2 style={{ color: '#c33' }}>Recipe Not Found!</h2>
        <p>Sorry, we couldn't find that recipe.</p>
        <button 
          onClick={() => navigate('/')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      {/* Display the recipe title and description */}
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
        marginBottom: '20px'
      }}>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '8px 15px',
            backgroundColor: '#666',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginBottom: '15px'
          }}
        >
          ← Back to Recipes
        </button>

        <h1 style={{ 
          color: '#667eea',
          marginBottom: '15px',
          wordWrap: 'break-word'
        }}>
          {recipe.title}
        </h1>

        <div style={{
          backgroundColor: '#f8f9ff',
          padding: '20px',
          borderRadius: '8px',
          borderLeft: '4px solid #667eea'
        }}>
          <p style={{ 
            fontSize: '1.1em',
            lineHeight: '1.6',
            color: '#333',
            wordWrap: 'break-word'
          }}>
            {recipe.description}
          </p>
        </div>
      </div>

      {/* Show the favorite, edit form and delete button */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        marginBottom: '20px'
      }}>
        <FavoriteButton recipeId={recipe.id} />
        <DeleteRecipeButton recipeId={recipe.id} />
      </div>

      {/* Edit Recipe Form */}
      <div>
        <EditRecipeForm recipe={recipe} />
      </div>
    </div>
  );
};

export default RecipeDetails;