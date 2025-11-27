const express = require('express');
const router = express.Router();
const supabase = require('../config/supabaseClient');

// 1. GET Semua Produk (termasuk data kategori)
router.get('/', async (req, res) => {
  try {
    // select(*, categories(*)) artinya ambil semua kolom produk DAN join dengan tabel categories
    const { data, error } = await supabase
      .from('products')
      .select('*, categories(*)');

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. GET Detail Produk berdasarkan ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*, categories(*)')
      .eq('id', id)
      .single(); // single() karena kita cuma mau 1 data

    if (error) throw error;
    
    if (!data) {
        return res.status(404).json({ error: "Produk tidak ditemukan" });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;