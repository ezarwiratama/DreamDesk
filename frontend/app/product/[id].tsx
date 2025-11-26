import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Star, ShoppingBag } from 'lucide-react-native';

export default function ProductDetail() {
  const router = useRouter();
  // Menangkap data lengkap termasuk image
  const { id, name, price, image } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {/* Header Gambar */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: image as string }} style={styles.image} />
        {/* Tombol Kembali Kustom di atas gambar */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft color="white" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.headerInfo}>
          <Text style={styles.title}>{name}</Text>
          <View style={styles.ratingContainer}>
            <Star color="#FFD700" size={16} fill="#FFD700" />
            <Text style={styles.ratingText}>4.8 (120 Ulasan)</Text>
          </View>
        </View>

        <Text style={styles.price}>Rp {parseInt(price as string).toLocaleString('id-ID')}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Deskripsi</Text>
          <Text style={styles.description}>
            Tingkatkan produktivitas dan kenyamanan ruang kerja Anda dengan {name}.
            Didesain dengan estetika minimalis modern dan bahan berkualitas tinggi untuk
            penggunaan jangka panjang. Sempurna untuk setup kerja atau gaming di rumah.
          </Text>
        </View>
      </ScrollView>

      {/* Tombol Beli di Bagian Bawah */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.buyButton}>
          <ShoppingBag color="white" size={20} style={{ marginRight: 10 }} />
          <Text style={styles.buyButtonText}>Tambah ke Keranjang</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  imageContainer: {
    height: 300,
    width: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 8,
    borderRadius: 20,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -25, // Overlap sedikit dengan gambar
    paddingHorizontal: 20,
    paddingTop: 25,
  },
  headerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    elevation: 1,
  },
  ratingText: {
    fontSize: 12,
    color: '#333',
    marginLeft: 5,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#800000',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
    textAlign: 'justify',
  },
  footer: {
    padding: 20,
    backgroundColor: 'white',
    elevation: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  buyButton: {
    backgroundColor: '#800000',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 15,
  },
  buyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});