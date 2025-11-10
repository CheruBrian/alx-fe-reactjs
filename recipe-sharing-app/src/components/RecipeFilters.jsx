import { useState } from 'react';
import { useRecipeStore } from '../store/recipeStore';

const RecipeFilters = () => {
  const { filters, setFilters, clearFilters, getFilterOptions } = useRecipeStore();
  const [isOpen, setIsOpen] = useState(false);
  const [ingredientInput, setIngredientInput] = useState('');
  
  const filterOptions = getFilterOptions();

  const handleAddIngredient = () => {
    if (ingredientInput.trim() && !filters.ingredients.includes(ingredientInput.trim())) {
      setFilters({
        ingredients: [...filters.ingredients, ingredientInput.trim()]
      });
      setIngredientInput('');
    }
  };

  const handleRemoveIngredient = (ingredientToRemove) => {
    setFilters({
      ingredients: filters.ingredients.filter(ingredient => ingredient !== ingredientToRemove)
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddIngredient();
    }
  };

  const activeFilterCount = [
    filters.difficulty,
    filters.maxCookingTime,
    ...filters.ingredients
  ].filter(Boolean).length;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Filter Header */}
      <div 
        className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-2">
          <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
          </svg>
          <span className="font-semibold text-gray-800">Filters</span>
          {activeFilterCount > 0 && (
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>
        <svg 
          className={`h-5 w-5 text-gray-600 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Filter Content */}
      {isOpen && (
        <div className="p-4 border-t border-gray-200 space-y-6">
          {/* Difficulty Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Difficulty
            </label>
            <select
              value={filters.difficulty}
              onChange={(e) => setFilters({ difficulty: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Difficulties</option>
              {filterOptions.difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>
                  {difficulty}
                </option>
              ))}
            </select>
          </div>

          {/* Cooking Time Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maximum Cooking Time
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="0"
                max={filterOptions.maxCookingTime || 120}
                value={filters.maxCookingTime || 0}
                onChange={(e) => setFilters({ maxCookingTime: e.target.value })}
                className="flex-1"
              />
              <span className="text-sm text-gray-600 min-w-12">
                {filters.maxCookingTime ? `${filters.maxCookingTime} min` : 'Any'}
              </span>
            </div>
          </div>

          {/* Ingredients Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Ingredients
            </label>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                value={ingredientInput}
                onChange={(e) => setIngredientInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type an ingredient..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleAddIngredient}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Add
              </button>
            </div>
            
            {/* Selected Ingredients */}
            {filters.ingredients.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {filters.ingredients.map(ingredient => (
                  <span
                    key={ingredient}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                  >
                    {ingredient}
                    <button
                      onClick={() => handleRemoveIngredient(ingredient)}
                      className="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Filter Actions */}
          <div className="flex justify-between pt-4 border-t border-gray-200">
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
            >
              Clear All
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeFilters;