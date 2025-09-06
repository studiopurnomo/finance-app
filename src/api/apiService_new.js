import axios from 'axios';

// =================================================================================
// KONFIGURASI AXIOS UNTUK API LOGIN
// =================================================================================
const API_BASE_URL = 'http://localhost:8080'; // URL backend Yii2

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

/**
 * Fungsi untuk melakukan request login ke API backend.
 * @param {{username: string, password: string}} credentials - Kredensial pengguna.
 * @returns {Promise<axios.AxiosResponse<any>>} - Promise yang berisi response dari API.
 */
export const login = (credentials) => {
  return apiClient.post('/login', credentials);
};

// Menambahkan interceptor untuk menyertakan token di setiap request jika sudah login
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
