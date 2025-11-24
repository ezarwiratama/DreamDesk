DreamDesk 🖥️

Ecommerce Desk Setup Application

DreamDesk adalah aplikasi mobile e-commerce yang berfokus pada penjualan peralatan desk setup (Monitor, Keyboard, Mouse, Meja, Kursi Ergonomis). Aplikasi ini dibangun sebagai syarat Tugas Akhir Praktikum Pengembangan Aplikasi Mobile.

👨‍💻 Identitas Pengembang

Nama: Ezar Hardin Wiratama

NIM: 21120123140116

Kelompok/Shift: 07/02

🛠️ Tech Stack

Aplikasi ini menggunakan arsitektur Client-Server dengan rincian teknologi:

Frontend: React Native (Framework), Expo (Platform), React Navigation.

Backend: Node.js, Express.js (REST API).

Database: Supabase (PostgreSQL).

Tools: Visual Studio Code, Git, Postman.

📱 Fitur Aplikasi

Sesuai ketentuan Tugas Akhir, aplikasi ini memiliki fitur:

[x] Custom API: Web Service sendiri menggunakan Express.js.

[x] Bottom Navigation Bar: Navigasi utama antar menu.

[x] Katalog Produk: Menampilkan daftar barang dari database.

[x] Detail Produk: Informasi detail saat produk diklik.

[x] Profil Pengguna: Halaman "About" aplikasi & developer.

[x] Koneksi Database: Data dinamis dari Supabase.

🚀 Cara Menjalankan Project (Installation)

Ikuti langkah-langkah berikut untuk menjalankan aplikasi di komputer lokal.

1. Clone Repository

git clone [https://github.com/USERNAME_GITHUB_KAMU/dreamdesk.git](https://github.com/USERNAME_GITHUB_KAMU/dreamdesk.git)
cd dreamdesk


2. Setup Backend (Server)

Server harus berjalan agar aplikasi bisa mengambil data.

Masuk ke folder backend:

cd backend


Install dependencies:

npm install


Buat file .env dan isi konfigurasi Supabase:

SUPABASE_URL=[https://your-project.supabase.co](https://your-project.supabase.co)
SUPABASE_KEY=your-anon-key
PORT=3000


Jalankan server:

node index.js


(Pastikan muncul pesan: Server berjalan di port 3000)

3. Setup Frontend (Aplikasi Mobile)

Buka terminal baru (jangan matikan terminal backend).

Masuk ke folder frontend:

cd frontend


Install dependencies:

npm install


PENTING: Buka file kodingan tempat fetch API (misal screens/CatalogScreen.js), ganti URL fetch dengan IP Address Laptop kamu.

Jangan pakai localhost.

Contoh: http://192.168.1.XX:3000/api/products

Jalankan aplikasi:

npx expo start


Scan QR Code menggunakan aplikasi Expo Go di Android/iOS.