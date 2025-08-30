# FinanceApp - Aplikasi Pencatatan Keuangan Harian

## 📋 Cara Setup di Laragon (Windows)

### 1. Persiapan Project

Buat struktur folder seperti berikut di folder `laragon/www/finance-app/`:

```
finance-app/
├── src/
│   ├── App.jsx (copy dari artifact finance-app-complete)
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

### 2. Install Dependencies

Buka terminal di Laragon dan jalankan:

```bash
cd C:\laragon\www\finance-app
npm install
```

### 3. Jalankan Development Server

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`

## 🔧 Setup Backend Yii2 (Opsional)

### 1. Buat Project Yii2

```bash
cd C:\laragon\www
composer create-project --prefer-dist yiisoft/yii2-app-basic finance-api
```

### 2. Konfigurasi Database

Edit `finance-api/config/db.php`:

```php
return [
    'class' => 'yii\db\Connection',
    'dsn' => 'mysql:host=localhost;dbname=finance_app',
    'username' => 'root',
    'password' => '',
    'charset' => 'utf8',
];
```

### 3. Jalankan Migration

Buat file migration untuk database schema yang sudah disediakan.

## 🚀 Features

- ✅ Pencatatan pemasukan/pengeluaran
- ✅ Dashboard analytics
- ✅ Konsultasi keuangan AI
- ✅ Membership system (Free/Premium)
- ✅ Payment gateway UI
- ✅ Admin dashboard
- ✅ Dark/Light mode
- ✅ Mobile responsive

## 📱 Screenshots

Aplikasi memiliki tampilan yang modern dan responsif dengan fitur:

- Bottom navigation untuk mobile
- Sidebar navigation untuk desktop
- Modal untuk input transaksi
- Financial health score visualization
- AI consultation dengan rekomendasi

## 🛠️ Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Icons**: Lucide React
- **Backend**: Yii2 PHP Framework (opsional)
- **Database**: MySQL/MariaDB

## 📞 Support

Jika ada kendala saat setup, pastikan:

1. Node.js terinstall (minimal v14)
2. NPM atau Yarn terinstall
3. Laragon berjalan dengan baik

## 🔄 Next Steps

1. Integrasi dengan backend API
2. Setup payment gateway (Midtrans/Xendit)
3. Implementasi OCR untuk scan struk
4. Push notification
5. Export PDF/Excel
