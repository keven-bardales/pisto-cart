import { Link, Stack } from "expo-router";
import { View, Text } from "react-native";

export default function Products() {
  return (
    <View>
      <Text>Products</Text>
      <Link
        href={{
          pathname: "products/50",
        }}
      >
        Ver producto 50
      </Link>
    </View>
  );
}
