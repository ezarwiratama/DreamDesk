import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Home() {
  const router = useRouter();

  const categories = [
    { id: 1, name: 'Desks', icon: 'desktop-outline' },
    { id: 2, name: 'Chairs', icon: 'easel-outline' },
    { id: 3, name: 'Audio', icon: 'headset-outline' },
    { id: 4, name: 'Light', icon: 'bulb-outline' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Greetings */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greetingText}>Good Morning,</Text>
            <Text style={styles.usernameText}>Dreamer!</Text>
          </View>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="notifications-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Carousel / Banner */}
        <View style={styles.bannerContainer}>
          <View style={styles.banner}>
            <Text style={styles.bannerTitle}>Dream Desk Setup</Text>
            <Text style={styles.bannerSubtitle}>Diskon up to 30%</Text>
          </View>
        </View>

        {/* Kategori */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
          {categories.map((cat) => (
            <TouchableOpacity key={cat.id} style={styles.catItem} onPress={() => router.push('/(tabs)/catalog')}>
              <View style={styles.catIconBg}>
                <Ionicons name={cat.icon as any} size={24} color="#6200EE" />
              </View>
              <Text style={styles.catText}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Featured Product Teaser */}
        <Text style={styles.sectionTitle}>New Arrivals</Text>
        <TouchableOpacity style={styles.featuredCard} onPress={() => router.push('/(tabs)/catalog')}>
            <Image source={{ uri: 'https://placehold.co/600x400/png' }} style={styles.featuredImg} />
            <Text style={styles.featuredTitle}>Ultrawide Monitor Setup</Text>
            <Text style={styles.featuredPrice}>See Details</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9', padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  greetingText: { fontSize: 16, color: '#888' },
  usernameText: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  iconBtn: { padding: 8, backgroundColor: '#FFF', borderRadius: 10 },
  bannerContainer: { marginBottom: 20 },
  banner: { backgroundColor: '#6200EE', padding: 20, borderRadius: 15, height: 150, justifyContent: 'center' },
  bannerTitle: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  bannerSubtitle: { color: '#E0E0E0', marginTop: 5 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  catScroll: { marginBottom: 20 },
  catItem: { marginRight: 20, alignItems: 'center' },
  catIconBg: { width: 60, height: 60, backgroundColor: '#FFF', borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginBottom: 8, elevation: 2 },
  catText: { fontSize: 12, color: '#555' },
  featuredCard: { backgroundColor: '#FFF', borderRadius: 15, padding: 10, elevation: 2 },
  featuredImg: { width: '100%', height: 150, borderRadius: 10, marginBottom: 10 },
  featuredTitle: { fontSize: 16, fontWeight: '600' },
  featuredPrice: { color: '#6200EE', fontWeight: 'bold' }
});