import { View, Text, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selamat Datang di DreamDesk!</Text>
      <Text style={styles.subtitle}>Setup Impian Anda Dimulai di Sini.</Text>
      
      <View style={{ marginTop: 20 }}>
        <Button 
          title="Lihat Katalog" 
          color="#6C63FF"
          onPress={() => router.push('/(tabs)/catalog')} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, color: 'gray' },
});