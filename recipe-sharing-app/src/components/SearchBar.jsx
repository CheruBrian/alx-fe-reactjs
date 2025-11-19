// src/components/SearchBar.jsx
import { useRecipeStore } from "../recipeStore";

const SearchBar = () => {
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);
  const searchTerm = useRecipeStore((state) => state.searchTerm);

  return (
    <div className="flex justify-center my-4">
      <input
        type="text"
        value={searchTerm}
        placeholder="🔍 Search recipes by name, ingredient, or time..."
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-2/3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
      />
    </div>
  );
};

export default SearchBar;