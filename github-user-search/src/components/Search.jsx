import { useState } from "react";
import { fetchUserData } form "../services/githubService";

function Search() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim()) return;

    setLoading(true);
    setError("");
    setUser(null);

    try {
      const data = await fetchUserData(username);
      setUser(data);
    } catch (err) {
      setError("Looks like we can't find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: "400px", margin: "20px auto" }}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search GitHub username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
      </form>

      {/* Loading message */}
      {loading && <p>Loading...</p>}

      {/* Error message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Successful result */}
      {user && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <img
            src={user.avatar_url}
            alt="avatar"
            width="120"
            style={{ borderRadius: "50%" }}
          />
          <h3>{user.name || user.login}</h3>
          <a href={user.html_url} target="_blank" rel="noreferrer">
            View Profile
          </a>
        </div>
      )}
    </div>
  );
}

export default Search;
