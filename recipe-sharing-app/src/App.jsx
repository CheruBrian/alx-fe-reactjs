import './App.css'
import AddRecipeForm from "./components/AddRecipeForm"
import RecipeList from "./components/RecipeList"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';
import EditRecipeForm from './components/EditRecipeForm';


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
