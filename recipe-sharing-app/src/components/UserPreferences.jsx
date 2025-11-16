// components/UserPreferences.jsx
import React, { useState } from 'react';
import useRecipeStore from '../store/recipeStore';

const UserPreferences = () => {
  const { userPreferences, updateUserPreferences, generateRecommendations } = useRecipeStore();
  const [isOpen, setIsOpen] = useState(false);

  const dietaryOptions = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free'];
  const cuisineOptions = ['Italian', 'Mexican', 'Asian', 'Indian', 'Mediterranean', 'American'];
  const difficultyOptions = ['Easy', 'Medium', 'Hard'];

  const handlePreferenceChange = (category, value, isMultiple = false) => {
    if (isMultiple) {
      const currentValues = userPreferences[category] || [];
      const updatedValues = currentValues.includes(value)
        ? currentValues.filter(item => item !== value)
        : [...currentValues, value];
      
      updateUserPreferences({ [category]: updatedValues });
    } else {
      updateUserPreferences({ [category]: value });
    }
  };

  const handleSave = () => {
    generateRecommendations();
    setIsOpen(false);
  };

  return (
    <div className="user-preferences">
      <button 
        className="preferences-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        ⚙️ Preferences
      </button>

      {isOpen && (
        <div className="preferences-modal">
          <div className="preferences-content">
            <h3>Your Preferences</h3>
            
            <div className="preference-section">
              <h4>Dietary Restrictions</h4>
              <div className="preference-options">
                {dietaryOptions.map(option => (
                  <label key={option} className="preference-option">
                    <input
                      type="checkbox"
                      checked={userPreferences.dietaryRestrictions?.includes(option)}
                      onChange={() => handlePreferenceChange('dietaryRestrictions', option, true)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            <div className="preference-section">
              <h4>Favorite Cuisines</h4>
              <div className="preference-options">
                {cuisineOptions.map(option => (
                  <label key={option} className="preference-option">
                    <input
                      type="checkbox"
                      checked={userPreferences.favoriteCuisines?.includes(option)}
                      onChange={() => handlePreferenceChange('favoriteCuisines', option, true)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            <div className="preference-section">
              <h4>Preferred Cooking Time</h4>
              <select
                value={userPreferences.cookingTime || ''}
                onChange={(e) => handlePreferenceChange('cookingTime', e.target.value ? parseInt(e.target.value) : null)}
              >
                <option value="">Any time</option>
                <option value="15">15 minutes or less</option>
                <option value="30">30 minutes or less</option>
                <option value="45">45 minutes or less</option>
                <option value="60">60 minutes or less</option>
              </select>
            </div>

            <div className="preference-section">
              <h4>Difficulty Level</h4>
              <div className="preference-options">
                {difficultyOptions.map(option => (
                  <label key={option} className="preference-option">
                    <input
                      type="radio"
                      name="difficulty"
                      checked={userPreferences.difficulty === option}
                      onChange={() => handlePreferenceChange('difficulty', option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            <div className="preferences-actions">
              <button onClick={handleSave}>Save Preferences</button>
              <button onClick={() => setIsOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPreferences;