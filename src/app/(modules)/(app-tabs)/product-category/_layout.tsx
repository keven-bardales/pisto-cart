import { Stack, Tabs } from "expo-router";

export default function CategoryLayout(props) {
  return (
    <Stack>
      <Stack.Screen
        name="[id]/index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
