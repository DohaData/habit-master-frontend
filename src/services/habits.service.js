import axios from 'axios';

class HabitsService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_REACT_APP_SERVER_URL || "http://localhost:5005"
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
    return this.api.get('/habits');
  }

  // POST /api/examples
  createOne = async (requestBody) => {
  return this.api.post('/create-habit', requestBody);
  }

  // GET /api/examples/:id
  getOne = async (id) => {
return this.api.get(`/habits/${id}`);
  }

  // PUT /api/examples/:id
  updateOne = async (id, requestBody) => {
return this.api.put(`/habits/${id}`, requestBody);
  }

  // DELETE /api/examples/:id
  deleteHabit = async (id) => {
    return this.api.delete(`/habits/${id}`);
  }
};

// Create one instance of the service
const habitsService = new HabitsService();

export default habitsService;
