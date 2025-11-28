import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

// Ganti dengan IP Address lokal Anda untuk testing backend Express
// const API_URL = 'http://192.168.1.69:5000/api/products'; 
// const API_URL = 'http://10.104.37.127:5000/api/products';
const API_URL = 'https://dreamdesk-backend.vercel.app/api/products';


export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err)) // Handle error gracefully in production
      .finally(() => setLoading(false));
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => router.push(`/product/${item.id}`)}
    >
      <Image source={{ uri: item.image_url }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>Rp {item.price.toLocaleString()}</Text>
        <Text style={styles.rating}>⭐ {item.rating}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color="#6200EE" /></View>;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Catalog</Text>
      <FlatList
        data={products}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9', paddingHorizontal: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', marginVertical: 20 },
  card: { backgroundColor: '#FFF', width: '48%', borderRadius: 15, padding: 10, marginBottom: 15, elevation: 2 },
  image: { width: '100%', height: 120, borderRadius: 10, marginBottom: 10 },
  info: { paddingHorizontal: 5 },
  name: { fontSize: 14, fontWeight: '600', marginBottom: 5 },
  price: { fontSize: 14, color: '#6200EE', fontWeight: 'bold' },
  rating: { fontSize: 12, color: '#FFD700', marginTop: 5 },
});