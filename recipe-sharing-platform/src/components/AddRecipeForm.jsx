import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddRecipeForm = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    image: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    ingredients: '',
    instructions: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name } = e.target;
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = 'Recipe title is required';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }

    // Summary validation
    if (!formData.summary.trim()) {
      newErrors.summary = 'Recipe summary is required';
    } else if (formData.summary.trim().length < 10) {
      newErrors.summary = 'Summary must be at least 10 characters';
    }

    // Image URL validation
    if (!formData.image.trim()) {
      newErrors.image = 'Image URL is required';
    } else if (!isValidUrl(formData.image)) {
      newErrors.image = 'Please enter a valid URL';
    }

    // Prep time validation
    if (!formData.prepTime.trim()) {
      newErrors.prepTime = 'Preparation time is required';
    }

    // Cook time validation
    if (!formData.cookTime.trim()) {
      newErrors.cookTime = 'Cooking time is required';
    }

    // Servings validation
    if (!formData.servings.trim()) {
      newErrors.servings = 'Number of servings is required';
    } else if (isNaN(formData.servings) || parseInt(formData.servings) < 1) {
      newErrors.servings = 'Please enter a valid number';
    }

    // Ingredients validation
    if (!formData.ingredients.trim()) {
      newErrors.ingredients = 'Ingredients are required';
    } else {
      const ingredientsList = formData.ingredients.split('\n').filter(item => item.trim());
      if (ingredientsList.length < 2) {
        newErrors.ingredients = 'Please enter at least 2 ingredients (one per line)';
      }
    }

    // Instructions validation
    if (!formData.instructions.trim()) {
      newErrors.instructions = 'Cooking instructions are required';
    } else {
      const instructionsList = formData.instructions.split('\n').filter(item => item.trim());
      if (instructionsList.length < 3) {
        newErrors.instructions = 'Please enter at least 3 instruction steps (one per line)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate URL
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Process ingredients and instructions into arrays
    const ingredientsArray = formData.ingredients
      .split('\n')
      .filter(item => item.trim())
      .map(item => item.trim());

    const instructionsArray = formData.instructions
      .split('\n')
      .filter(item => item.trim())
      .map(item => item.trim());

    const newRecipe = {
      id: Date.now(), // Simple ID generation
      title: formData.title.trim(),
      summary: formData.summary.trim(),
      image: formData.image.trim(),
      prepTime: formData.prepTime.trim(),
      cookTime: formData.cookTime.trim(),
      servings: parseInt(formData.servings),
      ingredients: ingredientsArray,
      instructions: instructionsArray
    };

    // Simulate API call
    setTimeout(() => {
      console.log('New Recipe Submitted:', newRecipe);
      
      // Show success message
      alert('Recipe added successfully!');
      
      // Reset form
      setFormData({
        title: '',
        summary: '',
        image: '',
        prepTime: '',
        cookTime: '',
        servings: '',
        ingredients: '',
        instructions: ''
      });
      
      setIsSubmitting(false);
      
      // Navigate back to home
      navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            🍳 Add New Recipe
          </h1>
          <p className="mt-2 text-gray-600">Share your culinary creation with the world</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Recipe Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                Recipe Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., Spaghetti Carbonara"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            {/* Recipe Summary */}
            <div>
              <label htmlFor="summary" className="block text-sm font-semibold text-gray-700 mb-2">
                Recipe Summary *
              </label>
              <textarea
                id="summary"
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                rows="3"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none ${
                  errors.summary ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Brief description of your recipe..."
              />
              {errors.summary && (
                <p className="mt-1 text-sm text-red-600">{errors.summary}</p>
              )}
            </div>

            {/* Image URL */}
            <div>
              <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-2">
                Image URL *
              </label>
              <input
                type="text"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                  errors.image ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="https://example.com/image.jpg"
              />
              {errors.image && (
                <p className="mt-1 text-sm text-red-600">{errors.image}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Tip: Use image hosting services like Unsplash, Imgur, or your own server
              </p>
            </div>

            {/* Time and Servings Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Prep Time */}
              <div>
                <label htmlFor="prepTime" className="block text-sm font-semibold text-gray-700 mb-2">
                  Prep Time *
                </label>
                <input
                  type="text"
                  id="prepTime"
                  name="prepTime"
                  value={formData.prepTime}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                    errors.prepTime ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., 15 mins"
                />
                {errors.prepTime && (
                  <p className="mt-1 text-sm text-red-600">{errors.prepTime}</p>
                )}
              </div>

              {/* Cook Time */}
              <div>
                <label htmlFor="cookTime" className="block text-sm font-semibold text-gray-700 mb-2">
                  Cook Time *
                </label>
                <input
                  type="text"
                  id="cookTime"
                  name="cookTime"
                  value={formData.cookTime}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                    errors.cookTime ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., 30 mins"
                />
                {errors.cookTime && (
                  <p className="mt-1 text-sm text-red-600">{errors.cookTime}</p>
                )}
              </div>

              {/* Servings */}
              <div>
                <label htmlFor="servings" className="block text-sm font-semibold text-gray-700 mb-2">
                  Servings *
                </label>
                <input
                  type="number"
                  id="servings"
                  name="servings"
                  value={formData.servings}
                  onChange={handleChange}
                  min="1"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                    errors.servings ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="4"
                />
                {errors.servings && (
                  <p className="mt-1 text-sm text-red-600">{errors.servings}</p>
                )}
              </div>
            </div>

            {/* Ingredients */}
            <div>
              <label htmlFor="ingredients" className="block text-sm font-semibold text-gray-700 mb-2">
                Ingredients * (one per line, minimum 2)
              </label>
              <textarea
                id="ingredients"
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                rows="8"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none font-mono text-sm ${
                  errors.ingredients ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="400g spaghetti&#10;200g bacon, diced&#10;4 large eggs&#10;100g Parmesan cheese, grated&#10;Salt and pepper to taste"
              />
              {errors.ingredients && (
                <p className="mt-1 text-sm text-red-600">{errors.ingredients}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Enter each ingredient on a new line
              </p>
            </div>

            {/* Instructions */}
            <div>
              <label htmlFor="instructions" className="block text-sm font-semibold text-gray-700 mb-2">
                Cooking Instructions * (one step per line, minimum 3)
              </label>
              <textarea
                id="instructions"
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                rows="10"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none ${
                  errors.instructions ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Bring a large pot of salted water to boil and cook spaghetti.&#10;Fry bacon in a skillet until crispy.&#10;Whisk eggs and Parmesan in a bowl.&#10;Drain pasta and add to skillet with bacon.&#10;Remove from heat and stir in egg mixture."
              />
              {errors.instructions && (
                <p className="mt-1 text-sm text-red-600">{errors.instructions}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Enter each step on a new line
              </p>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <span className="mr-2">✓</span>
                    Submit Recipe
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex-1 bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-6 rounded-lg border-2 border-gray-300 transition-all duration-200 flex items-center justify-center"
              >
                <span className="mr-2">✕</span>
                Cancel
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center pt-2">
              * Required fields
            </p>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-600">
            © 2024 Recipe Sharing Platform. Share your favorite recipes with the world!
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AddRecipeForm;