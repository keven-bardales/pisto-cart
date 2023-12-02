import { ThemeProvider } from "@rneui/themed";
import { Stack, Tabs } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Layout(props) {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        ></Stack>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
