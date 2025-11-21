import { useRecipeStore } from "../recipeStore";

const RecommendationsList = () => {
  const recommendations = useRecipeStore((state) => state.recommendations);

  return (
    <div>
      <h2 className="text-xl font-bold">Recommended For You</h2>

      {recommendations.length === 0 && (
        <p>No recommendations yet. Add some favorites first!</p>
      )}

      {recommendations.map((recipe) => (
        <div key={recipe.id} className="border p-2 mt-2 rounded">
          <h3 className="font-semibold">{recipe.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default RecommendationsList;
