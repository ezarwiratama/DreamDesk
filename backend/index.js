const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Agar frontend boleh akses backend
app.use(express.json()); // Agar backend bisa baca data JSON

// Import Routes
const productRoutes = require('./routes/productRoutes');

// Gunakan Routes
// Artinya: semua URL yang diawali /api/products akan dihandle oleh productRoutes
app.use('/api/products', productRoutes);

// Route Cek Server (Hanya untuk memastikan server nyala)
app.get('/', (req, res) => {
  res.send('Server DreamDesk Berjalan! 🚀');
});

// Jalankan Server
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
  console.log(`Test endpoint: http://localhost:${PORT}/api/products`);
});