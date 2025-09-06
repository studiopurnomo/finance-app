import axios from 'axios';

// =================================================================================
// KONFIGURASI AXIOS UNTUK API LOGIN DAN OPERASI LAINNYA
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

/**
 * Fungsi placeholder untuk deleteTransaction - akan diimplementasikan kemudian
 * @param {number} id - ID transaksi yang akan dihapus
 * @returns {Promise} - Promise untuk operasi delete
 */
export const deleteTransaction = (id) => {
  // Sementara return promise yang resolved untuk menghindari error
  return Promise.resolve({ success: true, message: 'Transaction deleted' });
};

/**
 * Fungsi placeholder untuk operasi transaksi lainnya
 */
export const getTransactions = () => {
  return Promise.resolve([]);
};

export const addTransaction = (transaction) => {
  return Promise.resolve({ success: true, data: transaction });
};

export const updateTransaction = (id, transaction) => {
  return Promise.resolve({ success: true, data: transaction });
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
