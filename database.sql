-- ============================================================================
-- SKEMA DATABASE MONTRACK UNTUK POSTGRESQL
-- ============================================================================
-- File ini berisi perintah DDL untuk membuat struktur tabel yang dibutuhkan 
-- oleh aplikasi Montrack.
--
-- Cara menggunakan:
-- 1. Buat database baru di PostgreSQL: CREATE DATABASE montrack;
-- 2. Jalankan file ini: psql -U postgres -d montrack -f montrack.sql
-- ============================================================================

-- Table structure for table "mon_user"
CREATE TABLE IF NOT EXISTS mon_user (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    auth_key VARCHAR(32) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    password_reset_token VARCHAR(255) DEFAULT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    status SMALLINT NOT NULL DEFAULT 10,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL,
    verification_token VARCHAR(255) DEFAULT NULL,
    premium_status SMALLINT NOT NULL DEFAULT 0,
    premium_expiry_date DATE DEFAULT NULL
);

-- Insert data awal untuk testing
-- Password untuk semua user adalah "123456"
INSERT INTO mon_user (full_name, username, auth_key, password_hash, email, status, created_at, updated_at, premium_status) VALUES
('John Doe', 'johndoe', 'Be367xszaw7lX13jt-HYRtv2l52PpLlv', '$2y$13$AHjS.Z8xwANF8FTtBrSDbuEXCIiPkk5CO4t6lG4Qj2RQ9/X.q8uVG', 'john@example.com', 10, EXTRACT(EPOCH FROM NOW())::INTEGER, EXTRACT(EPOCH FROM NOW())::INTEGER, 0),
('Admin User', 'admin', 'admin_auth_key_12345', '$2y$13$AHjS.Z8xwANF8FTtBrSDbuEXCIiPkk5CO4t6lG4Qj2RQ9/X.q8uVG', 'admin@montrack.com', 10, EXTRACT(EPOCH FROM NOW())::INTEGER, EXTRACT(EPOCH FROM NOW())::INTEGER, 1),
('Demo User', 'demo', 'demo_auth_key_67890', '$2y$13$AHjS.Z8xwANF8FTtBrSDbuEXCIiPkk5CO4t6lG4Qj2RQ9/X.q8uVG', 'demo@montrack.com', 10, EXTRACT(EPOCH FROM NOW())::INTEGER, EXTRACT(EPOCH FROM NOW())::INTEGER, 0)
ON CONFLICT (username) DO NOTHING;

-- Menampilkan informasi tabel yang telah dibuat
SELECT 'Tabel mon_user berhasil dibuat!' as message;
SELECT COUNT(*) as total_users FROM mon_user;
