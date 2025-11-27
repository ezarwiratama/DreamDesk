import { View, Text, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={{color:'white', fontWeight:'bold'}}>FOTO</Text>
      </View>
      <Text style={styles.name}>Ezar Hardin Wiratama</Text>
      <Text style={styles.nim}>NIM: 21120123140116</Text>
      <Text style={styles.desc}>
        Aplikasi DreamDesk versi 1.0{'\n'}
        Tugas Akhir Praktikum Mobile.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#ccc', marginBottom: 20, justifyContent:'center', alignItems:'center' },
  name: { fontSize: 22, fontWeight: 'bold' },
  nim: { fontSize: 16, color: 'gray', marginBottom: 20 },
  desc: { textAlign: 'center', lineHeight: 22 }
});