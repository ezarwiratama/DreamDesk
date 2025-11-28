import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase'; // Import config supabase

const API_URL = 'https://dreamdesk-backend.vercel.app/api'; 

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      fetch(`${API_URL}/products/${id}`)
        .then(res => res.json())
        .then(data => setProduct(data))
        .catch(err => console.error(err));
    }
  }, [id]);

  const addToCart = async () => {
    // 1. Cek Login
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        Alert.alert("Belum Login", "Silakan login untuk belanja", [
            { text: "Nanti" },
            { text: "Login Sekarang", onPress: () => router.push('/(tabs)/profile') }
        ]);
        return;
    }

    setIsAdding(true);
    try {
      // 2. Kirim user_id ke Backend
      const res = await fetch(`${API_URL}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            product_id: product.id, 
            user_id: session.user.id // ID User Unik
        }),
      });

      if (res.ok) {
        Alert.alert("Sukses", "Barang masuk keranjang!");
      } else {
        Alert.alert("Gagal", "Terjadi kesalahan server");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsAdding(false);
    }
  };

  if (!product) return <View style={styles.center}><ActivityIndicator color="#6200EE" /></View>;

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={{ uri: product.image_url }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.price}>Rp {product.price.toLocaleString()}</Text>
          <Text style={styles.descTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.cartBtn} onPress={addToCart} disabled={isAdding}>
          {isAdding ? <ActivityIndicator color="#FFF" /> : <Text style={styles.cartText}>Add to Cart</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: '100%', height: 300, resizeMode: 'cover' },
  details: { padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 10 },
  price: { fontSize: 22, color: '#6200EE', fontWeight: 'bold', marginBottom: 20 },
  descTitle: { fontSize: 18, fontWeight: '600', marginBottom: 5 },
  description: { fontSize: 14, color: '#666', lineHeight: 22 },
  footer: { padding: 20, borderTopWidth: 1, borderTopColor: '#EEE' },
  cartBtn: { backgroundColor: '#6200EE', padding: 15, borderRadius: 10, alignItems: 'center' },
  cartText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});