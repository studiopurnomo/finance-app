<?php
/**
 * Script sederhana untuk membuat tabel dan data awal
 */

// Konfigurasi database
$host = 'localhost';
$dbname = 'montrack';
$username = 'postgres';
$password = '123123';

try {
    $dsn = "pgsql:host=$host;dbname=$dbname";
    $pdo = new PDO($dsn, $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    ]);
    
    echo "✅ Berhasil terkoneksi ke database: $dbname\n";
    
    // SQL untuk membuat tabel
    $createTableSQL = "
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
    )";
    
    echo "🔄 Membuat tabel mon_user...\n";
    $pdo->exec($createTableSQL);
    echo "✅ Tabel mon_user berhasil dibuat!\n";
    
    // SQL untuk insert data
    $insertSQL = "
    INSERT INTO mon_user (full_name, username, auth_key, password_hash, email, status, created_at, updated_at, premium_status) VALUES
    ('John Doe', 'johndoe', 'Be367xszaw7lX13jt-HYRtv2l52PpLlv', '\$2y\$13\$AHjS.Z8xwANF8FTtBrSDbuEXCIiPkk5CO4t6lG4Qj2RQ9/X.q8uVG', 'john@example.com', 10, EXTRACT(EPOCH FROM NOW())::INTEGER, EXTRACT(EPOCH FROM NOW())::INTEGER, 0),
    ('Admin User', 'admin', 'admin_auth_key_12345', '\$2y\$13\$AHjS.Z8xwANF8FTtBrSDbuEXCIiPkk5CO4t6lG4Qj2RQ9/X.q8uVG', 'admin@montrack.com', 10, EXTRACT(EPOCH FROM NOW())::INTEGER, EXTRACT(EPOCH FROM NOW())::INTEGER, 1),
    ('Demo User', 'demo', 'demo_auth_key_67890', '\$2y\$13\$AHjS.Z8xwANF8FTtBrSDbuEXCIiPkk5CO4t6lG4Qj2RQ9/X.q8uVG', 'demo@montrack.com', 10, EXTRACT(EPOCH FROM NOW())::INTEGER, EXTRACT(EPOCH FROM NOW())::INTEGER, 0)
    ON CONFLICT (username) DO NOTHING";
    
    echo "🔄 Menambahkan data awal...\n";
    $pdo->exec($insertSQL);
    echo "✅ Data awal berhasil ditambahkan!\n";
    
    // Verifikasi hasil
    $result = $pdo->query("SELECT COUNT(*) as total FROM mon_user")->fetch();
    echo "\n👥 Total user di database: " . $result['total'] . "\n";
    
    $users = $pdo->query("SELECT id, username, full_name, email, premium_status FROM mon_user")->fetchAll();
    echo "\n📋 Daftar user:\n";
    foreach ($users as $user) {
        $premium = $user['premium_status'] == 1 ? 'Premium' : 'Regular';
        echo "  - ID: {$user['id']} | Username: {$user['username']} | Nama: {$user['full_name']} | Type: $premium\n";
    }
    
    echo "\n🎉 Database setup selesai!\n";
    echo "🔑 Kredensial login (password: 123456):\n";
    echo "  - johndoe (Regular User)\n";
    echo "  - admin (Premium User)\n";
    echo "  - demo (Regular User)\n";
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
}
?>
