import { Stack, useGlobalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function ProductDetail() {
  const params = useGlobalSearchParams();

  return (
    <View>
      <Text>Product: {params.id}</Text>
    </View>
  );
}
