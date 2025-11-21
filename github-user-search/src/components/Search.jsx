import { useState } from "react";
import { fetchUserData } from "../services/githubService";

function Search() {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]); // 👈 list instead of single user
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [location, setLocation] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim()) return;

    setLoading(true);
    setError("");
    setUsers([]);

    try {
      const results = await fetchUserData(username); // must return an array
      setUsers(results); // 👈 store list
    } catch (err) {
      setError('Looks like we cant find the user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-4">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search GitHub username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 text-lg border rounded-lg"
        />
        <input
          type="text"
          placeholder="Location (optional)..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-3 mt-2 text-lg border rounded-lg"
        />
        <button
          type="submit"
          className="mt-3 w-full p-3 text-lg bg-blue-600 text-white rounded-lg"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-center mt-3">Loading...</p>}
      {error && <p className="text-center mt-3 text-red-600">{error}</p>}

      {/* 👇 MAP GOES HERE */}
      {users.length > 0 && (
        <div className="mt-6 space-y-4">
          {users.map((user) => (
            <div key={user.id} className="p-4 border rounded-lg text-center">
              <img
                src={user.avatar_url}
                alt="avatar"
                className="w-20 h-20 rounded-full mx-auto"
              />
              <h3 className="mt-2 text-lg font-semibold">
                {user.login}
              </h3>
              <a
                href={user.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                View Profile
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
