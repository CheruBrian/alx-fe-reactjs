import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useRecipeStore } from './components/srecipeStore';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';
import EditRecipeForm from './components/EditRecipeForm';
import FavoritesList from './components/FavoritesList';
import SearchBar from './components/SearchBar';
import RecommendationsList from './components/RecommendationsList';

function App() {
  const generateRecommendations = useRecipeStore(
    (state) => state.generateRecommendations
  );
  return (
    <Router>
      <div className="container mx-auto px-4">
        <nav className="flex justify-center gap-6 my-4">
          <Link to="/">Home</Link>
          <Link to="/add">Add Recipe</Link>
          <Link to="/favorites">Favorites</Link>
          <Link to="/recommendations">Recommendations</Link>
        </nav>

        <h1 className="text-3xl font-bold text-center my-6">
          🍲 Recipe Sharing App
        </h1>

        <SearchBar />

        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/add" element={<AddRecipeForm />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/favorites" element={<FavoritesList />} />
          <Route path="/recommendations" element={<RecommendationsList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;