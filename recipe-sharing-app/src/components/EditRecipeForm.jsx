// EditRecipeForm.jsx
// This component lets us edit an existing recipe
// It's like a form that's already filled with the recipe's current information

import { useState } from 'react';
import { useRecipeStore } from './recipeStore';
import { useNavigate } from 'react-router-dom';

// This component takes a recipe object as a prop (the recipe we want to edit)
const EditRecipeForm = ({ recipe }) => {
  // useState creates state variables to track what we're typing
  const [title, setTitle] = useState(recipe.title); // Start with current title
  const [description, setDescription] = useState(recipe.description); // Start with current description

  // Get the updateRecipe function from our store
  const updateRecipe = useRecipeStore(state => state.updateRecipe);
  
  // useNavigate lets us go back to home after editing
  const navigate = useNavigate();

  // This function runs when we submit the form
  const handleSubmit = (event) => {
    // Prevent the page from refreshing
    event.preventDefault();

    // Update the recipe in our store with the new information
    updateRecipe(recipe.id, {
      title: title,
      description: description
    });

    // Show a success message
    alert('Recipe updated successfully! 🎉');

    // Go back to the home page
    navigate('/');
  };

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ 
        color: '#667eea',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        Edit Recipe
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Input for the recipe title */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Recipe Title"
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '15px',
            border: '2px solid #e0e0e0',
            borderRadius: '8px',
            fontSize: '1em',
            transition: 'all 0.3s ease',
            boxSizing: 'border-box'
          }}
          onFocus={(e) => e.target.style.borderColor = '#667eea'}
          onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
        />

        {/* Textarea for the recipe description */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Recipe Description"
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '20px',
            border: '2px solid #e0e0e0',
            borderRadius: '8px',
            fontSize: '1em',
            minHeight: '150px',
            transition: 'all 0.3s ease',
            boxSizing: 'border-box',
            fontFamily: 'inherit'
          }}
          onFocus={(e) => e.target.style.borderColor = '#667eea'}
          onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
        />

        {/* Submit button */}
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1.1em',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 5px 15px rgba(102, 126, 234, 0.4)'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.4)';
          }}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditRecipeForm;