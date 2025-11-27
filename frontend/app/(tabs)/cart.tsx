import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Cart() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Keranjang Belanja Anda Kosong</Text>
      <Text style={styles.subtext}>Ayo isi DreamDesk kamu!</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  text: { fontSize: 18, fontWeight: 'bold' },
  subtext: { color: 'gray', marginTop: 10 }
});