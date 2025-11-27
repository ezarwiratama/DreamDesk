import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="product/[id]" 
          options={{ 
            title: 'Detail Produk',
            headerBackTitle: 'Back',
            headerTintColor: '#000'
          }} 
        />
      </Stack>
    </>
  );
}