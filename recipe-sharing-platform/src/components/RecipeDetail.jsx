import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipeDetail = async () => {
      try {
        const response = await fetch('/src/data.json');
        const data = await response.json();
        const foundRecipe = data.find(r => r.id === parseInt(id));
        setRecipe(foundRecipe);
        setLoading(false);
      } catch (error) {
        console.error('Error loading recipe details:', error);
        setLoading(false);
      }
    };

    fetchRecipeDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading recipe...</p>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recipe Not Found</h2>
          <Link to="/" className="text-orange-500 hover:text-orange-600 underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/" className="inline-flex items-center text-orange-500 hover:text-orange-600 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Recipes
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Recipe Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="md:flex">
            {/* Recipe Image */}
            <div className="md:w-1/2">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>

            {/* Recipe Info */}
            <div className="md:w-1/2 p-6 md:p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {recipe.title}
              </h1>
              <p className="text-gray-600 text-lg mb-6">{recipe.summary}</p>

              {/* Recipe Meta Info */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="text-2xl mb-1">⏱️</div>
                  <div className="text-sm text-gray-600">Prep Time</div>
                  <div className="font-semibold text-gray-800">{recipe.prepTime}</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="text-2xl mb-1">🍳</div>
                  <div className="text-sm text-gray-600">Cook Time</div>
                  <div className="font-semibold text-gray-800">{recipe.cookTime}</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="text-2xl mb-1">🍽️</div>
                  <div className="text-sm text-gray-600">Servings</div>
                  <div className="font-semibold text-gray-800">{recipe.servings}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ingredients and Instructions */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Ingredients Section */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-2xl mr-2">🛒</span>
                Ingredients
              </h2>
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-orange-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Instructions Section */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="text-2xl mr-2">👨‍🍳</span>
                Instructions
              </h2>
              <ol className="space-y-6">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold mr-4 mt-1">
                      {index + 1}
                    </span>
                    <p className="text-gray-700 leading-relaxed pt-1">{instruction}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap gap-4">
              <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center">
                <span className="mr-2">❤️</span>
                Save Recipe
              </button>
              <button className="flex-1 bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-6 rounded-lg border-2 border-gray-300 transition-colors duration-200 flex items-center justify-center">
                <span className="mr-2">🖨️</span>
                Print Recipe
              </button>
              <button className="flex-1 bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-6 rounded-lg border-2 border-gray-300 transition-colors duration-200 flex items-center justify-center">
                <span className="mr-2">📤</span>
                Share
              </button>
            </div>
          </div>
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

export default RecipeDetail;