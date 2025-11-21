import axios from "axios";

const GITHUB_URL = "https://api.github.com/users/";

export const getGithubUser = async (username) => {
  try {
    const response = await axios.get(GITHUB_URL + username, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_APP_GITHUB_API_KEY || ""}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
