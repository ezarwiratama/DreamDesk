import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useCallback } from 'react';
import { useFocusEffect, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../lib/supabase';

const API_URL = 'https://dreamdesk-backend.vercel.app/api';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const router = useRouter();

  const fetchCart = async () => {
    setLoading(true);
    // 1. Cek User Session
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
        setCartItems([]); 
        setLoading(false);
        return; // Jika tidak login, biarkan kosong
    }

    try {
      // 2. Panggil Backend dengan User ID
      const res = await fetch(`${API_URL}/cart?user_id=${session.user.id}`);
      const data = await res.json();
      setCartItems(data);
      
      const sum = data.reduce((acc: number, item: any) => acc + (item.products.price * item.quantity), 0);
      setTotal(sum);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchCart();
    }, [])
  );

  const removeItem = async (id: number) => {
    try {
        await fetch(`${API_URL}/cart/${id}`, { method: 'DELETE' });
        fetchCart();
    } catch (error) { console.error(error); }
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.products.image_url }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.products.name}</Text>
        <Text style={styles.price}>Rp {item.products.price.toLocaleString()}</Text>
        <Text style={styles.qty}>Qty: {item.quantity}</Text>
      </View>
      <TouchableOpacity onPress={() => removeItem(item.id)}>
        <Ionicons name="trash-outline" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color="#6200EE" /></View>;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Cart</Text>
      {cartItems.length === 0 ? (
        <View style={styles.center}>
            <Text style={styles.emptyText}>Keranjang Kosong</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/profile')} style={{marginTop: 10}}>
                <Text style={{color: '#6200EE'}}>Pastikan Anda sudah login</Text>
            </TouchableOpacity>
        </View>
      ) : (
        <>
            <FlatList
                data={cartItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 100 }}
            />
            <View style={styles.footer}>
                <View>
                    <Text style={styles.totalLabel}>Total Price</Text>
                    <Text style={styles.totalPrice}>Rp {total.toLocaleString()}</Text>
                </View>
                <TouchableOpacity style={styles.checkoutBtn}>
                    <Text style={styles.checkoutText}>Checkout</Text>
                </TouchableOpacity>
            </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9', paddingHorizontal: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { fontSize: 24, fontWeight: 'bold', marginVertical: 20 },
  card: { flexDirection: 'row', backgroundColor: '#FFF', padding: 15, borderRadius: 15, marginBottom: 15, alignItems: 'center', elevation: 2 },
  image: { width: 70, height: 70, borderRadius: 10, marginRight: 15 },
  info: { flex: 1 },
  name: { fontWeight: 'bold', fontSize: 16 },
  price: { color: '#6200EE', marginTop: 5 },
  qty: { fontSize: 12, color: '#555', marginTop: 5 },
  emptyText: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  footer: { position: 'absolute', bottom: 20, left: 20, right: 20, backgroundColor: '#FFF', padding: 20, borderRadius: 20, flexDirection: 'row', justifyContent: 'space-between', elevation: 5 },
  totalLabel: { fontSize: 12, color: '#888' },
  totalPrice: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  checkoutBtn: { backgroundColor: '#6200EE', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 10 },
  checkoutText: { color: '#FFF', fontWeight: 'bold' }
});