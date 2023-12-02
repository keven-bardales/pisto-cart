import { Tabs } from "expo-router";

export default function AppTabs() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          headerShown: false,
          title: "Inicio",
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          headerShown: false,
          title: "Productos",
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          headerShown: false,
          title: "Perfil",
        }}
      />
    </Tabs>
  );
}
