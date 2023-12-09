import { ThemeProvider } from "@rneui/themed";
import { Stack, Tabs } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function Layout(props) {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        ></Stack>
        <Toast />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
