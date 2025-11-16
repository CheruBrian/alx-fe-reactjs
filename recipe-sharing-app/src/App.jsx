import './App.css'
import AddRecipeForm from "./components/AddRecipeForm"
import RecipeList from "./components/RecipeList"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';
import EditRecipeForm from './components/EditRecipeForm';
import React, { useEffect } from 'react';
import useRecipeStore from './store/recipeStore';
import FavoritesList from './components/FavoritesList';
import RecommendationsList from './components/RecommendationsList';
import UserPreferences from './components/UserPreferences';
import RecipeList from './components/RecipeList';

// Sample data for initialization
const sampleRecipes = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    description: "Classic Italian pasta dish with eggs, cheese, and pancetta",
    cuisine: "Italian",
    cookingTime: 30,
    difficulty: "Medium",
    dietaryInfo: ["Vegetarian"],
    ingredients: ["spaghetti", "eggs", "parmesan", "pancetta"]
  },
  {
    id: 2,
    title: "Vegetable Stir Fry",
    description: "Quick and healthy vegetable stir fry with tofu",
    cuisine: "Asian",
    cookingTime: 20,
    difficulty: "Easy",
    dietaryInfo: ["Vegetarian", "Vegan"],
    ingredients: ["tofu", "bell peppers", "broccoli", "soy sauce"]
  },
  // Add more sample recipes...
];


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-3xl font-bold text-gray-800">Recipe Sharing App</h1>
          </div>
        </header>
        
        <main>
          <Routes>
            <Route path="/" element={<RecipeList />} />
            <Route path="/add-recipe" element={<AddRecipeForm />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/edit-recipe/:id" element={<EditRecipeForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );

    </>
  )
}

export default App
