import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import { getGitHubUser } from './services/githubService'

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (username) => {
    setError("");
    setUser(null);

    try {
      const data = await getGithubUser(username);
      setUser(data);
    } catch (err) {
      setError("User not found");
    }
  };
   return (
    <div className="app-container">
      <h1>GitHub User Search</h1>
      <SearchBar onSearch={handleSearch} />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <UserCard user={user} />
    </div>
  );
}

export default App
