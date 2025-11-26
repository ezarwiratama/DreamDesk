import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Image, StatusBar, ListRenderItem } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Menu, ShoppingCart, Search, Star, Filter } from 'lucide-react-native';

// 1. DEFINISI TIPE DATA (Ini perbaikan utamanya)
interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
}

const CATEGORIES = ['Semua', 'Meja', 'Kursi', 'Monitor', 'Keyboard', 'Mouse', 'Lampu'];

// Data Dummy menggunakan tipe Product
const PRODUCTS: Product[] = [
  { id: '1', name: 'Meja Kayu Minimalis', price: 1500000, rating: 4.8, image: 'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWluaW1hbGlstCUyMGRlc2t8ZW58MHx8MHx8fDA%3D' },
  { id: '2', name: 'Kursi Ergonomis Pro', price: 2500000, rating: 4.9, image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXJnb25vbWljJTIwY2hhaXJ8ZW58MHx8MHx8fDA%3D' },
  { id: '3', name: 'Monitor 4K UltraSlim', price: 4500000, rating: 4.7, image: 'https://images.unsplash.com/photo-1542393545-facac42e67ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW9uaXRvcnxlbnwwfHwwfHx8MA%3D%3D' },
  { id: '4', name: 'Keyboard Mekanikal', price: 1200000, rating: 4.6, image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVjaGFuaWNhbCUyMGtleWJvYXJkfGVufDB8fDB8fHww' },
  { id: '5', name: 'Mouse Wireless Presisi', price: 800000, rating: 4.5, image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2lyZWxlc3MlMjBtb3VzZXxlbnwwfHwwfHx8MA%3D%3D' },
  { id: '6', name: 'Lampu Meja LED', price: 450000, rating: 4.4, image: 'https://images.unsplash.com/photo-1534282832630-4a5008900832?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVzayUyMGxhbXB8ZW58MHx8MHx8fDA%3D' },
];

export default function CatalogScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <TouchableOpacity>
        <Menu color="#800000" size={24} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Katalog Produk</Text>
      <TouchableOpacity>
        <ShoppingCart color="#800000" size={24} />
      </TouchableOpacity>
    </View>
  );

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <View style={styles.searchBar}>
        <Search color="gray" size={20} style={styles.searchIcon} />
        <TextInput placeholder="Cari setup impianmu..." style={styles.searchInput} />
      </View>
      <TouchableOpacity style={styles.filterButton}>
        <Filter color="white" size={20} />
      </TouchableOpacity>
    </View>
  );

  const renderCategories = () => (
    <FlatList
      data={CATEGORIES}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item}
      contentContainerStyle={styles.categoriesList}
      // Kita beri tahu bahwa 'item' di sini adalah string
      renderItem={({ item }: { item: string }) => (
        <TouchableOpacity
          style={[
            styles.categoryItem,
            selectedCategory === item && styles.categoryItemActive,
          ]}
          onPress={() => setSelectedCategory(item)}
        >
          <Text
            style={[
              styles.categoryText,
              selectedCategory === item && styles.categoryTextActive,
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      )}
    />
  );

  // 2. TIPE DATA DITAMBAHKAN DI SINI ({ item }: { item: Product })
  const renderProductItem: ListRenderItem<Product> = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() =>
        router.push({
          pathname: '/product/[id]',
          params: { 
            id: item.id, 
            name: item.name, 
            price: item.price.toString(), // Pastikan dikirim sebagai string
            image: item.image 
          },
        })
      }
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
        <View style={styles.ratingContainer}>
          <Star color="#FFD700" size={14} fill="#FFD700" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
        <Text style={styles.productPrice}>Rp {item.price.toLocaleString('id-ID')}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      {renderHeader()}
      {renderSearchBar()}
      <View style={styles.content}>
        {renderCategories()}
        <Text style={styles.sectionTitle}>Produk Populer</Text>
        <FlatList
          data={PRODUCTS}
          keyExtractor={(item) => item.id}
          renderItem={renderProductItem}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.productList}
          columnWrapperStyle={styles.productColumnWrapper}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginRight: 10,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  filterButton: {
    backgroundColor: '#800000',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  categoriesList: {
    paddingVertical: 10,
    marginBottom: 10,
  },
  categoryItem: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'white',
    marginRight: 10,
    elevation: 1,
  },
  categoryItemActive: {
    backgroundColor: '#800000',
  },
  categoryText: {
    color: '#333',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: 'white',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  productList: {
    paddingBottom: 20,
  },
  productColumnWrapper: {
    justifyContent: 'space-between',
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 20,
    width: '48%',
    elevation: 3,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  ratingText: {
    fontSize: 12,
    color: '#777',
    marginLeft: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#800000',
  },
});