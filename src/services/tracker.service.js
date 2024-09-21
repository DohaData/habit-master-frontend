import axios from "axios";

class TrackerService {
  constructor() {
    this.api = axios.create({
      baseURL:
        import.meta.env.VITE_REACT_APP_SERVER_URL || "http://localhost:5005",
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  // GET /api/examples
  getAll = async () => {
    return this.api.get("/tracker");
  };

  markTaskAsCompleted = async (taskTrackerId) => {
    return this.api.post(`/tracker/complete-task/${taskTrackerId}`);
  };

  deleteTask = async (taskTrackerId) => {
    return this.api.delete(`/tracker/delete-task/${taskTrackerId}`);
  };
}

// Create one instance of the service
const trackerService = new TrackerService();

export default trackerService;
