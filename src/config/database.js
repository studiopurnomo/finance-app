// =================================================================================
// !! PERINGATAN KEAMANAN PENTING !!
// =================================================================================
// File ini berisi konfigurasi untuk koneksi ke database.
//
// JANGAN PERNAH MENGGUNAKAN KONFIGURASI INI DI SISI KLIEN (FRONTEND).
//
// Kode frontend (React, Vue, Angular, dll.) berjalan di browser pengguna, dan
// jika Anda menyertakan kredensial database di dalamnya, siapa pun dapat
// melihatnya dengan mudah dan mendapatkan akses penuh ke database Anda.
//
// File ini HANYA boleh digunakan di lingkungan backend (server-side) seperti
// Node.js, Express, dll., di mana kode tidak terekspos ke publik.
//
// Praktik terbaik adalah menggunakan variabel lingkungan (environment variables)
// untuk menyimpan informasi sensitif ini, bukan menuliskannya langsung di dalam kode.
// =================================================================================

export const dbConfig = {
  // Gunakan variabel lingkungan di produksi, dengan nilai default untuk pengembangan lokal
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'montrack', // Sesuai permintaan pengguna
  password: process.env.DB_PASSWORD || 'password_rahasia_anda', // Ganti dengan password aman
  port: process.env.DB_PORT || 5432,
};

// Contoh cara menggunakan ini di backend Node.js dengan library 'pg':
/*
const { Pool } = require('pg');
const { dbConfig } = require('./config/database'); // Sesuaikan path

const pool = new Pool(dbConfig);

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to database', err);
  } else {
    console.log('Successfully connected to database at', res.rows[0].now);
  }
  pool.end();
});
*/
