import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
const getAuthHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export const loginUser = async (name, email) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/login`, { name, email });
    const userData = response.data;

    console.log(response);
    // Store token & user ID in localStorage
    localStorage.setItem("token", userData.token);
    localStorage.setItem("user", JSON.stringify(userData.user));

    return userData.user; // Return user info
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error;
  }
};

export const getUser = () => {
  try {
    const userJSON = localStorage.getItem("user");
    if (userJSON) {
      //console.log(userJSON);
      return JSON.parse(userJSON);
    }
  } catch (error) {
  }

  return null;
}

// Get all tasks with pagination & filtering
export const getTasks = async (statusFilter = "All", page = 1, limit = 5) => {
  try {
    const query = statusFilter === "All" ? "" : `&status=${statusFilter}`;
    const response = await axios.get(`${API_BASE_URL}/tasks?page=${page}&limit=${limit}${query}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

// Get a single task by ID
export const getTask = async (taskId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks/${taskId}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching task:", error);
    throw error;
  }
};

// Create a new task
export const createTask = async (taskData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/tasks`, taskData, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

// Update an existing task
export const updateTask = async (taskId, updatedData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/tasks/${taskId}`, updatedData, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

// Delete a task
export const deleteTask = async (taskId) => {
  try {
    await axios.delete(`${API_BASE_URL}/tasks/${taskId}`, getAuthHeaders());
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
