
// DeleteRecipeButton.jsx
// This is a button that deletes a recipe when clicked
// It asks for confirmation first so we don't accidentally delete recipes

import { useRecipeStore } from './recipeStore';
import { useNavigate } from 'react-router-dom';

// This component takes recipeId as a prop (the ID of the recipe to delete)
const DeleteRecipeButton = ({ recipeId }) => {
  // Get the deleteRecipe function from our store
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);
  
  // useNavigate lets us go back to home after deleting
  const navigate = useNavigate();

  // This function runs when we click the delete button
  const handleDelete = () => {
    // Ask the user if they really want to delete this recipe
    // confirm() shows a dialog with "OK" and "Cancel" buttons
    const confirmDelete = confirm('Are you sure you want to delete this recipe? 🗑️');

    // If they clicked "OK" (true), then delete the recipe
    if (confirmDelete) {
      deleteRecipe(recipeId);
      alert('Recipe deleted successfully! 😢');
      // Go back to the home page
      navigate('/');
    }
    // If they clicked "Cancel" (false), nothing happens
  };

  return (
    <button
      onClick={handleDelete}
      style={{
        width: '100%',
        padding: '12px',
        backgroundColor: '#ff6b6b', // Red color for delete
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1.1em',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 5px 15px rgba(255, 107, 107, 0.4)'
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = '0 8px 25px rgba(255, 107, 107, 0.6)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = '0 5px 15px rgba(255, 107, 107, 0.4)';
      }}
    >
      🗑️ Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;
