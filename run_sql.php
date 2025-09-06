<?php
/**
 * Script untuk menjalankan database.sql ke PostgreSQL
 * Jalankan: php run_sql.php
 */

// Konfigurasi database (sesuaikan dengan setting Anda)
$host = 'localhost';
$dbname = 'montrack';
$username = 'postgres';
$password = '123123';

try {
    // Koneksi ke PostgreSQL
    $dsn = "pgsql:host=$host;dbname=$dbname";
    $pdo = new PDO($dsn, $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
    
    echo "✅ Berhasil terkoneksi ke database: $dbname\n";
    
    // Baca file database.sql
    $sqlFile = __DIR__ . '/database.sql';
    if (!file_exists($sqlFile)) {
        throw new Exception("File database.sql tidak ditemukan di: $sqlFile");
    }
    
    $sql = file_get_contents($sqlFile);
    echo "📄 Membaca file: $sqlFile\n";
    
    // Pisahkan statement SQL berdasarkan semicolon
    $statements = explode(';', $sql);
    
    echo "🔄 Menjalankan SQL statements...\n";
    
    foreach ($statements as $statement) {
        $statement = trim($statement);
        
        // Skip komentar dan statement kosong
        if (empty($statement) || substr($statement, 0, 2) === '--') {
            continue;
        }
        
        try {
            $pdo->exec($statement);
            echo "✅ Statement berhasil dijalankan\n";
        } catch (PDOException $e) {
            // Jika error karena tabel sudah ada atau data sudah ada, skip
            if (strpos($e->getMessage(), 'already exists') !== false || 
                strpos($e->getMessage(), 'duplicate key') !== false) {
                echo "⚠️  Warning: " . $e->getMessage() . "\n";
            } else {
                echo "❌ Error: " . $e->getMessage() . "\n";
            }
        }
    }
    
    // Cek apakah tabel dan data berhasil dibuat
    echo "\n🔍 Memeriksa hasil:\n";
    
    // Cek tabel
    $result = $pdo->query("SELECT tablename FROM pg_tables WHERE schemaname = 'public'")->fetchAll();
    echo "📊 Tabel yang tersedia:\n";
    foreach ($result as $row) {
        echo "  - " . $row['tablename'] . "\n";
    }
    
    // Cek data user
    $result = $pdo->query("SELECT COUNT(*) as total FROM mon_user")->fetch();
    echo "\n👥 Total user di database: " . $result['total'] . "\n";
    
    // Tampilkan daftar user
    $users = $pdo->query("SELECT id, username, full_name, email, status FROM mon_user")->fetchAll();
    echo "\n📋 Daftar user:\n";
    foreach ($users as $user) {
        $status = $user['status'] == 10 ? 'Aktif' : 'Tidak Aktif';
        echo "  - ID: {$user['id']} | Username: {$user['username']} | Nama: {$user['full_name']} | Status: $status\n";
    }
    
    echo "\n🎉 Database setup selesai!\n";
    echo "🔑 Kredensial login:\n";
    echo "  - Username: johndoe, Password: 123456\n";
    echo "  - Username: admin, Password: 123456\n";
    echo "  - Username: demo, Password: 123456\n";
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    echo "💡 Pastikan:\n";
    echo "  1. PostgreSQL sudah running\n";
    echo "  2. Database 'montrack' sudah dibuat\n";
    echo "  3. Username dan password benar\n";
    echo "  4. PHP extension pgsql sudah aktif\n";
}
?>
