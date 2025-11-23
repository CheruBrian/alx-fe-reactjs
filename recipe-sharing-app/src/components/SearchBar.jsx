// SearchBar.jsx
// This component is a search input field that lets users search for recipes
// As they type, it updates the search term in our store and filters recipes

import { useRecipeStore } from './recipeStore';

const SearchBar = () => {
  // Get the setSearchTerm function from our store
  // This function will be called whenever the user types
  const setSearchTerm = useRecipeStore(state => state.setSearchTerm);
  
  // Also get the current searchTerm to show it in the input
  const searchTerm = useRecipeStore(state => state.searchTerm);

  // This function runs whenever the input value changes
  const handleSearch = (e) => {
    // Get what the user typed
    const value = e.target.value;
    
    // Update the search term in our store
    // This will automatically filter the recipes!
    setSearchTerm(value);
  };

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '25px',
      marginBottom: '30px',
      borderRadius: '12px',
      boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
      maxWidth: '600px',
      margin: '0 auto 30px auto'
    }}>
      {/* Search Input Field */}
      <input
        type="text"
        placeholder="🔍 Search recipes by name or ingredients..."
        value={searchTerm}
        onChange={handleSearch}
        style={{
          width: '100%',
          padding: '15px',
          fontSize: '1.1em',
          border: '2px solid #e0e0e0',
          borderRadius: '8px',
          transition: 'all 0.3s ease',
          boxSizing: 'border-box'
        }}
        onFocus={(e) => {
          e.target.style.borderColor = '#667eea';
          e.target.style.boxShadow = '0 0 10px rgba(102, 126, 234, 0.3)';
          e.target.style.backgroundColor = '#f8f9ff';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#e0e0e0';
          e.target.style.boxShadow = 'none';
          e.target.style.backgroundColor = 'white';
        }}
      />

      {/* Show how many recipes match the search */}
      {searchTerm && (
        <p style={{
          marginTop: '10px',
          color: '#666',
          fontSize: '0.95em',
          textAlign: 'center'
        }}>
          💡 Tip: Search works with recipe names and descriptions!
        </p>
      )}
    </div>
  );
};

export default SearchBar;