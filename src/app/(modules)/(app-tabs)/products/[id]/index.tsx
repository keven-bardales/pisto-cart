import { Stack, useGlobalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProductDetail() {
  const params = useGlobalSearchParams();

  return (
    <SafeAreaView>
      <View>
        <Text>Product: {params.id}</Text>
      </View>
    </SafeAreaView>
  );
}
