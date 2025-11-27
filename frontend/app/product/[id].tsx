import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

const API_URL = 'http://192.168.1.XX:3000/api/products';

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      fetch(`${API_URL}/${id}`)
        .then(res => res.json())
        .then(data => setProduct(data))
        .catch(err => console.error(err));
    }
  }, [id]);

  if (!product) return <View style={styles.container}><Text>Loading...</Text></View>;

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
      
      {/* Bottom Action Bar */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.cartBtn} onPress={() => alert('Added to cart!')}>
          <Text style={styles.cartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
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