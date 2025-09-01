import axios from 'axios';
import { initialFinancialData, initialUserProfile, transactions as mockTransactions } from '../data/mockData';

// =================================================================================
// KONFIGURASI AXIOS
// =================================================================================
// Catatan untuk Pengguna:
// URL dasar ini adalah placeholder. Ganti dengan URL API backend Anda yang sebenarnya.
const API_BASE_URL = '/api/v1'; // Placeholder

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

// =================================================================================
// FUNGSI LAYANAN API DENGAN MOCK DATA
// =================================================================================
// Catatan untuk Pengguna:
// Fungsi-fungsi ini sekarang MENGEMBALIKAN DATA STATIS untuk keperluan demonstrasi.
// Hapus bagian `return new Promise(...)` dan aktifkan kembali kode `apiClient`
// ketika backend Anda sudah siap.

const MOCK_DELAY = 500; // Meniru jeda waktu jaringan

export const getDashboardData = async () => {
  console.log("MOCK API: Fetching dashboard data...");
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(initialFinancialData);
    }, MOCK_DELAY);
  });
  // KODE ASLI (AKTIFKAN NANTI):
  // try {
  //   const response = await apiClient.get('/dashboard');
  //   return response.data;
  // } catch (error) {
  //   console.error('Error fetching dashboard data:', error);
  //   throw error;
  // }
};

export const getTransactions = async (params = {}) => {
  console.log("MOCK API: Fetching transactions with params:", params);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockTransactions);
    }, MOCK_DELAY);
  });
  // KODE ASLI (AKTIFKAN NANTI):
  // try {
  //   const response = await apiClient.get('/transactions', { params });
  //   return response.data;
  // } catch (error) {
  //   console.error('Error fetching transactions:', error);
  //   throw error;
  // }
};

export const addTransaction = async (transactionData) => {
  console.log("MOCK API: Adding transaction:", transactionData);
  return new Promise(resolve => {
    setTimeout(() => {
      const newTransaction = { ...transactionData, id: new Date().getTime() };
      mockTransactions.unshift(newTransaction); // Tambahkan ke awal array
      resolve(newTransaction);
    }, MOCK_DELAY);
  });
  // KODE ASLI (AKTIFKAN NANTI):
  // try {
  //   const response = await apiClient.post('/transactions', transactionData);
  //   return response.data;
  // } catch (error) {
  //   console.error('Error adding transaction:', error);
  //   throw error;
  // }
};

export const getUserProfile = async () => {
  console.log("MOCK API: Fetching user profile...");
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(initialUserProfile);
    }, MOCK_DELAY);
  });
  // KODE ASLI (AKTIFKAN NANTI):
  // try {
  //   const response = await apiClient.get('/user/profile');
  //   return response.data;
  // } catch (error) {
  //   console.error('Error fetching user profile:', error);
  //   throw error;
  // }
};

export const updateUserProfile = async (profileData) => {
  console.log("MOCK API: Updating user profile with:", profileData);
  return new Promise(resolve => {
    setTimeout(() => {
      // Di mock, kita hanya mengembalikan data yang sama seolah-olah berhasil disimpan
      resolve(profileData);
    }, MOCK_DELAY);
  });
  // KODE ASLI (AKTIFKAN NANTI):
  // try {
  //   const response = await apiClient.put('/user/profile', profileData);
  //   return response.data;
  // } catch (error) {
  //   console.error('Error updating user profile:', error);
  //   throw error;
  // }
};

// Anda bisa menambahkan lebih banyak fungsi sesuai kebutuhan aplikasi, seperti:
// - deleteTransaction(id)
// - updateTransaction(id, data)
// - getBudgets()
// - login(credentials)
// - register(userData)
