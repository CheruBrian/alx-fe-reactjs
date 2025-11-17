// src/components/RecommendationsList.jsx
import React, { useEffect } from "react";
import { useRecipeStore } from "./recipeStore";
import { Link } from "react-router-dom";

const RecommendationsList = () => {
  const { recommendations, generateRecommendations } = useRecipeStore(
    (state) => ({
      recommendations: state.recommendations,
      generateRecommendations: state.generateRecommendations,
    })
  );

  // Generate new recommendations whenever component loads
  useEffect(() => {
    generateRecommendations();
  }, [generateRecommendations]);

  if (recommendations.length === 0)
    return (
      <p className="text-center text-gray-500 mt-6">
        No recommendations available yet.
      </p>
    );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Recommended for You 🍽️</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendations.map((recipe) => (
          <div key={recipe.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">{recipe.title}</h3>
            <p className="text-gray-600 mb-3">{recipe.description}</p>
            <Link
              to={`/recipe/${recipe.id}`}
              className="text-blue-600 hover:underline"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsList;