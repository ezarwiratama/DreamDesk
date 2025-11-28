const express = require('express');
const router = express.Router();
const supabase = require('../config/supabaseClient');

// GET: Filter by user_id
router.get('/', async (req, res) => {
  const { user_id } = req.query; 
  if (!user_id) return res.status(400).json({ error: 'User ID required' });

  try {
    const { data, error } = await supabase
      .from('cart_items')
      .select('*, products(*)')
      .eq('user_id', user_id); // Filter data
    
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST: Save with user_id
router.post('/', async (req, res) => {
  const { product_id, user_id } = req.body;
  if (!user_id) return res.status(400).json({ error: 'User ID required' });

  try {
    const { data: existingItem } = await supabase
      .from('cart_items')
      .select('*')
      .eq('product_id', product_id)
      .eq('user_id', user_id)
      .single();

    if (existingItem) {
      await supabase.from('cart_items').update({ quantity: existingItem.quantity + 1 }).eq('id', existingItem.id);
    } else {
      await supabase.from('cart_items').insert([{ product_id, quantity: 1, user_id }]);
    }

    res.json({ message: 'Success' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
    // Delete by ID is safe enough for basic app
    const { error } = await supabase.from('cart_items').delete().eq('id', req.params.id);
    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: 'Deleted' });
});

module.exports = router;