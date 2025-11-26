import { Tabs } from "expo-router";
import { Home, Grid, ShoppingBag, User } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#800000', // Merah Maroon untuk tab aktif
        tabBarInactiveTintColor: 'gray', // Abu-abu untuk tab tidak aktif
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 10, // Bayangan lembut di Android
          shadowOpacity: 0.1, // Bayangan lembut di iOS
          height: 60,
          paddingBottom: 10,
        },
        headerShown: false, // Sembunyikan header default di semua tab
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Beranda',
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="catalog"
        options={{
          title: 'Katalog',
          tabBarIcon: ({ color }) => <Grid size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Keranjang',
          tabBarIcon: ({ color }) => <ShoppingBag size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}