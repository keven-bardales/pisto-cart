import { Stack } from "expo-router";
import { View, Text } from "react-native";

export default function SignIn() {
  return (
    <View>
      <Stack.Screen
        options={{
          title: "Sign In",
        }}
      />
      <Text>Sign In</Text>
    </View>
  );
}
