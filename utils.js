// utils.js

// 1. Common Helper Functions
const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

const generateUniqueId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// 2. Form Validation Utilities
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePassword = (password) => {
  // Basic password validation: at least 8 characters
  return password.length >= 8;
};

const validateRequired = (value) => {
  return !isEmpty(value);
};

// 3. API Call Helpers
const apiCall = async (url, method = "GET", body = null, headers = {}) => {
  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json(); // Attempt to parse error response as JSON
      throw new Error(errorData.message || `API Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Call Error:", error);
    throw error; // Re-throw for component-level handling
  }
};

// 4. Date/Time Utilities
const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

const formatTime = (date) => {
  const options = { hour: 'numeric', minute: 'numeric', hour12: true };
  return new Date(date).toLocaleTimeString(undefined, options);
};

const timeAgo = (date) => {
  const now = new Date();
  const then = new Date(date);
  const seconds = Math.round((now - then) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);

  if (seconds < 60) {
    return 'just now';
  } else if (minutes < 60) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
};

// 5. Local Storage Helpers
const setLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error setting localStorage:", error);
  }
};

const getLocalStorage = (key) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Error getting localStorage:", error);
    return null;
  }
};

const removeLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing localStorage:", error);
  }
};

const clearLocalStorage = () => {
    try {
        localStorage.clear();
    } catch (error) {
        console.error("Error clearing localStorage:", error);
    }
}

// 6. DOM Manipulation Utilities
const addClass = (element, className) => {
  if (element) {
    element.classList.add(className);
  }
};

const removeClass = (element, className) => {
  if (element) {
    element.classList.remove(className);
  }
};

const toggleClass = (element, className) => {
  if (element) {
    element.classList.toggle(className);
  }
};

const getElement = (selector) => {
  return document.querySelector(selector);
};

const getAllElements = (selector) => {
    return document.querySelectorAll(selector);
};

// 7. Error Handling Functions
const logError = (error, component = "Unknown") => {
  console.error(`[${component}] Error:`, error);
  // Optionally send errors to a logging service
};

const displayError = (message, elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = message;
    element.style.display = 'block'; // Or however you want to show the error
  } else {
    console.warn(`Error element with ID "${elementId}" not found.`);
  }
};

const clearError = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = '';
        element.style.display = 'none'; // Or hide it however you want
    }
}

export {
  isEmpty,
  generateUniqueId,
  validateEmail,
  validatePassword,
  validateRequired,
  apiCall,
  formatDate,
  formatTime,
  timeAgo,
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
  clearLocalStorage,
  addClass,
  removeClass,
  toggleClass,
  getElement,
  getAllElements,
  logError,
  displayError,
  clearError
};