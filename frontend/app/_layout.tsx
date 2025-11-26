import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* Mengarahkan ke folder (tabs) sebagai halaman utama, header disembunyikan */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      
      {/* Halaman Detail Produk */}
      <Stack.Screen name="product/[id]" options={{ title: "Detail Produk" }} />
    </Stack>
  );
}