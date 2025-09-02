-- =============================================================================
-- SKEMA DATABASE MONTRACK UNTUK POSTGRESQL
-- =============================================================================
-- File ini berisi perintah DDL (Data Definition Language) untuk membuat
-- struktur tabel yang dibutuhkan oleh aplikasi Montrack.
--
-- Cara menggunakan:
-- 1. Buat database baru di PostgreSQL, contoh: CREATE DATABASE montrack;
-- 2. Jalankan file ini pada database tersebut, contoh:
--    psql -U a -d montrack -f montrack.sql
-- =============================================================================

-- Ekstensi untuk menggunakan UUID sebagai primary key (opsional, tapi disarankan)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -----------------------------------------------------
-- Tabel: users
-- Menyimpan data pengguna aplikasi.
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  membership_type VARCHAR(50) NOT NULL DEFAULT 'free' CHECK (membership_type IN ('free', 'premium')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------
-- Tabel: categories
-- Menyimpan kategori transaksi, bisa default atau milik pengguna.
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  user_id UUID, -- NULL jika kategori default, atau FK ke users.id jika custom
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('income', 'expense')),
  icon VARCHAR(100), -- Nama ikon dari library (misal: 'coffee', 'car')
  color VARCHAR(50), -- Kode warna hex atau nama kelas tailwind

  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE (user_id, name, type) -- Mencegah duplikasi kategori per pengguna
);

-- -----------------------------------------------------
-- Tabel: transactions
-- Menyimpan semua catatan transaksi keuangan pengguna.
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  category_id INT NOT NULL,
  amount NUMERIC(15, 2) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('income', 'expense')),
  note TEXT,
  receipt_url VARCHAR(255), -- URL ke gambar struk jika diupload
  transaction_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT
);

-- -----------------------------------------------------
-- Tabel: budgets
-- Menyimpan anggaran bulanan pengguna, bisa per kategori atau total.
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS budgets (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  category_id INT, -- NULL jika ini adalah budget total bulanan
  amount NUMERIC(15, 2) NOT NULL,
  period DATE NOT NULL, -- Menyimpan tanggal awal bulan (misal: '2025-01-01')
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
  UNIQUE (user_id, category_id, period) -- Mencegah duplikasi budget
);

-- -----------------------------------------------------
-- Tabel: savings_goals
-- Menyimpan target atau tujuan tabungan pengguna.
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS savings_goals (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  target_amount NUMERIC(15, 2) NOT NULL,
  current_amount NUMERIC(15, 2) NOT NULL DEFAULT 0.00,
  target_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Membuat index untuk mempercepat query pada foreign key dan kolom yang sering dicari
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(transaction_date);
CREATE INDEX IF NOT EXISTS idx_budgets_user_period ON budgets(user_id, period);

-- Komentar untuk trigger otomatisasi `updated_at`
-- Di PostgreSQL, cara terbaik untuk mengotomatisasi `updated_at` adalah dengan trigger.
-- Berikut adalah contoh fungsi dan trigger yang bisa Anda tambahkan:
/*
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp_users
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

CREATE TRIGGER set_timestamp_transactions
BEFORE UPDATE ON transactions
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();
*/

-- Menambahkan beberapa kategori default (opsional)
INSERT INTO categories (user_id, name, type, icon, color) VALUES
  (NULL, 'Makanan', 'expense', 'Coffee', 'bg-orange-500'),
  (NULL, 'Transportasi', 'expense', 'Car', 'bg-blue-500'),
  (NULL, 'Belanja', 'expense', 'ShoppingCart', 'bg-purple-500'),
  (NULL, 'Kesehatan', 'expense', 'Heart', 'bg-red-500'),
  (NULL, 'Hiburan', 'expense', 'Film', 'bg-pink-500'),
  (NULL, 'Tagihan', 'expense', 'FileText', 'bg-gray-500'),
  (NULL, 'Lainnya', 'expense', 'MoreHorizontal', 'bg-indigo-500'),
  (NULL, 'Gaji', 'income', 'Briefcase', 'bg-green-500'),
  (NULL, 'Freelance', 'income', 'Smartphone', 'bg-teal-500'),
  (NULL, 'Investasi', 'income', 'TrendingUp', 'bg-emerald-500'),
  (NULL, 'Lainnya', 'income', 'DollarSign', 'bg-cyan-500')
ON CONFLICT (user_id, name, type) DO NOTHING;

-- Akhir dari skema --
