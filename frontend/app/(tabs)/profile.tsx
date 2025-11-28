import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

export default function ProfileScreen() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    supabase.auth.onAuthStateChange((_event, session) => setSession(session));
  }, []);

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const redirectUri = makeRedirectUri({ scheme: 'dreamdesk', path: 'auth/callback' });
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: redirectUri }
      });

      if (error) throw error;
      if (data.url) await WebBrowser.openAuthSessionAsync(data.url, redirectUri);
    } catch (error: any) {
      Alert.alert('Login Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setLoading(false);
  };

  if (!session) {
    return (
      <View style={styles.containerCenter}>
        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/295/295128.png' }} style={styles.logoLogin} />
        <Text style={styles.titleLogin}>DreamDesk</Text>
        <Text style={styles.descLogin}>Login untuk menyimpan keranjang belanja Anda.</Text>
        <TouchableOpacity style={styles.googleBtn} onPress={signInWithGoogle} disabled={loading}>
          {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.googleText}>Sign in with Google</Text>}
        </TouchableOpacity>
      </View>
    );
  }

  const { user } = session;
  const avatarUrl = user.user_metadata.avatar_url;
  const fullName = user.user_metadata.full_name || 'User';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.avatarContainer}>
        {avatarUrl ? (
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, { backgroundColor: '#ccc' }]} />
        )}
      </View>
      <Text style={styles.name}>{fullName}</Text>
      <Text style={styles.email}>{user.email}</Text>
      
      <View style={styles.card}>
        <Text style={styles.label}>User ID:</Text>
        <Text style={styles.value}>{user.id}</Text>
        <Text style={styles.label}>Status:</Text>
        <Text style={[styles.value, { color: 'green' }]}>Active Member</Text>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={signOut}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: 'center', padding: 20, backgroundColor: '#fff', paddingTop: 60 },
  containerCenter: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: 20 },
  logoLogin: { width: 80, height: 80, marginBottom: 20 },
  titleLogin: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  descLogin: { textAlign: 'center', color: 'gray', marginBottom: 30 },
  googleBtn: { backgroundColor: '#f1f1f1', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 30 },
  googleText: { fontWeight: 'bold' },
  avatarContainer: { marginBottom: 15, elevation: 5 },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  name: { fontSize: 22, fontWeight: 'bold' },
  email: { fontSize: 16, color: 'gray', marginBottom: 30 },
  card: { width: '100%', backgroundColor: '#F9F9F9', padding: 20, borderRadius: 15, marginBottom: 30 },
  label: { fontSize: 14, color: '#888', marginBottom: 2 },
  value: { fontSize: 16, fontWeight: '500', marginBottom: 15 },
  logoutBtn: { width: '100%', backgroundColor: '#FFE5E5', padding: 15, borderRadius: 10, alignItems: 'center' },
  logoutText: { color: '#D32F2F', fontWeight: 'bold' }
});