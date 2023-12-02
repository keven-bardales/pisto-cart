import { Stack, Tabs } from "expo-router";

export default function ProductsLayout(props) {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[id]/index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
