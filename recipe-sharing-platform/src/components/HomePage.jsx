import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from data.json
    const fetchRecipes = async () => {
      try {
        const response = await fetch("/src/data.json");
        const data = await response.json();
        setRecipes(data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading recipes:", error);
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          <p className="mt-4 text-gray-600 text-lg">
            Loading delicious recipes...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                🍳 Recipe Sharing Platform
              </h1>
              <p className="mt-2 text-gray-600">
                Discover and share amazing recipes from around the world
              </p>
            </div>
            <Link
              to="/add-recipe"
              className="mt-4 sm:mt-0 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              <span className="text-xl mr-2">+</span>
              Add Recipe
            </Link>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Featured Recipes
          </h2>
          <p className="text-gray-600">
            Browse through our collection of delicious recipes
          </p>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <Link
              key={recipe.id}
              to={`/recipe/${recipe.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer"
            >
              {/* Recipe Image */}
              <div className="h-48 overflow-hidden bg-gray-200">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>

              {/* Recipe Content */}
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">
                  {recipe.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {recipe.summary}
                </p>

                {/* View Recipe Button */}
                <div className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 text-center">
                  View Recipe
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {recipes.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No recipes found. Check back later!
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-600">
            © 2025 KM Tech Studio Recipe Sharing Platform. Share your favorite
            recipes with the world!
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;