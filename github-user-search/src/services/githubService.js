import axios from "axios";

const SEARCH_URL = "https://api.github.com/search/users?q";

export const fetchUserData = async (username, location, minRepos) => {
  let query = "";

  if (username) query += `${username} `;
  if (location) query += `location:${location} `;
  if (minRepos) query += `repos:>${minRepos}`;

  const trimmed = query.trim().replace(/ /g, "+");

  try {
    const response = await axios.get(SEARCH_URL + trimmed, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_APP_GITHUB_API_KEY || ""}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
